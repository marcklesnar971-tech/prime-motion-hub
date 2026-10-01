import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { formatPrice } from "@/lib/shop-config";
import { PromotionsPanel } from "@/components/admin/PromotionsPanel";

type Override = {
  slug: string;
  price: number | null;
  old_price: number | null;
  stock: boolean | null;
  stock_qty: number | null;
  image_url: string | null;
  gallery: string[] | null;
  name: string | null;
  short: string | null;
  description: string | null;
  category: string | null;
  colors: string[] | null;
  sizes: string[] | null;
  is_custom: boolean;
  hidden: boolean;
};

const SELECT =
  "slug, price, old_price, stock, stock_qty, image_url, gallery, name, short, description, category, colors, sizes, is_custom, hidden";

const inputCls =
  "rounded-sm border border-border bg-[var(--surface-2)] px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

async function uploadPhoto(slug: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${slug}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const { error } = await supabase.storage.from("product-photos").upload(path, file, {
    upsert: true,
  });
  if (error) throw error;
  return path;
}

function useSignedUrl(path: string | null): string | null {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    if (!path) {
      setUrl(null);
      return;
    }
    void supabase.storage
      .from("product-photos")
      .createSignedUrl(path, 3600)
      .then(({ data }) => {
        if (active) setUrl(data?.signedUrl ?? null);
      });
    return () => {
      active = false;
    };
  }, [path]);
  return url;
}

const listToText = (v: string[] | null | undefined) => (v ?? []).join(", ");
const textToList = (v: string) =>
  v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Panel de productos | GijuSport" },
      {
        name: "description",
        content: "Panel privado para editar precios, fotos y stock de los productos GijuSport.",
      },
      { property: "og:title", content: "Panel de productos | GijuSport" },
      { property: "og:description", content: "Panel privado de gestión de productos GijuSport." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const [ready, setReady] = useState(false);

  // El primer usuario registrado se convierte en administrador.
  useEffect(() => {
    supabase.rpc("claim_admin").then(({ data, error }) => {
      if (error) toast.error("No se pudo verificar tu acceso");
      else if (!data) toast.error("Tu cuenta no tiene permiso de administrador");
      setReady(true);
    });
  }, []);

  const overridesQuery = useQuery({
    queryKey: ["product-overrides"],
    enabled: ready,
    queryFn: async () => {
      const { data, error } = await supabase.from("product_overrides").select(SELECT);
      if (error) throw error;
      const map: Record<string, Override> = {};
      for (const row of data ?? []) map[row.slug] = row as Override;
      return map;
    },
  });

  const overrides = useMemo(() => overridesQuery.data ?? {}, [overridesQuery.data]);

  function refreshAll() {
    void overridesQuery.refetch();
    void queryClient.invalidateQueries({ queryKey: ["public-product-overrides"] });
  }

  const items = useMemo(() => {
    const staticSlugs = new Set(PRODUCTS.map((p) => p.slug));
    const customs = Object.values(overrides)
      .filter((o) => o.is_custom && !staticSlugs.has(o.slug))
      .map((o) => ({
        slug: o.slug,
        name: o.name ?? o.slug,
        category: o.category ?? "accesorios",
        image: "",
        price: o.price ?? 0,
        oldPrice: o.old_price,
        stock: o.stock ?? true,
        isCustom: true,
      }));
    const base = PRODUCTS.map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      image: p.image,
      price: p.price,
      oldPrice: p.oldPrice ?? null,
      stock: p.stock,
      isCustom: false,
    }));
    return [...customs, ...base];
  }, [overrides]);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter(
      (p) =>
        !term || p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term),
    );
  }, [q, items]);

  const promoOptions = useMemo(
    () => items.map((p) => ({ slug: p.slug, name: p.name })),
    [items],
  );

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("Sesión cerrada");
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-24 md:px-8 md:pt-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.24em] text-primary">PANEL PRIVADO</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">MIS PRODUCTOS</h1>
          <p className="mt-2 text-xs text-muted-foreground">
            Crea productos, edita precio, descripción, stock, colores, tallas y fotos. Los cambios
            se publican en la tienda al guardar.
          </p>
        </div>
        <button
          onClick={signOut}
          className="rounded-full border border-border px-5 py-3 text-[11px] tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          CERRAR SESIÓN
        </button>
      </div>

      <WhatsappSetting />

      <NewProductForm onCreated={refreshAll} />

      <PromotionsPanel productSlugs={promoOptions} />

      <label className="mt-8 flex items-center gap-3 rounded-sm border border-border bg-[var(--surface)] px-4 py-3">
        <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar producto"
          aria-label="Buscar producto"
          className="w-full bg-transparent text-sm outline-none"
        />
      </label>

      {overridesQuery.isLoading || !ready ? (
        <p className="mt-10 text-sm text-muted-foreground">Cargando productos…</p>
      ) : (
        <div className="mt-6 space-y-3">
          {list.map((p) => (
            <ProductRow
              key={p.slug}
              slug={p.slug}
              name={p.name}
              category={p.category}
              baseImage={p.image}
              basePrice={p.price}
              baseOldPrice={p.oldPrice}
              baseStock={p.stock}
              isCustom={p.isCustom}
              override={overrides[p.slug] ?? null}
              onSaved={refreshAll}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function WhatsappSetting() {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  const settingQuery = useQuery({
    queryKey: ["site-settings-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("whatsapp_number")
        .eq("id", "default")
        .maybeSingle();
      if (error) throw error;
      return data?.whatsapp_number ?? "";
    },
  });

  useEffect(() => {
    if (!loaded && settingQuery.data !== undefined) {
      setValue(settingQuery.data ?? "");
      setLoaded(true);
    }
  }, [settingQuery.data, loaded]);

  async function save() {
    const clean = value.replace(/[^0-9]/g, "");
    if (clean.length < 8) {
      toast.error("Escribe el número con código de país, solo dígitos");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ id: "default", whatsapp_number: clean });
      if (error) throw error;
      setValue(clean);
      await queryClient.invalidateQueries({ queryKey: ["site-settings-whatsapp"] });
      toast.success("Número de WhatsApp actualizado");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="surface-card mt-8 rounded-[20px] p-4">
      <p className="text-[10px] tracking-[0.2em] text-primary">CONTACTO</p>
      <h2 className="mt-1 text-sm font-semibold">Número de WhatsApp de la web</h2>
      <p className="mt-1 text-[11px] text-muted-foreground">
        Formato internacional sin “+” ni espacios. Ejemplo: 51999888777.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input
          inputMode="numeric"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="51999888777"
          aria-label="Número de WhatsApp"
          className="w-52 rounded-sm border border-border bg-[var(--surface-2)] px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
        <button
          onClick={save}
          disabled={saving}
          className="rounded-full bg-primary px-6 py-3 text-[11px] font-semibold tracking-[0.18em] text-primary-foreground disabled:opacity-60"
        >
          {saving ? "GUARDANDO…" : "GUARDAR NÚMERO"}
        </button>
      </div>
    </section>
  );
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function NewProductForm({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]?.slug ?? "accesorios");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [short, setShort] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(true);
  const [stockQty, setStockQty] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [mainPath, setMainPath] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const preview = useSignedUrl(mainPath);

  const slug = slugify(name);

  async function create() {
    setBusy(true);
    try {
      if (!name.trim()) throw new Error("Escribe el nombre del producto");
      const parsedPrice = Number(price);
      if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) throw new Error("Precio inválido");
      const parsedOld = oldPrice.trim() === "" ? null : Number(oldPrice);
      const parsedQty = stockQty.trim() === "" ? null : Number(stockQty);

      const { error } = await supabase.from("product_overrides").upsert({
        slug,
        name: name.trim(),
        category,
        price: parsedPrice,
        old_price: parsedOld,
        short: short.trim() || null,
        description: description.trim() || null,
        stock,
        stock_qty: parsedQty,
        colors: textToList(colors),
        sizes: textToList(sizes),
        image_url: mainPath,
        gallery,
        is_custom: true,
        hidden: false,
      });
      if (error) throw error;
      toast.success("Producto creado y publicado");
      setName("");
      setPrice("");
      setOldPrice("");
      setShort("");
      setDescription("");
      setStockQty("");
      setColors("");
      setSizes("");
      setMainPath(null);
      setGallery([]);
      onCreated();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo crear el producto");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="surface-card mt-8 rounded-[20px] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.2em] text-primary">NUEVO</p>
          <h2 className="mt-1 text-sm font-semibold">Agregar producto</h2>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-border px-5 py-3 text-[11px] tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          {open ? "CERRAR" : "AGREGAR PRODUCTO"}
        </button>
      </div>

      {open && (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input className={inputCls} placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} aria-label="Nombre del producto" />
          <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Categoría">
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <input className={inputCls} inputMode="decimal" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} aria-label="Precio" />
          <input className={inputCls} inputMode="decimal" placeholder="Precio anterior (opcional)" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} aria-label="Precio anterior" />
          <input className={`${inputCls} md:col-span-2`} placeholder="Frase corta" value={short} onChange={(e) => setShort(e.target.value)} aria-label="Frase corta" />
          <textarea className={`${inputCls} md:col-span-2`} rows={3} placeholder="Descripción completa" value={description} onChange={(e) => setDescription(e.target.value)} aria-label="Descripción" />
          <input className={inputCls} placeholder="Colores separados por coma" value={colors} onChange={(e) => setColors(e.target.value)} aria-label="Colores" />
          <input className={inputCls} placeholder="Tallas separadas por coma" value={sizes} onChange={(e) => setSizes(e.target.value)} aria-label="Tallas" />
          <div className="flex flex-wrap items-center gap-4 md:col-span-2">
            <label className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <input type="checkbox" checked={stock} onChange={(e) => setStock(e.target.checked)} className="accent-[var(--primary)]" />
              EN STOCK
            </label>
            <label className="flex items-center gap-2 text-[11px] text-muted-foreground">
              UNIDADES
              <input className={`${inputCls} w-24`} inputMode="numeric" value={stockQty} onChange={(e) => setStockQty(e.target.value)} aria-label="Unidades en stock" />
            </label>
            <label className="cursor-pointer rounded-sm border border-border px-3 py-2 text-[11px] text-muted-foreground hover:text-foreground">
              {mainPath ? "FOTO PRINCIPAL ✓" : "FOTO PRINCIPAL"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    setMainPath(await uploadPhoto(slug || "nuevo", file));
                  } catch (err) {
                    toast.error(err instanceof Error ? err.message : "No se pudo subir la foto");
                  }
                }}
              />
            </label>
            <label className="cursor-pointer rounded-sm border border-border px-3 py-2 text-[11px] text-muted-foreground hover:text-foreground">
              {gallery.length > 0 ? `FOTOS EXTRA (${gallery.length})` : "FOTOS EXTRA"}
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={async (e) => {
                  const files = Array.from(e.target.files ?? []);
                  if (files.length === 0) return;
                  try {
                    const paths = await Promise.all(
                      files.map((f) => uploadPhoto(slug || "nuevo", f)),
                    );
                    setGallery((prev) => [...prev, ...paths]);
                  } catch (err) {
                    toast.error(err instanceof Error ? err.message : "No se pudieron subir");
                  }
                }}
              />
            </label>
            {preview && (
              <img src={preview} alt="Vista previa" width={64} height={64} className="h-16 w-16 rounded-md object-contain" />
            )}
          </div>
          <button
            onClick={create}
            disabled={busy}
            className="rounded-full bg-primary px-6 py-3 text-[11px] font-semibold tracking-[0.18em] text-primary-foreground disabled:opacity-60 md:col-span-2"
          >
            {busy ? "GUARDANDO…" : "CREAR Y PUBLICAR"}
          </button>
        </div>
      )}
    </section>
  );
}

function ProductRow({
  slug,
  name,
  category,
  baseImage,
  basePrice,
  baseOldPrice,
  baseStock,
  isCustom,
  override,
  onSaved,
}: {
  slug: string;
  name: string;
  category: string;
  baseImage: string;
  basePrice: number;
  baseOldPrice: number | null;
  baseStock: boolean;
  isCustom: boolean;
  override: Override | null;
  onSaved: () => void;
}) {
  const [price, setPrice] = useState(String(override?.price ?? basePrice));
  const [oldPrice, setOldPrice] = useState(
    override?.old_price != null
      ? String(override.old_price)
      : baseOldPrice != null
        ? String(baseOldPrice)
        : "",
  );
  const [stock, setStock] = useState(override?.stock ?? baseStock);
  const [stockQty, setStockQty] = useState(
    override?.stock_qty != null ? String(override.stock_qty) : "",
  );
  const [displayName, setDisplayName] = useState(override?.name ?? name);
  const [short, setShort] = useState(override?.short ?? "");
  const [description, setDescription] = useState(override?.description ?? "");
  const [colors, setColors] = useState(listToText(override?.colors));
  const [sizes, setSizes] = useState(listToText(override?.sizes));
  const [hidden, setHidden] = useState(override?.hidden ?? false);
  const [imagePath, setImagePath] = useState(override?.image_url ?? null);
  const [gallery, setGallery] = useState<string[]>(override?.gallery ?? []);
  const [details, setDetails] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const preview = useSignedUrl(imagePath);

  async function handleUpload(file: File, target: "main" | "gallery") {
    setUploading(true);
    try {
      const path = await uploadPhoto(slug, file);
      if (target === "main") setImagePath(path);
      else setGallery((prev) => [...prev, path]);
      toast.success("Foto cargada. Recuerda guardar.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo subir la foto");
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    setSaving(true);
    try {
      const parsedPrice = Number(price);
      if (!Number.isFinite(parsedPrice) || parsedPrice < 0) throw new Error("Precio inválido");
      const parsedOld = oldPrice.trim() === "" ? null : Number(oldPrice);
      if (parsedOld != null && (!Number.isFinite(parsedOld) || parsedOld < 0))
        throw new Error("Precio anterior inválido");
      const parsedQty = stockQty.trim() === "" ? null : Number(stockQty);
      if (parsedQty != null && (!Number.isFinite(parsedQty) || parsedQty < 0))
        throw new Error("Cantidad de stock inválida");

      const { error } = await supabase.from("product_overrides").upsert({
        slug,
        price: parsedPrice,
        old_price: parsedOld,
        stock,
        stock_qty: parsedQty,
        image_url: imagePath,
        gallery,
        name: displayName.trim() || null,
        short: short.trim() || null,
        description: description.trim() || null,
        category: isCustom ? category : null,
        colors: textToList(colors),
        sizes: textToList(sizes),
        is_custom: isCustom,
        hidden,
      });
      if (error) throw error;
      toast.success(`${displayName} actualizado`);
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  async function removeCustom() {
    const { error } = await supabase.from("product_overrides").delete().eq("slug", slug);
    if (error) toast.error(error.message);
    else {
      toast.success("Producto eliminado");
      onSaved();
    }
  }

  return (
    <div className="surface-card rounded-[20px] p-4">
      <div className="grid gap-4 md:grid-cols-[110px_minmax(0,1fr)_auto] md:items-center">
        <div className="flex items-center gap-3">
          <img
            src={preview ?? baseImage}
            alt={displayName}
            width={96}
            height={96}
            loading="lazy"
            className="h-24 w-24 rounded-md object-contain"
          />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] tracking-[0.2em] text-primary">
            {category.toUpperCase()}
            {isCustom ? " · CREADO POR TI" : ""}
          </p>
          <h2 className="truncate text-sm font-semibold">{displayName}</h2>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Precio base: {formatPrice(basePrice)}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-[11px] text-muted-foreground">
              PRECIO
              <input
                inputMode="decimal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                aria-label={`Precio de ${displayName}`}
                className={`${inputCls} w-24`}
              />
            </label>
            <label className="flex items-center gap-2 text-[11px] text-muted-foreground">
              ANTES
              <input
                inputMode="decimal"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                placeholder="—"
                aria-label={`Precio anterior de ${displayName}`}
                className={`${inputCls} w-24`}
              />
            </label>
            <label className="flex items-center gap-2 text-[11px] text-muted-foreground">
              UNIDADES
              <input
                inputMode="numeric"
                value={stockQty}
                onChange={(e) => setStockQty(e.target.value)}
                placeholder="—"
                aria-label={`Unidades en stock de ${displayName}`}
                className={`${inputCls} w-20`}
              />
            </label>
            <label className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <input
                type="checkbox"
                checked={stock}
                onChange={(e) => setStock(e.target.checked)}
                className="accent-[var(--primary)]"
              />
              EN STOCK
            </label>
            <label className="cursor-pointer rounded-sm border border-border px-3 py-2 text-[11px] text-muted-foreground hover:text-foreground">
              {uploading ? "SUBIENDO…" : "CAMBIAR FOTO"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleUpload(file, "main");
                }}
              />
            </label>
            <button
              onClick={() => setDetails((v) => !v)}
              className="rounded-sm border border-border px-3 py-2 text-[11px] text-muted-foreground hover:text-foreground"
            >
              {details ? "OCULTAR DETALLES" : "MÁS DETALLES"}
            </button>
          </div>
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="rounded-full bg-primary px-6 py-3 text-[11px] font-semibold tracking-[0.18em] text-primary-foreground disabled:opacity-60"
        >
          {saving ? "GUARDANDO…" : "GUARDAR"}
        </button>
      </div>

      {details && (
        <div className="mt-4 grid gap-3 border-t border-border pt-4 md:grid-cols-2">
          <input className={inputCls} value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Nombre" aria-label={`Nombre de ${name}`} />
          <input className={inputCls} value={short} onChange={(e) => setShort(e.target.value)} placeholder="Frase corta" aria-label={`Frase corta de ${name}`} />
          <textarea className={`${inputCls} md:col-span-2`} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción completa" aria-label={`Descripción de ${name}`} />
          <input className={inputCls} value={colors} onChange={(e) => setColors(e.target.value)} placeholder="Colores separados por coma" aria-label={`Colores de ${name}`} />
          <input className={inputCls} value={sizes} onChange={(e) => setSizes(e.target.value)} placeholder="Tallas separadas por coma" aria-label={`Tallas de ${name}`} />

          <div className="md:col-span-2 flex flex-wrap items-center gap-3">
            <label className="cursor-pointer rounded-sm border border-border px-3 py-2 text-[11px] text-muted-foreground hover:text-foreground">
              AGREGAR FOTOS EXTRA
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={async (e) => {
                  const files = Array.from(e.target.files ?? []);
                  for (const f of files) await handleUpload(f, "gallery");
                }}
              />
            </label>
            <span className="text-[11px] text-muted-foreground">
              {gallery.length} foto(s) adicionales
            </span>
            {gallery.length > 0 && (
              <button
                onClick={() => setGallery([])}
                className="rounded-sm border border-border px-3 py-2 text-[11px] text-muted-foreground hover:text-foreground"
              >
                QUITAR FOTOS EXTRA
              </button>
            )}
            <label className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <input
                type="checkbox"
                checked={hidden}
                onChange={(e) => setHidden(e.target.checked)}
                className="accent-[var(--primary)]"
              />
              OCULTAR DE LA WEB
            </label>
            {isCustom && (
              <button
                onClick={() => void removeCustom()}
                className="rounded-sm border border-border px-3 py-2 text-[11px] text-muted-foreground hover:text-foreground"
              >
                ELIMINAR PRODUCTO
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
