import { createFileRoute } from "@tanstack/react-router";
import { Reveal, LineReveal } from "@/components/site/Reveal";
import { waLink } from "@/lib/cart";
import { SHOP_CONFIG } from "@/lib/shop-config";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros | GijuSport" },
      {
        name: "description",
        content:
          "GijuSport selecciona equipamiento fitness de calidad y te asesora directamente por WhatsApp antes de comprar.",
      },
      { property: "og:title", content: "Nosotros | GijuSport" },
      {
        property: "og:description",
        content: "Conoce GijuSport: selección de equipamiento fitness y asesoría directa.",
      },
    ],
  }),
  component: NosotrosPage,
});

const POLICIES = [
  {
    title: "Envíos",
    body: "Coordinamos el envío por WhatsApp según tu distrito. Confirmamos costo y tiempo antes de despachar.",
  },
  {
    title: "Cambios y devoluciones",
    body: "Si el producto llega con falla de fábrica, escríbenos dentro de los 7 días para gestionar el cambio.",
  },
  {
    title: "Formas de pago",
    body: "Yape, Plin, transferencia bancaria y efectivo contra entrega en zonas seleccionadas.",
  },
  {
    title: "Privacidad",
    body: "Solo usamos tus datos de contacto para coordinar tu pedido. No compartimos información con terceros.",
  },
];

function NosotrosPage() {
  return (
    <div className="pt-28 md:pt-32">
      <section className="mx-auto max-w-4xl px-4 pb-16 md:px-8">
        <p className="text-[11px] tracking-[0.24em] text-primary">NOSOTROS</p>
        <LineReveal
          lines={["ENTRENA.", "EVOLUCIONA.", "SUPERA TUS LÍMITES."]}
          className="mt-3 font-display text-5xl md:text-7xl"
          lineClassName="[&:nth-child(2)]:text-primary"
        />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {SHOP_CONFIG.brand} nace para acercar equipamiento fitness confiable a quienes entrenan
            en serio. Seleccionamos cada producto, verificamos su calidad y te acompañamos con
            asesoría directa: te ayudamos a elegir según tu objetivo, tu espacio y tu presupuesto.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { k: "+2 000", v: "Pedidos atendidos" },
              { k: "20", v: "Categorías activas" },
              { k: "1:1", v: "Asesoría por WhatsApp" },
            ].map((s) => (
              <div key={s.v} className="surface-card rounded-lg p-6">
                <p className="font-display text-3xl text-primary">{s.k}</p>
                <p className="mt-1 text-xs tracking-widest text-muted-foreground">
                  {s.v.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24 md:px-8">
        <h2 className="font-display text-2xl">Políticas y términos</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {POLICIES.map((p) => (
            <Reveal key={p.title}>
              <article className="surface-card h-full rounded-lg p-5">
                <h3 className="text-sm">{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-primary/30 bg-[var(--surface)] p-6">
          <p className="text-sm text-muted-foreground">
            ¿Dudas antes de comprar? Te respondemos personalmente.
          </p>
          <a
            href={waLink("Hola, quisiera asesoría para elegir un producto.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-sm bg-primary px-6 py-3 text-xs font-semibold tracking-[0.18em] text-primary-foreground"
          >
            HABLAR POR WHATSAPP
          </a>
        </div>
      </section>
    </div>
  );
}
