import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

type ProductSearch = { q: string; cat: string };

export const Route = createFileRoute("/productos")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
    cat: typeof search["cat"] === "string" ? search["cat"] : "todos",
  }),
  head: () => ({
    meta: [
      { title: "Productos fitness | GijuSport" },
      {
        name: "description",
        content:
          "Catálogo completo GijuSport: pesas, guantes, cinturones, bandas elásticas, tobilleras, suplementos, cardio y más.",
      },
      { property: "og:title", content: "Productos fitness | GijuSport" },
      {
        property: "og:description",
        content: "Explora el catálogo completo de equipamiento y accesorios fitness GijuSport.",
      },
    ],
  }),
  component: ProductosPage,
});

const SORTS = [
  { id: "popular", label: "POPULARIDAD" },
  { id: "precio-asc", label: "PRECIO ↑" },
  { id: "precio-desc", label: "PRECIO ↓" },
  { id: "ofertas", label: "PROMOCIONES" },
] as const;

function ProductosPage() {
  const { q, cat } = Route.useSearch();
  const navigate = useNavigate({ from: "/productos" });
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("popular");
  const [onlyStock, setOnlyStock] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1500);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const matchCat = cat === "todos" || p.category === cat;
      const matchTerm =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.short.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term);
      return matchCat && matchTerm && p.price <= maxPrice && (!onlyStock || p.stock);
    });

    if (sort === "precio-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "precio-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "ofertas") list = list.filter((p) => p.oldPrice);
    if (sort === "popular") list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [q, cat, sort, onlyStock, maxPrice]);

  return (
    <div className="pt-28 md:pt-32">
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.24em] text-primary">CATÁLOGO</p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">
            TODOS LOS <span className="text-primary">PRODUCTOS</span>
          </h1>
        </Reveal>

        <div className="mt-8 flex flex-col gap-4">
          <label className="flex items-center gap-3 rounded-sm border border-border bg-[var(--surface)] px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
            <input
              value={q}
              onChange={(e) =>
                navigate({ search: (prev) => ({ ...prev, q: e.target.value }), replace: true })
              }
              placeholder="¿Qué estás buscando?"
              aria-label="Buscar productos"
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
            <FilterChip
              active={cat === "todos"}
              onClick={() => navigate({ search: (p) => ({ ...p, cat: "todos" }) })}
            >
              TODOS
            </FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c.slug}
                active={cat === c.slug}
                onClick={() => navigate({ search: (p) => ({ ...p, cat: c.slug }) })}
              >
                {c.name.toUpperCase()}
              </FilterChip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 rounded-sm border border-border bg-[var(--surface)] px-4 py-3 text-xs">
            <span className="flex items-center gap-2 text-muted-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden /> FILTROS
            </span>
            <div className="flex flex-wrap gap-2">
              {SORTS.map((s) => (
                <FilterChip key={s.id} active={sort === s.id} onClick={() => setSort(s.id)}>
                  {s.label}
                </FilterChip>
              ))}
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={onlyStock}
                onChange={(e) => setOnlyStock(e.target.checked)}
                className="accent-[var(--primary)]"
              />
              Solo disponibles
            </label>
            <label className="flex items-center gap-2">
              <span className="text-muted-foreground">Hasta S/ {maxPrice}</span>
              <input
                type="range"
                min={30}
                max={1500}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                aria-label="Precio máximo"
                className="accent-[var(--primary)]"
              />
            </label>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">{results.length} productos</p>

        {results.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-muted-foreground">
              No encontramos productos con esos filtros.
            </p>
            <Link
              to="/productos"
              search={{ q: "", cat: "todos" }}
              className="mt-4 inline-block rounded-sm bg-primary px-5 py-3 text-xs font-semibold tracking-widest text-primary-foreground"
            >
              VER TODO EL CATÁLOGO
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 pb-24 lg:grid-cols-4">
            {results.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i, 6) * 0.04}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-sm border px-3 py-2 text-[10px] font-semibold tracking-[0.16em] transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
