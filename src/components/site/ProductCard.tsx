import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, Star } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { TiltCard } from "@/components/site/TiltCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/shop-config";
import type { Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { add, setOpen } = useCart();
  const [pulse, setPulse] = useState(false);



  return (
    <TiltCard className={cn("h-full", className)}>
      <article className="surface-card glint relative flex h-full flex-col overflow-hidden rounded-[20px]">
        <Link
          to="/producto/$slug"
          params={{ slug: product.slug }}
          className="relative block aspect-square overflow-hidden"
          aria-label={`Ver ${product.name}`}
        >
          <span aria-hidden className="accent-glow absolute inset-0 opacity-30" />
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={900}
            height={900}
            className="product-glow relative h-full w-full object-contain p-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-hover:-translate-y-1 [transform:translateZ(40px)]"
          />

          {product.tags.length > 0 && (
            <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5 [transform:translateZ(60px)]">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "rounded-sm px-2 py-0.5 text-[10px] font-semibold tracking-widest",
                    tag === "OFERTA" || tag === "PROMO"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/70 text-foreground backdrop-blur",
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span className="absolute inset-x-3 bottom-3 z-10 translate-y-3 rounded-sm bg-background/80 py-2 text-center text-[11px] font-semibold tracking-[0.2em] opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            VER PRODUCTO
          </span>
        </Link>

        <div className="flex flex-1 flex-col gap-2 p-4 [transform:translateZ(25px)]">
          <div className="flex items-center gap-1 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn("h-3 w-3", i < Math.round(product.rating) && "fill-current")}
                aria-hidden
              />
            ))}
            <span className="ml-1 text-[11px] text-muted-foreground">({product.reviews})</span>
          </div>

          <h3 className="text-base leading-tight">{product.name}</h3>
          <p className="line-clamp-2 text-xs text-muted-foreground">{product.short}</p>

          <div className="mt-auto flex items-end justify-between gap-3 pt-3">
            <div>
              {product.oldPrice && (
                <span className="block text-[11px] text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="font-display text-lg">{formatPrice(product.price)}</span>
            </div>
            <motion.div
              animate={pulse ? { scale: [1, 0.9, 1.12, 1] } : { scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button
                size="sm"
                onClick={() => {
                  add(product, 1, product.variants?.options[0]);
                  setOpen(true);
                  setPulse(true);
                  window.setTimeout(() => setPulse(false), 460);
                  toast.success(`${product.name} agregado al carrito`);
                }}
                className={cn(
                  "glint rounded-full px-4 text-[11px] font-semibold tracking-widest transition-colors duration-200",
                  pulse && "bg-primary text-primary-foreground shadow-[var(--shadow-accent)]",
                )}
              >
                <Plus className="h-3.5 w-3.5" /> AGREGAR
              </Button>
            </motion.div>

          </div>
        </div>
      </article>
    </TiltCard>
  );
}
