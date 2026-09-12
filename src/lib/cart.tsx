import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type Product } from "@/lib/catalog";
import { useLiveProducts } from "@/lib/live-catalog";
import { formatPrice } from "@/lib/shop-config";
import { getWhatsappNumber, useWhatsappNumber } from "@/lib/site-settings";

export type CartLine = {
  slug: string;
  qty: number;
  variant?: string | undefined;
};

type CartContextValue = {
  lines: CartLine[];
  open: boolean;
  count: number;
  total: number;
  setOpen: (v: boolean) => void;
  add: (product: Product, qty?: number, variant?: string) => void;
  setQty: (slug: string, variant: string | undefined, qty: number) => void;
  remove: (slug: string, variant?: string) => void;
  clear: () => void;
  whatsappUrl: string;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "gijusport-cart";

const sameLine = (l: CartLine, slug: string, variant?: string) =>
  l.slug === slug && (l.variant ?? "") === (variant ?? "");

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const products = useLiveProducts();
  const whatsappNumber = useWhatsappNumber();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, products]);

  const add = useCallback((product: Product, qty = 1, variant?: string) => {
    setLines((prev) => {
      const existing = prev.find((l) => sameLine(l, product.slug, variant));
      if (existing) {
        return prev.map((l) =>
          sameLine(l, product.slug, variant) ? { ...l, qty: l.qty + qty } : l,
        );
      }
      return [...prev, { slug: product.slug, qty, variant }];
    });
  }, []);

  const setQty = useCallback((slug: string, variant: string | undefined, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !sameLine(l, slug, variant))
        : prev.map((l) => (sameLine(l, slug, variant) ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((slug: string, variant?: string) => {
    setLines((prev) => prev.filter((l) => !sameLine(l, slug, variant)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { count, total, whatsappUrl } = useMemo(() => {
    const detailed = lines
      .map((l) => ({ line: l, product: products.find((p) => p.slug === l.slug) }))
      .filter((x): x is { line: CartLine; product: Product } => Boolean(x.product));

    const total = detailed.reduce((sum, x) => sum + x.product.price * x.line.qty, 0);
    const count = lines.reduce((sum, l) => sum + l.qty, 0);

    const items = detailed
      .map(
        (x) =>
          `• ${x.product.name}${x.line.variant ? ` (${x.line.variant})` : ""} — x${x.line.qty}`,
      )
      .join("\n");

    const message =
      detailed.length > 0
        ? `Hola, quiero realizar una consulta sobre los siguientes productos:\n\n${items}\n\nTotal estimado: ${formatPrice(total)}\n\nQuisiera confirmar disponibilidad, precio final, promociones y formas de pago.`
        : "Hola, quisiera información sobre sus productos fitness.";

    return {
      count,
      total,
      whatsappUrl: `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`,
    };
  }, [lines]);

  const value: CartContextValue = {
    lines,
    open,
    count,
    total,
    setOpen,
    add,
    setQty,
    remove,
    clear,
    whatsappUrl,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}

export function waLink(message: string) {
  return `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
