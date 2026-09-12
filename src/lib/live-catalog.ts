import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PRODUCTS, type Product } from "@/lib/catalog";

/**
 * Capa "en vivo" del catálogo: fusiona los datos estáticos con los cambios
 * guardados desde el panel (/admin) en la tabla product_overrides.
 */
export type Override = {
  price: number | null;
  oldPrice: number | null;
  stock: boolean | null;
  image: string | null;
};

export type OverrideMap = Record<string, Override>;

const EMPTY: OverrideMap = {};

async function fetchOverrides(): Promise<OverrideMap> {
  const { data, error } = await supabase
    .from("product_overrides")
    .select("slug, price, old_price, stock, image_url");
  if (error) throw error;

  const rows = data ?? [];
  const paths = rows
    .map((r) => r.image_url)
    .filter((p): p is string => typeof p === "string" && p.length > 0);

  const signed: Record<string, string> = {};
  if (paths.length > 0) {
    const { data: urls } = await supabase.storage
      .from("product-photos")
      .createSignedUrls(paths, 60 * 60);
    for (const u of urls ?? []) {
      if (u.path && u.signedUrl) signed[u.path] = u.signedUrl;
    }
  }

  const map: OverrideMap = {};
  for (const r of rows) {
    map[r.slug] = {
      price: r.price,
      oldPrice: r.old_price,
      stock: r.stock,
      image: r.image_url ? (signed[r.image_url] ?? null) : null,
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

export function mergeProduct(product: Product, map: OverrideMap): Product {
  const o = map[product.slug];
  if (!o) return product;
  const merged: Product = { ...product };
  if (typeof o.price === "number") merged.price = o.price;
  if (o.oldPrice != null) merged.oldPrice = o.oldPrice;
  else if (o.oldPrice === null && o.price != null) delete merged.oldPrice;
  if (typeof o.stock === "boolean") merged.stock = o.stock;
  if (o.image) merged.image = o.image;
  return merged;
}

/** Catálogo completo con los precios, stock y fotos actualizados desde el panel. */
export function useLiveProducts(): Product[] {
  const map = useOverrides();
  return useMemo(() => PRODUCTS.map((p) => mergeProduct(p, map)), [map]);
}

/** Un producto con sus datos actualizados desde el panel. */
export function useLiveProduct(product: Product): Product {
  const map = useOverrides();
  return useMemo(() => mergeProduct(product, map), [product, map]);
}
