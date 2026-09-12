import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useLiveProducts } from "@/lib/live-catalog";
import { formatPrice } from "@/lib/shop-config";

export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, total, whatsappUrl, clear } = useCart();

  const detailed = lines
    .map((line) => ({ line, product: products.find((p) => p.slug === line.slug) }))
    .filter((x) => x.product);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-label="Carrito de compras"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-[var(--surface)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 210, damping: 34, mass: 0.9 }}
          >
            <header className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="flex items-center gap-2 text-lg">
                <ShoppingBag className="h-4 w-4 text-primary" aria-hidden /> Carrito
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar carrito"
                className="rounded-sm p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {detailed.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <p className="text-sm text-muted-foreground">Tu carrito está vacío.</p>
                  <Button asChild variant="secondary" onClick={() => setOpen(false)}>
                    <Link to="/productos" search={{ q: "", cat: "todos" }}>
                      VER PRODUCTOS
                    </Link>
                  </Button>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {detailed.map(({ line, product }) => (
                      <motion.li
                        key={`${line.slug}-${line.variant ?? ""}`}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        className="glint flex gap-3 rounded-[20px] border border-border bg-[var(--surface-2)] p-3"
                      >
                        <img
                          src={product!.image}
                          alt={product!.name}
                          loading="lazy"
                          width={80}
                          height={80}
                          className="product-glow h-16 w-16 shrink-0 object-contain"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{product!.name}</p>
                          {line.variant && (
                            <p className="text-[11px] text-muted-foreground">{line.variant}</p>
                          )}
                          <p className="mt-1 text-sm text-primary">
                            {formatPrice(product!.price * line.qty)}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              aria-label={`Quitar una unidad de ${product!.name}`}
                              onClick={() => setQty(line.slug, line.variant, line.qty - 1)}
                              className="rounded-sm border border-border p-1.5 transition-colors hover:border-primary"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm">{line.qty}</span>
                            <button
                              aria-label={`Agregar una unidad de ${product!.name}`}
                              onClick={() => setQty(line.slug, line.variant, line.qty + 1)}
                              className="rounded-sm border border-border p-1.5 transition-colors hover:border-primary"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                            <button
                              aria-label={`Eliminar ${product!.name}`}
                              onClick={() => remove(line.slug, line.variant)}
                              className="ml-auto rounded-sm p-1.5 text-muted-foreground transition-colors hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {detailed.length > 0 && (
              <footer className="space-y-3 border-t border-border px-5 py-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm tracking-widest">TOTAL</span>
                  <span className="font-display text-2xl text-primary">{formatPrice(total)}</span>
                </div>
                <div className="pill-shimmer">
                  <Button
                    asChild
                    size="lg"
                    className="glint w-full rounded-full tracking-widest"
                  >
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      FINALIZAR PEDIDO POR WHATSAPP
                    </a>
                  </Button>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <button onClick={clear} className="underline-offset-4 hover:underline">
                    Vaciar carrito
                  </button>
                  <span>Revisa el mensaje antes de enviarlo.</span>
                </div>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
