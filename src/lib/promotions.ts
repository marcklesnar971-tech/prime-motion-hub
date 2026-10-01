import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Promotion = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  discountPercent: number | null;
  productSlugs: string[];
  startsAt: string | null;
  endsAt: string | null;
  active: boolean;
};

const EMPTY: Promotion[] = [];

export async function fetchPromotions(): Promise<Promotion[]> {
  const { data, error } = await supabase
    .from("promotions")
    .select("id, title, subtitle, description, discount_percent, product_slugs, starts_at, ends_at, active")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    subtitle: r.subtitle,
    description: r.description,
    discountPercent: r.discount_percent,
    productSlugs: r.product_slugs ?? [],
    startsAt: r.starts_at,
    endsAt: r.ends_at,
    active: r.active,
  }));
}

/** Una promoción está vigente si está marcada como activa y estamos dentro de su rango de fechas. */
export function isLive(p: Promotion, now = Date.now()): boolean {
  if (!p.active) return false;
  if (p.startsAt && new Date(p.startsAt).getTime() > now) return false;
  if (p.endsAt && new Date(p.endsAt).getTime() < now) return false;
  return true;
}

export function usePromotions(): Promotion[] {
  const { data } = useQuery({
    queryKey: ["public-promotions"],
    queryFn: fetchPromotions,
    staleTime: 30_000,
    retry: 1,
  });
  return data ?? EMPTY;
}

export function useLivePromotions(): Promotion[] {
  const all = usePromotions();
  return useMemo(() => all.filter((p) => isLive(p)), [all]);
}

export type DiscountMap = Record<string, { percent: number; label: string }>;

/** Descuentos vigentes por producto, listos para aplicar al catálogo. */
export function useDiscounts(): DiscountMap {
  const live = useLivePromotions();
  return useMemo(() => {
    const map: DiscountMap = {};
    for (const promo of live) {
      const percent = promo.discountPercent ?? 0;
      if (percent <= 0) continue;
      for (const slug of promo.productSlugs) {
        const current = map[slug];
        if (!current || current.percent < percent) {
          map[slug] = { percent, label: promo.title };
        }
      }
    }
    return map;
  }, [live]);
}
