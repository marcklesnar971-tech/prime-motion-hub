import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { PRODUCTS } from "@/lib/catalog";
import { formatPrice } from "@/lib/shop-config";

type Props = { open: boolean; onClose: () => void };

/** Buscador predictivo inmersivo: modal a pantalla completa con fondo desenfocado. */
export function SearchModal({ open, onClose }: Props) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return PRODUCTS.slice(0, 6);
    return PRODUCTS.filter((p) =>
      `${p.name} ${p.short} ${p.category}`.toLowerCase().includes(term),
    ).slice(0, 8);
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-background/80 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-label="Buscador de productos"
        >
          <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-hidden px-4 py-6 md:px-8">
            <div className="flex items-center gap-3">
              <form
                className="flex flex-1 items-center gap-3 rounded-full border border-border bg-[var(--surface)]/70 px-5 py-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  onClose();
                  navigate({ to: "/productos", search: { q, cat: "todos" } });
                }}
              >
                <Search className="h-4 w-4 text-primary" aria-hidden />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Busca mancuernas, bancas, guantes…"
                  aria-label="Buscar productos"
                  className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
              </form>
              <button
                onClick={onClose}
                aria-label="Cerrar buscador"
                className="rounded-full border border-border p-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-5 text-[11px] tracking-[0.2em] text-muted-foreground">
              {q.trim() ? `${results.length} RESULTADOS` : "SUGERENCIAS"}
            </p>

            <div className="mt-3 grid flex-1 auto-rows-min content-start gap-3 overflow-y-auto pb-6 sm:grid-cols-2">
              {results.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to="/producto/$slug"
                    params={{ slug: p.slug }}
                    onClick={onClose}
                    className="surface-card glint flex items-center gap-4 rounded-[20px] p-3 transition-colors hover:border-primary/40"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={120}
                      height={120}
                      className="product-glow h-20 w-20 shrink-0 object-contain"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{p.name}</p>
                      <p className="line-clamp-1 text-xs text-muted-foreground">{p.short}</p>
                      <p className="mt-1 font-display text-base text-primary">
                        {formatPrice(p.price)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
              {results.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No encontramos productos para “{q}”.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
