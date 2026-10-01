import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PRODUCTS, type Product } from "@/lib/catalog";
import { useDiscounts, type DiscountMap } from "@/lib/promotions";

/**
 * Capa "en vivo" del catálogo: fusiona los datos estáticos con los cambios
 * guardados desde el panel (/admin) en la tabla product_overrides, e incorpora
 * los productos creados desde el panel y las promociones vigentes.
 */
export type Override = {
  slug: string;
  price: number | null;
  oldPrice: number | null;
  stock: boolean | null;
  stockQty: number | null;
  image: string | null;
  gallery: string[];
  name: string | null;
  short: string | null;
  description: string | null;
  category: string | null;
  colors: string[];
  sizes: string[];
  isCustom: boolean;
  hidden: boolean;
};

export type OverrideMap = Record<string, Override>;

const EMPTY: OverrideMap = {};

export async function fetchOverrides(): Promise<OverrideMap> {
  const { data, error } = await supabase
    .from("product_overrides")
    .select(
      "slug, price, old_price, stock, stock_qty, image_url, gallery, name, short, description, category, colors, sizes, is_custom, hidden",
    );
  if (error) throw error;

  const rows = data ?? [];
  const paths = new Set<string>();
  for (const r of rows) {
    if (r.image_url) paths.add(r.image_url);
    for (const g of r.gallery ?? []) if (g) paths.add(g);
  }

  const signed: Record<string, string> = {};
  if (paths.size > 0) {
    const { data: urls } = await supabase.storage
      .from("product-photos")
      .createSignedUrls([...paths], 60 * 60);
    for (const u of urls ?? []) {
      if (u.path && u.signedUrl) signed[u.path] = u.signedUrl;
    }
  }

  const map: OverrideMap = {};
  for (const r of rows) {
    map[r.slug] = {
      slug: r.slug,
      price: r.price,
      oldPrice: r.old_price,
      stock: r.stock,
      stockQty: r.stock_qty,
      image: r.image_url ? (signed[r.image_url] ?? null) : null,
      gallery: (r.gallery ?? []).map((g) => signed[g]).filter((u): u is string => Boolean(u)),
      name: r.name,
      short: r.short,
      description: r.description,
      category: r.category,
      colors: r.colors ?? [],
      sizes: r.sizes ?? [],
      isCustom: r.is_custom ?? false,
      hidden: r.hidden ?? false,
    };
  }
  return map;
}

export function useOverrides(): OverrideMap {
  const { data } = useQuery({
    queryKey: ["public-product-overrides"],
    queryFn: fetchOverrides,
    staleTime: 30_000,
    retry: 1,
  });
  return data ?? EMPTY;
}

function applyDiscount(product: Product, discounts: DiscountMap): Product {
  const d = discounts[product.slug];
  if (!d) return product;
  const newPrice = Math.round(product.price * (1 - d.percent / 100) * 100) / 100;
  const result: Product = {
    ...product,
    price: newPrice,
    oldPrice: product.oldPrice ?? product.price,
    promoLabel: d.label,
  };
  if (!result.tags.includes("OFERTA")) result.tags = [...result.tags, "OFERTA"];
  return result;
}

export function mergeProduct(product: Product, map: OverrideMap, discounts: DiscountMap = {}): Product {
  const o = map[product.slug];
  if (!o) return applyDiscount(product, discounts);
  const merged: Product = { ...product };
  if (typeof o.price === "number") merged.price = o.price;
  if (o.oldPrice != null) merged.oldPrice = o.oldPrice;
  else if (o.oldPrice === null && o.price != null) delete merged.oldPrice;
  if (typeof o.stock === "boolean") merged.stock = o.stock;
  if (o.stockQty != null) merged.stockQty = o.stockQty;
  if (o.image) merged.image = o.image;
  if (o.gallery.length > 0) merged.gallery = o.gallery;
  if (o.name) merged.name = o.name;
  if (o.short) merged.short = o.short;
  if (o.description) merged.description = o.description;
  if (o.category) merged.category = o.category;
  if (o.colors.length > 0) merged.colors = o.colors;
  if (o.sizes.length > 0) merged.sizes = o.sizes;
  return applyDiscount(merged, discounts);
}

/** Producto creado desde el panel (no existe en el catálogo estático). */
function customProduct(o: Override): Product {
  return {
    slug: o.slug,
    name: o.name ?? o.slug,
    category: o.category ?? "accesorios",
    price: o.price ?? 0,
    ...(o.oldPrice != null ? { oldPrice: o.oldPrice } : {}),
    rating: 5,
    reviews: 0,
    short: o.short ?? "",
    description: o.description ?? o.short ?? "",
    benefits: [],
    specs: [],
    image: o.image ?? "",
    tags: ["NUEVO"],
    stock: o.stock ?? true,
    ...(o.stockQty != null ? { stockQty: o.stockQty } : {}),
    ...(o.colors.length > 0 ? { colors: o.colors } : {}),
    ...(o.sizes.length > 0 ? { sizes: o.sizes } : {}),
    ...(o.gallery.length > 0 ? { gallery: o.gallery } : {}),
  };
}

/** Catálogo completo con precios, stock, fotos, productos nuevos y promociones. */
export function useLiveProducts(): Product[] {
  const map = useOverrides();
  const discounts = useDiscounts();
  return useMemo(() => {
    const base = PRODUCTS.filter((p) => !map[p.slug]?.hidden).map((p) =>
      mergeProduct(p, map, discounts),
    );
    const staticSlugs = new Set(PRODUCTS.map((p) => p.slug));
    const extras = Object.values(map)
      .filter((o) => o.isCustom && !o.hidden && !staticSlugs.has(o.slug))
      .map((o) => applyDiscount(customProduct(o), discounts));
    return [...extras, ...base];
  }, [map, discounts]);
}

/** Un producto con sus datos actualizados desde el panel. */
export function useLiveProduct(product: Product): Product {
  const map = useOverrides();
  const discounts = useDiscounts();
  return useMemo(() => mergeProduct(product, map, discounts), [product, map, discounts]);
}
