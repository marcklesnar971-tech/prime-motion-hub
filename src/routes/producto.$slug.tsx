import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Check, ChevronLeft, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { getProduct } from "@/lib/catalog";
import { useLiveProducts } from "@/lib/live-catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { useCart, waLink } from "@/lib/cart";
import { formatPrice } from "@/lib/shop-config";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/producto/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    return { product: product ?? null, slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.product) {
      return {
        meta: [{ title: "Producto | GijuSport" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;

    const title = `${product.name} | GijuSport`;
    return {
      meta: [
        { title },
        { name: "description", content: product.short },
        { property: "og:title", content: title },
        { property: "og:description", content: product.short },
        { property: "og:type", content: "product" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            category: product.category,
            brand: { "@type": "Brand", name: "GijuSport" },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviews,
            },
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "PEN",
              availability: product.stock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
          }),
        },
      ],
    };
  },
  component: ProductoPage,
});

function ProductoPage() {
  const { product: baseProduct, slug } = Route.useLoaderData();
  const allProducts = useLiveProducts();
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [zoom, setZoom] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const product = allProducts.find((p) => p.slug === slug) ?? baseProduct;

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-32 pb-24 text-center">
        <h1 className="font-display text-4xl">PRODUCTO NO DISPONIBLE</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Es posible que este producto ya no esté publicado.
        </p>
        <Link
          to="/productos"
          search={{ q: "", cat: "todos" }}
          className="mt-8 inline-block rounded-sm bg-primary px-6 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground"
        >
          VER CATÁLOGO
        </Link>
      </div>
    );
  }

  const selectedVariant = variant ?? product.variants?.options[0];
  const selectedColor = color ?? product.colors?.[0];
  const selectedSize = size ?? product.sizes?.[0];
  const variantLabel =
    [selectedVariant, selectedColor, selectedSize].filter(Boolean).join(" / ") || undefined;

  const images = [product.image, ...(product.gallery ?? [])].filter(Boolean);
  const mainImage = activeImage ?? images[0] ?? product.image;

  const related = allProducts.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  ).slice(0, 4);

  const waMessage = `Hola, quiero realizar una consulta sobre los siguientes productos:\n\n• ${product.name}${variantLabel ? ` (${variantLabel})` : ""} — x${qty}\n\nTotal estimado: ${formatPrice(product.price * qty)}\n\nQuisiera confirmar disponibilidad, precio final, promociones y formas de pago.`;


  return (
    <div className="pt-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Link
          to="/productos"
          search={{ q: "", cat: product.category }}
          className="inline-flex items-center gap-1 text-[11px] tracking-widest text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-3 w-3" aria-hidden /> VOLVER AL CATÁLOGO
        </Link>

        <div className="mt-6 grid gap-10 pb-16 lg:grid-cols-2">
          {/* Galería */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="surface-card relative overflow-hidden rounded-lg"
            >
              <span aria-hidden className="accent-glow absolute inset-0 opacity-60" />
              <button
                type="button"
                onClick={() => setZoom((v) => !v)}
                aria-label={zoom ? "Reducir imagen" : "Ampliar imagen"}
                className="relative block aspect-square w-full cursor-zoom-in overflow-hidden"
              >
                <motion.img
                  src={mainImage}
                  alt={product.name}
                  width={900}
                  height={900}
                  animate={{ scale: zoom ? 1.5 : 1, y: zoom ? 0 : [0, -10, 0] }}
                  transition={
                    zoom
                      ? { duration: 0.5 }
                      : { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }
                  className="h-full w-full object-contain p-10"
                />
              </button>
            </motion.div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {(images.length > 1 ? images : [0, 1, 2, 3].map(() => product.image)).map(
                (src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => setActiveImage(src)}
                    aria-label={`Ver foto ${i + 1} de ${product.name}`}
                    className={cn(
                      "surface-card aspect-square overflow-hidden rounded-md transition-opacity",
                      mainImage === src ? "opacity-100 border-primary" : "opacity-70 hover:opacity-100",
                    )}
                  >
                    <img
                      src={src}
                      alt={`${product.name} vista ${i + 1}`}
                      loading="lazy"
                      width={200}
                      height={200}
                      className={cn(
                        "h-full w-full object-contain p-3",
                        images.length <= 1 && i === 1 && "rotate-6",
                        images.length <= 1 && i === 2 && "-rotate-6 scale-110",
                        images.length <= 1 && i === 3 && "scale-95",
                      )}
                    />
                  </button>
                ),
              )}
            </div>

          </div>

          {/* Info */}
          <div>
            <p className="text-[11px] tracking-[0.24em] text-primary">
              {product.category.toUpperCase()}
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl">{product.name}</h1>

            <div className="mt-4 flex items-center gap-2 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn("h-3.5 w-3.5", i < Math.round(product.rating) && "fill-current")}
                  aria-hidden
                />
              ))}
              <span className="text-xs text-muted-foreground">
                {product.rating} · {product.reviews} reseñas
              </span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="font-display text-4xl">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="pb-1 text-sm text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-primary">
              {product.stock
                ? product.stockQty != null
                  ? `Disponible · ${product.stockQty} unidades en stock`
                  : "Disponible · stock confirmado por WhatsApp"
                : "Bajo pedido"}
            </p>
            {product.promoLabel && (
              <p className="mt-1 text-xs text-muted-foreground">
                Promoción activa: <span className="text-primary">{product.promoLabel}</span>
              </p>
            )}

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {product.variants && (
              <div className="mt-8">
                <p className="text-[11px] tracking-[0.2em] text-muted-foreground">
                  {product.variants.label.toUpperCase()}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.variants.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setVariant(opt)}
                      className={cn(
                        "min-w-14 rounded-sm border px-4 py-3 text-xs font-semibold transition-colors",
                        selectedVariant === opt
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary",
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="mt-8">
                <p className="text-[11px] tracking-[0.2em] text-muted-foreground">COLOR</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.colors.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setColor(opt)}
                      className={cn(
                        "min-w-14 rounded-sm border px-4 py-3 text-xs font-semibold transition-colors",
                        selectedColor === opt
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary",
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-8">
                <p className="text-[11px] tracking-[0.2em] text-muted-foreground">TALLA</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSize(opt)}
                      className={cn(
                        "min-w-14 rounded-sm border px-4 py-3 text-xs font-semibold transition-colors",
                        selectedSize === opt
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary",
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}


            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-sm border border-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Reducir cantidad"
                  className="p-4"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Aumentar cantidad"
                  className="p-4"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                onClick={() => {
                  add(product, qty, variantLabel);
                  setOpen(true);
                  toast.success(`${product.name} agregado al carrito`);
                }}
                className="flex-1 rounded-sm bg-primary px-6 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground shadow-[var(--shadow-accent)]"
              >
                AGREGAR AL CARRITO
              </button>
            </div>

            <a
              href={waLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block rounded-sm border border-primary/40 px-6 py-4 text-center text-xs font-semibold tracking-[0.18em] text-primary transition-colors hover:bg-primary/10"
            >
              COMPRAR POR WHATSAPP
            </a>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="surface-card rounded-md p-4">
                <h2 className="mb-3 text-xs tracking-[0.2em] text-primary">BENEFICIOS</h2>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-primary" aria-hidden /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="surface-card rounded-md p-4">
                <h2 className="mb-3 text-xs tracking-[0.2em] text-primary">ESPECIFICACIONES</h2>
                <dl className="space-y-1.5 text-xs text-muted-foreground">
                  {product.specs.map((s) => (
                    <div key={s.label} className="flex justify-between gap-3">
                      <dt>{s.label}</dt>
                      <dd className="text-foreground">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-2">
                <Truck className="h-3.5 w-3.5 text-primary" aria-hidden /> Envío coordinado
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden /> Producto verificado
              </span>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="pb-24">
            <h2 className="font-display text-2xl md:text-4xl">TAMBIÉN TE PUEDE SERVIR</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
