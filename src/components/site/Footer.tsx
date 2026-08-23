import { Link } from "@tanstack/react-router";
import { SHOP_CONFIG } from "@/lib/shop-config";
import { waLink } from "@/lib/cart";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[var(--surface)] pb-24 pt-16 md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-display text-2xl">
            GIJU<span className="text-primary">SPORT</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Equipamiento, accesorios y suplementos para llevar tu entrenamiento al siguiente nivel.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">{SHOP_CONFIG.schedule}</p>
        </div>

        <nav aria-label="Tienda" className="text-sm">
          <h2 className="mb-3 text-xs tracking-[0.2em] text-primary">TIENDA</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/productos" search={{ q: "", cat: "todos" }} className="hover:text-foreground">
                Productos
              </Link>
            </li>
            <li>
              <Link to="/categorias" className="hover:text-foreground">
                Categorías
              </Link>
            </li>
            <li>
              <Link to="/promociones" className="hover:text-foreground">
                Promociones
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="hover:text-foreground">
                Nosotros
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Contacto" className="text-sm">
          <h2 className="mb-3 text-xs tracking-[0.2em] text-primary">CONTACTO</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href={waLink("Hola, quisiera información sobre sus productos fitness.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={SHOP_CONFIG.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                Instagram
              </a>
            </li>
            <li>
              <a href={SHOP_CONFIG.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                TikTok
              </a>
            </li>
            <li>
              <a href={SHOP_CONFIG.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                Facebook
              </a>
            </li>
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="mb-3 text-xs tracking-[0.2em] text-primary">INFORMACIÓN</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>Pagos: Yape, Plin, transferencia, efectivo</li>
            <li>
              <Link to="/nosotros" className="hover:text-foreground">
                Políticas y términos
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="hover:text-foreground">
                Privacidad
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
        <p className="border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SHOP_CONFIG.brand}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
