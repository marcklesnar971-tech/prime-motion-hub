import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { motion } from "motion/react";
import { SearchModal } from "@/components/site/SearchModal";
import { useCart } from "@/lib/cart";
import { SHOP_CONFIG } from "@/lib/shop-config";
import { waLink } from "@/lib/cart";
import { cn } from "@/lib/utils";


const NAV = [
  { to: "/productos" as const, label: "PRODUCTOS" },
  { to: "/categorias" as const, label: "CATEGORÍAS" },
  { to: "/promociones" as const, label: "PROMOCIONES" },
  { to: "/nosotros" as const, label: "NOSOTROS" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const { count, setOpen } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setMenu(false);
    navigate({ to: "/productos", search: { q: query, cat: "todos" } });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled ? "glass-panel py-2" : "py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 md:px-8">
        <Link to="/" className="font-display text-xl tracking-tight" aria-label="GijuSport inicio">
          GIJU<span className="text-primary">SPORT</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-6 lg:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={submit} className="ml-auto hidden md:block" role="search">
          <label className="flex items-center gap-2 rounded-sm border border-border bg-[var(--surface)]/70 px-3 py-2">
            <Search className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué estás buscando?"
              aria-label="Buscar productos"
              className="w-40 bg-transparent text-xs outline-none placeholder:text-muted-foreground lg:w-56"
            />
          </label>
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <button
            onClick={() => setOpen(true)}
            aria-label={`Abrir carrito (${count} productos)`}
            className="relative rounded-sm p-2.5 transition-colors hover:text-primary"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground"
              >
                {count}
              </motion.span>
            )}
          </button>

          <a
            href={waLink("Hola, quisiera información sobre sus productos fitness.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-sm bg-primary px-4 py-2.5 text-[11px] font-semibold tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90 lg:block"
          >
            WHATSAPP
          </a>

          <button
            onClick={() => setMenu((v) => !v)}
            aria-label={menu ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menu}
            className="rounded-sm p-2.5 lg:hidden"
          >
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menu && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel mt-2 lg:hidden"
        >
          <div className="mx-auto max-w-7xl px-4 py-4">
            <form onSubmit={submit} role="search" className="mb-4 md:hidden">
              <label className="flex items-center gap-2 rounded-sm border border-border bg-[var(--surface)] px-3 py-3">
                <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="¿Qué estás buscando?"
                  aria-label="Buscar productos"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </label>
            </form>
            <nav className="grid gap-1" aria-label="Menú móvil">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenu(false)}
                  className="rounded-sm px-2 py-3 text-sm font-semibold tracking-[0.14em]"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={waLink(`Hola, quisiera información sobre los productos de ${SHOP_CONFIG.brand}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-sm bg-primary px-4 py-3 text-center text-sm font-semibold tracking-[0.14em] text-primary-foreground"
              >
                ESCRIBIR POR WHATSAPP
              </a>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
}
