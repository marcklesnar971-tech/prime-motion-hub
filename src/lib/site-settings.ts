import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SHOP_CONFIG } from "@/lib/shop-config";

/** Número de WhatsApp vigente (editable desde /admin). */
let currentNumber: string = SHOP_CONFIG.whatsappNumber;

export const getWhatsappNumber = () => currentNumber;

export const normalizeWhatsappNumber = (value: string) =>
  value.replace(/[^0-9]/g, "");

export async function fetchWhatsappNumber(): Promise<string> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("whatsapp_number")
    .eq("id", "default")
    .maybeSingle();
  if (error) throw error;
  const num = normalizeWhatsappNumber(data?.whatsapp_number ?? "");
  return num || SHOP_CONFIG.whatsappNumber;
}

export function useWhatsappNumber(): string {
  const { data } = useQuery({
    queryKey: ["site-settings-whatsapp"],
    queryFn: fetchWhatsappNumber,
    staleTime: 30_000,
    retry: 1,
  });
  if (data) currentNumber = data;
  return data ?? currentNumber;
}
