import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/cart";

export function WhatsAppFab() {
  return (
    <a
      href={waLink("Hola, quisiera información sobre sus productos fitness.")}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full bg-primary px-3.5 py-3.5 text-primary-foreground shadow-[var(--shadow-accent)] transition-transform duration-300 hover:scale-[1.04] md:bottom-6"
      aria-label="Escribir por WhatsApp"
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold tracking-widest transition-all duration-300 group-hover:max-w-[10rem] md:group-hover:pr-1">
        ¿NECESITAS AYUDA?
      </span>
    </a>
  );
}
