import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Headphones, PackageCheck, Star, Tag, Users } from "lucide-react";
import { Hero } from "@/components/site/Hero";
import { Reveal, LineReveal } from "@/components/site/Reveal";
import { TiltCard } from "@/components/site/TiltCard";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, PACKS, PRODUCTS } from "@/lib/catalog";
import { formatPrice } from "@/lib/shop-config";
import { waLink } from "@/lib/cart";
import protein from "@/assets/p-protein.png";
import creatine from "@/assets/p-creatine.png";
import bike from "@/assets/p-bike.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GijuSport | Tienda fitness premium y equipamiento de entrenamiento" },
      {
        name: "description",
        content:
          "Pesas, guantes, cinturones, bandas elásticas, suplementos y máquinas. Arma tu pedido y confírmalo por WhatsApp con GijuSport.",
      },
      { property: "og:title", content: "GijuSport | Tienda fitness premium" },
      {
        property: "og:description",
        content:
          "Equipamiento, accesorios y suplementos fitness. Selecciona tus productos y cotiza por WhatsApp.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller);
  const supplements = PRODUCTS.filter((p) => p.category === "suplementos");

  return (
    <>
      <Hero />
      <Categories />
      <BestSellers products={bestSellers} />
      <Promos />
      <SupplementsLab supplements={supplements} />
      <Equipment />
      <Trust />
      <Testimonials />
      <WhatsappCta />
    </>
  );
}

function Categories() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="text-[11px] tracking-[0.24em] text-primary">CATEGORÍAS</p>
        <LineReveal
          lines={["ENCUENTRA", "TU EQUIPO."]}
          className="mt-3 font-display text-5xl md:text-7xl"
          lineClassName="[&:nth-child(2)]:text-primary"
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CATEGORIES.slice(0, 8).map((c, i) => (
          <Reveal key={c.slug} delay={Math.min(i, 6) * 0.05}>
            <TiltCard className="h-full">
              <Link
                to="/productos"
                search={{ q: "", cat: c.slug }}
                className="surface-card flex h-full flex-col overflow-hidden rounded-lg"
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
                <div className="flex items-center justify-between gap-2 p-4 [transform:translateZ(20px)]">
                  <div>
                    <h3 className="text-sm">{c.name}</h3>
                    <p className="text-[11px] text-muted-foreground">{c.blurb}</p>
                  </div>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </div>
              </Link>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <Link
          to="/categorias"
          className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-primary"
        >
          VER TODAS LAS CATEGORÍAS <ArrowRight className="h-3 w-3" aria-hidden />
        </Link>
      </Reveal>
    </section>
  );
}

function BestSellers({ products }: { products: typeof PRODUCTS }) {
  return (
    <section className="relative overflow-hidden bg-[var(--surface)] py-24 md:py-32">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 left-0 whitespace-nowrap font-display text-[16vw] leading-none text-outline opacity-40"
      >
        BEST SELLERS
      </span>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.24em] text-primary">MÁS VENDIDOS</p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">
            LOS FAVORITOS DE LA <span className="text-primary">COMUNIDAD</span>
          </h2>
        </Reveal>

        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0">
          {products.map((p) => (
            <div key={p.slug} className="w-[72vw] shrink-0 snap-start sm:w-72">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Promos() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="text-[11px] tracking-[0.24em] text-primary">PROMOCIONES</p>
        <LineReveal
          lines={["ENTRENA MÁS.", "PAGA MENOS."]}
          className="mt-3 font-display text-5xl md:text-7xl"
          lineClassName="[&:nth-child(2)]:text-primary"
        />
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {PACKS.map((pack, i) => (
          <Reveal key={pack.slug} delay={i * 0.06}>
            <TiltCard className="h-full">
              <article className="surface-card flex h-full flex-col overflow-hidden rounded-lg">
                <div className="relative aspect-[16/10] bg-[var(--surface)]">
                  <span aria-hidden className="accent-glow absolute inset-0 opacity-50" />
                  <img
                    src={pack.image}
                    alt={pack.name}
                    loading="lazy"
                    width={900}
                    height={900}
                    className="relative h-full w-full object-contain p-6 [transform:translateZ(40px)]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg">{pack.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{pack.claim}</p>
                  <div className="mt-auto flex items-end justify-between pt-6">
                    <span className="font-display text-xl">{formatPrice(pack.price)}</span>
                    <Link
                      to="/promociones"
                      className="text-[11px] font-semibold tracking-widest text-primary"
                    >
                      VER PACK
                    </Link>
                  </div>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SupplementsLab({ supplements }: { supplements: typeof PRODUCTS }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const orbit = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--surface)] py-24 md:py-32"
      aria-label="Suplementos"
    >
      <div className="accent-glow absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-2">
        <div>
          <p className="text-[11px] tracking-[0.24em] text-primary">SUPLEMENTOS</p>
          <LineReveal
            lines={["RECUPERA.", "ALIMENTA.", "RINDE."]}
            className="mt-3 font-display text-5xl md:text-7xl"
            lineClassName="[&:nth-child(3)]:text-primary"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-sm text-muted-foreground">
              Proteína, creatina, Collagen Fit y Quemadores XB. Consulta con un profesional de la
              salud antes de iniciar cualquier suplementación.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {supplements.map((s, i) => (
              <Reveal key={s.slug} delay={0.1 + i * 0.05}>
                <Link
                  to="/producto/$slug"
                  params={{ slug: s.slug }}
                  className="surface-card flex items-center gap-3 rounded-md p-3 transition-colors hover:border-primary/50"
                >
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    width={120}
                    height={120}
                    className="h-12 w-12 object-contain"
                  />
                  <span className="text-xs">
                    {s.name}
                    <span className="block text-primary">{formatPrice(s.price)}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <motion.div style={{ rotate: orbit }} className="absolute inset-0" aria-hidden>
            <div className="absolute inset-6 rounded-full border border-primary/15" />
            <div className="absolute inset-16 rounded-full border border-primary/10" />
            <motion.img
              src={protein}
              alt=""
              loading="lazy"
              width={200}
              height={200}
              style={{ rotate: useTransform(orbit, (v) => -v) }}
              className="absolute left-1/2 top-2 h-20 w-20 -translate-x-1/2 object-contain opacity-80"
            />
          </motion.div>
          <motion.img
            src={creatine}
            alt="Creatina monohidratada GijuSport"
            loading="lazy"
            width={600}
            height={600}
            style={{ scale, rotate }}
            className="relative mx-auto h-full w-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.7)]"
          />
        </div>
      </div>
    </section>
  );
}

function Equipment() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.08, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:px-8 lg:grid-cols-2">
        <motion.div style={{ x, scale }} className="order-2 lg:order-1">
          <img
            src={bike}
            alt="Bicicleta estática Core de GijuSport"
            loading="lazy"
            width={900}
            height={900}
            className="w-full object-contain drop-shadow-[0_50px_60px_rgba(0,0,0,0.8)]"
          />
        </motion.div>

        <div className="order-1 lg:order-2">
          <p className="text-[11px] tracking-[0.24em] text-primary">EQUIPAMIENTO</p>
          <LineReveal
            lines={["HOME GYM", "PREMIUM."]}
            className="mt-3 font-display text-5xl md:text-7xl"
            lineClassName="[&:nth-child(2)]:text-primary"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-sm text-muted-foreground">
              Bicicletas estáticas, máquinas y pesas para construir tu espacio de entrenamiento sin
              salir de casa.
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 text-xs">
            {["RESISTENCIA", "ERGONOMÍA", "DISEÑO", "ENTRENAMIENTO"].map((k) => (
              <span key={k} className="surface-card rounded-sm px-4 py-3 tracking-widest">
                <span className="mr-2 text-primary">●</span>
                {k}
              </span>
            ))}
          </div>
          <Link
            to="/productos"
            search={{ q: "", cat: "cardio" }}
            className="mt-8 inline-block rounded-sm bg-primary px-7 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground"
          >
            EQUIPA TU ESPACIO
          </Link>
        </div>
      </div>
    </section>
  );
}

const TRUST = [
  {
    icon: PackageCheck,
    title: "PRODUCTOS SELECCIONADOS",
    body: "Equipamiento pensado para tu entrenamiento.",
  },
  { icon: Headphones, title: "ATENCIÓN DIRECTA", body: "Te atendemos personalmente por WhatsApp." },
  { icon: Tag, title: "PROMOCIONES", body: "Encuentra ofertas y packs especiales." },
  { icon: Users, title: "ASESORÍA", body: "Te ayudamos a elegir el producto adecuado." },
];

function Trust() {
  return (
    <section className="bg-[var(--surface)] py-20">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-4 md:px-8">
        {TRUST.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.05}>
            <article className="surface-card h-full rounded-lg p-6">
              <t.icon className="h-5 w-5 text-primary" aria-hidden />
              <h3 className="mt-4 text-xs tracking-[0.16em]">{t.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{t.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: "Diego R.", text: "Excelente calidad y atención. El pedido llegó rápido." },
  { name: "Camila S.", text: "Me asesoraron por WhatsApp y elegí justo lo que necesitaba." },
  { name: "Marco P.", text: "Los guantes y el cinturón son firmes, se nota la diferencia." },
];

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <Reveal>
        <p className="text-[11px] tracking-[0.24em] text-primary">COMUNIDAD</p>
        <h2 className="mt-3 font-display text-4xl md:text-6xl">ENTRENAN CON NOSOTROS</h2>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.06}>
            <figure className="surface-card h-full rounded-lg p-6">
              <div className="flex gap-1 text-primary" aria-label="5 de 5 estrellas">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3 w-3 fill-current" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 text-sm text-muted-foreground">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-xs tracking-widest">— {r.name}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhatsappCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
      <div className="relative overflow-hidden rounded-xl border border-primary/25 bg-[var(--surface)] p-8 md:p-16">
        <span aria-hidden className="accent-glow absolute inset-0 opacity-80" />
        <div className="relative">
          <LineReveal
            lines={["ARMA TU PEDIDO.", "CONFÍRMALO POR WHATSAPP."]}
            className="font-display text-3xl md:text-6xl"
            lineClassName="[&:nth-child(2)]:text-primary"
          />
          <p className="mt-6 max-w-lg text-sm text-muted-foreground">
            Agrega los productos que necesitas, revisa tu carrito y te llegará el mensaje listo para
            enviar. Sin formularios, sin pasos extra.
          </p>
          <a
            href={waLink("Hola, quisiera información sobre sus productos fitness.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-sm bg-primary px-7 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground shadow-[var(--shadow-accent)]"
          >
            ESCRIBIR POR WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}
