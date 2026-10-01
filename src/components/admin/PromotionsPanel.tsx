import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { isLive, type Promotion } from "@/lib/promotions";

type Row = Promotion;

function toLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function toIso(local: string): string | null {
  if (!local) return null;
  const d = new Date(local);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

const input =
  "rounded-sm border border-border bg-[var(--surface-2)] px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

export function PromotionsPanel({ productSlugs }: { productSlugs: { slug: string; name: string }[] }) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [slugs, setSlugs] = useState<string[]>([]);
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [active, setActive] = useState(true);

  const promosQuery = useQuery({
    queryKey: ["admin-promotions"],
    queryFn: async (): Promise<Row[]> => {
      const { data, error } = await supabase
        .from("promotions")
        .select(
          "id, title, subtitle, description, discount_percent, product_slugs, starts_at, ends_at, active",
        )
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((r) => ({
        id: r.id,
        title: r.title,
        subtitle: r.subtitle,
        description: r.description,
        discountPercent: r.discount_percent,
        productSlugs: r.product_slugs ?? [],
        startsAt: r.starts_at,
        endsAt: r.ends_at,
        active: r.active,
      }));
    },
  });

  function refresh() {
    void promosQuery.refetch();
    void queryClient.invalidateQueries({ queryKey: ["public-promotions"] });
  }

  const create = useMutation({
    mutationFn: async () => {
      if (!title.trim()) throw new Error("Escribe un título para la promoción");
      const pct = discount.trim() === "" ? null : Number(discount);
      if (pct != null && (!Number.isFinite(pct) || pct < 0 || pct > 95))
        throw new Error("El descuento debe estar entre 0 y 95");
      const { error } = await supabase.from("promotions").insert({
        title: title.trim(),
        subtitle: subtitle.trim() || null,
        description: description.trim() || null,
        discount_percent: pct,
        product_slugs: slugs,
        starts_at: toIso(startsAt),
        ends_at: toIso(endsAt),
        active,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Promoción creada");
      setTitle("");
      setSubtitle("");
      setDescription("");
      setDiscount("");
      setSlugs([]);
      setStartsAt("");
      setEndsAt("");
      setActive(true);
      refresh();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "No se pudo crear"),
  });

  async function toggle(row: Row, value: boolean) {
    const { error } = await supabase.from("promotions").update({ active: value }).eq("id", row.id);
    if (error) toast.error(error.message);
    else {
      toast.success(value ? "Promoción activada" : "Promoción desactivada");
      refresh();
    }
  }

  async function remove(row: Row) {
    const { error } = await supabase.from("promotions").delete().eq("id", row.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Promoción cancelada");
      refresh();
    }
  }

  const rows = promosQuery.data ?? [];

  return (
    <section className="surface-card mt-8 rounded-[20px] p-4">
      <p className="text-[10px] tracking-[0.2em] text-primary">PROMOCIONES</p>
      <h2 className="mt-1 text-sm font-semibold">Crear y controlar promociones</h2>
      <p className="mt-1 text-[11px] text-muted-foreground">
        Define el descuento, los productos y el periodo. Puedes activarla o desactivarla con la
        casilla, o cancelarla por completo.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <input className={input} placeholder="Título (ej. Semana Volt)" value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Título de la promoción" />
        <input className={input} placeholder="Frase corta" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} aria-label="Frase corta" />
        <textarea className={`${input} md:col-span-2`} rows={2} placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} aria-label="Descripción de la promoción" />
        <label className="flex items-center gap-2 text-[11px] text-muted-foreground">
          DESCUENTO %
          <input className={`${input} w-24`} inputMode="decimal" value={discount} onChange={(e) => setDiscount(e.target.value)} aria-label="Descuento en porcentaje" />
        </label>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
          <label className="flex items-center gap-2">
            DESDE
            <input type="datetime-local" className={input} value={startsAt} onChange={(e) => setStartsAt(e.target.value)} aria-label="Inicio de la promoción" />
          </label>
          <label className="flex items-center gap-2">
            HASTA
            <input type="datetime-local" className={input} value={endsAt} onChange={(e) => setEndsAt(e.target.value)} aria-label="Fin de la promoción" />
          </label>
        </div>
        <label className="flex items-center gap-2 text-[11px] text-muted-foreground md:col-span-2">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="accent-[var(--primary)]" />
          ACTIVA
        </label>
        <div className="md:col-span-2">
          <p className="text-[11px] text-muted-foreground">PRODUCTOS EN PROMOCIÓN</p>
          <select
            multiple
            value={slugs}
            onChange={(e) => setSlugs(Array.from(e.target.selectedOptions, (o) => o.value))}
            aria-label="Productos en promoción"
            className={`${input} mt-2 h-40 w-full`}
          >
            {productSlugs.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-[10px] text-muted-foreground">
            Mantén Ctrl (o Cmd) para elegir varios.
          </p>
        </div>
      </div>

      <button
        onClick={() => create.mutate()}
        disabled={create.isPending}
        className="mt-4 rounded-full bg-primary px-6 py-3 text-[11px] font-semibold tracking-[0.18em] text-primary-foreground disabled:opacity-60"
      >
        {create.isPending ? "CREANDO…" : "CREAR PROMOCIÓN"}
      </button>

      <div className="mt-6 space-y-3">
        {rows.length === 0 && (
          <p className="text-[11px] text-muted-foreground">Aún no hay promociones creadas.</p>
        )}
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-3"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold">
                {row.title}{" "}
                <span className="text-[11px] text-muted-foreground">
                  {row.discountPercent ? `· -${row.discountPercent}%` : ""}
                </span>
              </p>
              <p className="text-[11px] text-muted-foreground">
                {row.startsAt ? new Date(row.startsAt).toLocaleString() : "sin fecha de inicio"} →{" "}
                {row.endsAt ? new Date(row.endsAt).toLocaleString() : "sin fecha de fin"} ·{" "}
                {row.productSlugs.length} producto(s) ·{" "}
                <span className={isLive(row) ? "text-primary" : ""}>
                  {isLive(row) ? "VISIBLE EN LA WEB" : "NO VISIBLE"}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <input
                  type="checkbox"
                  checked={row.active}
                  onChange={(e) => void toggle(row, e.target.checked)}
                  className="accent-[var(--primary)]"
                />
                ACTIVA
              </label>
              <button
                onClick={() => void remove(row)}
                aria-label={`Cancelar promoción ${row.title}`}
                className="flex items-center gap-1 rounded-full border border-border px-3 py-2 text-[11px] text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="h-3.5 w-3.5" /> CANCELAR
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { toLocalInput };
