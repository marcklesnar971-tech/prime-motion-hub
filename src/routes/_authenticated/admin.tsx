import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PRODUCTS } from "@/lib/catalog";
import { formatPrice } from "@/lib/shop-config";

type Override = {
  slug: string;
  price: number | null;
  old_price: number | null;
  stock: boolean | null;
  image_url: string | null;
};

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
      const { data, error } = await supabase
        .from("product_overrides")
        .select("slug, price, old_price, stock, image_url");
      if (error) throw error;
      const map: Record<string, Override> = {};
      for (const row of data ?? []) map[row.slug] = row as Override;
      return map;
    },
  });

  const overrides = overridesQuery.data ?? {};

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term),
    );
  }, [q]);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-24 md:px-8 md:pt-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.24em] text-primary">PANEL PRIVADO</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">MIS PRODUCTOS</h1>
          <p className="mt-2 text-xs text-muted-foreground">
            Edita precio, stock y foto. La tienda pública sigue mostrando el catálogo actual.
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
              baseOldPrice={p.oldPrice ?? null}
              baseStock={p.stock}
              override={overrides[p.slug] ?? null}
              onSaved={() => overridesQuery.refetch()}
            />
          ))}
        </div>
      )}
    </div>
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
  override: Override | null;
  onSaved: () => void;
}) {
  const [price, setPrice] = useState(String(override?.price ?? basePrice));
  const [oldPrice, setOldPrice] = useState(
    override?.old_price != null ? String(override.old_price) : baseOldPrice != null ? String(baseOldPrice) : "",
  );
  const [stock, setStock] = useState(override?.stock ?? baseStock);
  const [imagePath, setImagePath] = useState(override?.image_url ?? null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let active = true;
    if (!imagePath) {
      setPreview(null);
      return;
    }
    supabase.storage
      .from("product-photos")
      .createSignedUrl(imagePath, 3600)
      .then(({ data }) => {
        if (active) setPreview(data?.signedUrl ?? null);
      });
    return () => {
      active = false;
    };
  }, [imagePath]);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${slug}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("product-photos").upload(path, file, {
        upsert: true,
      });
      if (error) throw error;
      setImagePath(path);
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

      const { error } = await supabase.from("product_overrides").upsert({
        slug,
        price: parsedPrice,
        old_price: parsedOld,
        stock,
        image_url: imagePath,
      });
      if (error) throw error;
      toast.success(`${name} actualizado`);
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="surface-card grid gap-4 rounded-[20px] p-4 md:grid-cols-[110px_minmax(0,1fr)_auto] md:items-center">
      <div className="flex items-center gap-3">
        <img
          src={preview ?? baseImage}
          alt={name}
          width={96}
          height={96}
          loading="lazy"
          className="h-24 w-24 rounded-md object-contain"
        />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] tracking-[0.2em] text-primary">{category.toUpperCase()}</p>
        <h2 className="truncate text-sm font-semibold">{name}</h2>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Precio en la web: {formatPrice(basePrice)}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-[11px] text-muted-foreground">
            PRECIO
            <input
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              aria-label={`Precio de ${name}`}
              className="w-24 rounded-sm border border-border bg-[var(--surface-2)] px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            />
          </label>
          <label className="flex items-center gap-2 text-[11px] text-muted-foreground">
            ANTES
            <input
              inputMode="decimal"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              placeholder="—"
              aria-label={`Precio anterior de ${name}`}
              className="w-24 rounded-sm border border-border bg-[var(--surface-2)] px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
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
                if (file) void handleUpload(file);
              }}
            />
          </label>
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
  );
}
