import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { PACKS, PRODUCTS, getProduct } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal, LineReveal } from "@/components/site/Reveal";
import { TiltCard } from "@/components/site/TiltCard";
import { useCart, waLink } from "@/lib/cart";
import { formatPrice } from "@/lib/shop-config";

export const Route = createFileRoute("/promociones")({
  head: () => ({
    meta: [
      { title: "Promociones y packs fitness | GijuSport" },
      {
        name: "description",
        content:
          "Packs y ofertas GijuSport: pack home gym, pack fuerza y pack nutrición, además de productos con descuento.",
      },
      { property: "og:title", content: "Promociones y packs fitness | GijuSport" },
      {
        property: "og:description",
        content: "Combos y descuentos en equipamiento, accesorios y suplementos fitness.",
      },
    ],
  }),
  component: PromocionesPage,
});

function PromocionesPage() {
  const offers = PRODUCTS.filter((p) => p.oldPrice);

  return (
    <div className="pt-28 md:pt-32">
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="text-[11px] tracking-[0.24em] text-primary">PROMOCIONES</p>
        <LineReveal
          lines={["ENTRENA MÁS.", "PAGA MENOS."]}
          className="mt-3 font-display text-5xl md:text-8xl"
          lineClassName="[&:nth-child(2)]:text-primary"
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {PACKS.map((pack, i) => (
            <Reveal key={pack.slug} delay={i * 0.06}>
              <TiltCard className="h-full">
                <article className="surface-card flex h-full flex-col overflow-hidden rounded-lg">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface)]">
                    <span aria-hidden className="accent-glow absolute inset-0 opacity-50" />
                    <img
                      src={pack.image}
                      alt={pack.name}
                      loading="lazy"
                      width={900}
                      height={900}
                      className="relative h-full w-full object-contain p-6 [transform:translateZ(40px)]"
                    />
                    <span className="absolute left-3 top-3 rounded-sm bg-primary px-2 py-0.5 text-[10px] font-bold tracking-widest text-primary-foreground">
                      PROMO
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-display text-xl">{pack.name}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">{pack.claim}</p>
                    <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                      {pack.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-primary" aria-hidden /> {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-end justify-between pt-6">
                      <div>
                        <span className="block text-[11px] text-muted-foreground line-through">
                          {formatPrice(pack.oldPrice)}
                        </span>
                        <span className="font-display text-2xl">{formatPrice(pack.price)}</span>
                      </div>
                      <a
                        href={waLink(
                          `Hola, quiero información sobre el ${pack.name} (${formatPrice(pack.price)}).`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-sm bg-primary px-4 py-3 text-[11px] font-semibold tracking-widest text-primary-foreground"
                      >
                        VER PACK
                      </a>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-20 md:px-8">
        <h2 className="font-display text-3xl md:text-5xl">
          PRODUCTOS EN <span className="text-primary">OFERTA</span>
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {offers.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 6) * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <QuickPackCta />
      </section>
    </div>
  );
}

function QuickPackCta() {
  const { add, setOpen } = useCart();

  return (
    <div className="mt-14 rounded-lg border border-primary/30 bg-[var(--surface)] p-6 md:p-10">
      <h3 className="font-display text-2xl md:text-3xl">¿NO SABES POR DÓNDE EMPEZAR?</h3>
      <p className="mt-2 max-w-lg text-sm text-muted-foreground">
        Arma el kit básico en un clic y consúltanos el precio final por WhatsApp.
      </p>
      <button
        onClick={() => {
          ["bandas-elasticas-set", "hand-grip-ajustable", "mat-pro-10mm", "soga-speed-pro"].forEach(
            (slug) => {
              const product = getProduct(slug);
              if (product) add(product, 1, product.variants?.options[0]);
            },
          );
          setOpen(true);
          toast.success("Pack Home Gym agregado al carrito");
        }}
        className="mt-6 rounded-sm bg-primary px-6 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground"
      >
        AGREGAR PACK HOME GYM
      </button>
    </div>
  );
}
