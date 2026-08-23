import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/catalog";
import { Reveal } from "@/components/site/Reveal";
import { TiltCard } from "@/components/site/TiltCard";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Categorías fitness | GijuSport" },
      {
        name: "description",
        content:
          "Guantes, cinturones, pesas, bandas elásticas, suplementos, cardio y protección. Encuentra tu equipo en GijuSport.",
      },
      { property: "og:title", content: "Categorías fitness | GijuSport" },
      {
        property: "og:description",
        content: "Explora las categorías de equipamiento y accesorios fitness de GijuSport.",
      },
    ],
  }),
  component: CategoriasPage,
});

function CategoriasPage() {
  return (
    <div className="pt-28 md:pt-32">
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.24em] text-primary">CATEGORÍAS</p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">
            ENCUENTRA <span className="text-primary">TU EQUIPO.</span>
          </h1>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i, 8) * 0.04}>
              <TiltCard>
                <Link
                  to="/productos"
                  search={{ q: "", cat: c.slug }}
                  className="surface-card block overflow-hidden rounded-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
                    <span aria-hidden className="accent-glow absolute inset-0 opacity-40" />
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      width={900}
                      height={900}
                      className="relative h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-110 [transform:translateZ(35px)]"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 [transform:translateZ(20px)]">
                    <div>
                      <h2 className="font-display text-base">{c.name}</h2>
                      <p className="text-xs text-muted-foreground">{c.blurb}</p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-semibold tracking-widest text-primary">
                      EXPLORAR <ArrowUpRight className="h-3 w-3" aria-hidden />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
