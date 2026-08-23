import { Link } from "@tanstack/react-router";
import { Home, MessageCircle, ShoppingBag, Grid2x2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { waLink } from "@/lib/cart";

export function MobileTabBar() {
  const { count, setOpen } = useCart();

  return (
    <nav
      aria-label="Navegación inferior"
      className="glass-panel fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border md:hidden"
    >
      <Link to="/" className="flex flex-col items-center gap-1 py-3 text-[10px] tracking-widest">
        <Home className="h-5 w-5" aria-hidden /> INICIO
      </Link>
      <Link
        to="/productos"
        search={{ q: "", cat: "todos" }}
        className="flex flex-col items-center gap-1 py-3 text-[10px] tracking-widest"
      >
        <Grid2x2 className="h-5 w-5" aria-hidden /> PRODUCTOS
      </Link>
      <button
        onClick={() => setOpen(true)}
        className="relative flex flex-col items-center gap-1 py-3 text-[10px] tracking-widest"
        aria-label={`Abrir carrito (${count} productos)`}
      >
        <ShoppingBag className="h-5 w-5" aria-hidden /> CARRITO
        {count > 0 && (
          <span className="absolute right-6 top-2 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
            {count}
          </span>
        )}
      </button>
      <a
        href={waLink("Hola, quisiera información sobre sus productos fitness.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 py-3 text-[10px] tracking-widest text-primary"
      >
        <MessageCircle className="h-5 w-5" aria-hidden /> WHATSAPP
      </a>
    </nav>
  );
}
