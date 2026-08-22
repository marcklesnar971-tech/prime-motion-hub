/**
 * Configuración editable por el administrador.
 * Cambiar el número de WhatsApp aquí (formato internacional, sin "+" ni espacios).
 */
export const SHOP_CONFIG = {
  brand: "GijuSport",
  whatsappNumber: "51999888777",
  currency: "S/",
  instagram: "https://instagram.com",
  tiktok: "https://tiktok.com",
  facebook: "https://facebook.com",
  schedule: "Lun a Sáb · 9:00 – 20:00 · Dom 10:00 – 14:00",
} as const;

export const formatPrice = (value: number) =>
  `${SHOP_CONFIG.currency} ${value.toFixed(2)}`;
