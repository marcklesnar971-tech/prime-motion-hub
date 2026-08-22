import gloves from "@/assets/p-gloves.png";
import belt from "@/assets/p-belt.png";
import protein from "@/assets/p-protein.png";
import creatine from "@/assets/p-creatine.png";
import bands from "@/assets/p-bands.png";
import ankle from "@/assets/p-ankle.png";
import bike from "@/assets/p-bike.png";
import grip from "@/assets/p-grip.png";
import rope from "@/assets/p-rope.png";
import mat from "@/assets/p-mat.png";
import scale from "@/assets/p-scale.png";
import vest from "@/assets/p-vest.png";
import knee from "@/assets/p-knee.png";
import dumbbell from "@/assets/hero-dumbbell.png";

export type Tag = "NUEVO" | "OFERTA" | "MÁS VENDIDO" | "TOP" | "PROMO";

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  short: string;
  description: string;
  benefits: string[];
  specs: { label: string; value: string }[];
  variants?: { label: string; options: string[] };
  image: string;
  tags: Tag[];
  stock: boolean;
  bestSeller?: boolean;
  featured?: boolean;
};

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  { slug: "guantes", name: "Guantes", blurb: "Agarre y protección", image: gloves },
  { slug: "cinturones", name: "Cinturones", blurb: "Soporte lumbar", image: belt },
  { slug: "pesas", name: "Pesas", blurb: "Carga progresiva", image: dumbbell },
  { slug: "bandas", name: "Bandas elásticas", blurb: "Resistencia variable", image: bands },
  { slug: "tobilleras", name: "Tobilleras", blurb: "Peso adicional", image: ankle },
  { slug: "chalecos", name: "Chalecos de peso", blurb: "Intensidad extra", image: vest },
  { slug: "suplementos", name: "Suplementos", blurb: "Recuperación", image: protein },
  { slug: "cardio", name: "Cardio", blurb: "Resistencia", image: bike },
  { slug: "hand-grip", name: "Hand grip", blurb: "Fuerza de agarre", image: grip },
  { slug: "sogas", name: "Sogas", blurb: "Velocidad", image: rope },
  { slug: "mat", name: "Mat / Colchonetas", blurb: "Suelo y core", image: mat },
  { slug: "balanzas", name: "Balanzas", blurb: "Control y medición", image: scale },
  { slug: "proteccion", name: "Protección", blurb: "Rodilleras y soportes", image: knee },
  { slug: "accesorios", name: "Accesorios", blurb: "Complementos", image: grip },
];

const base = {
  stock: true,
  reviews: 42,
};

export const PRODUCTS: Product[] = [
  {
    ...base,
    slug: "guantes-pro-training",
    name: "Guantes Pro Training",
    category: "guantes",
    price: 69.9,
    oldPrice: 89.9,
    rating: 4.8,
    reviews: 128,
    short: "Mayor agarre y protección durante tus entrenamientos.",
    description:
      "Guantes de entrenamiento con palma antideslizante reforzada y muñequera ajustable. Diseñados para levantamientos, funcional y trabajo con barra.",
    benefits: ["Palma antideslizante", "Muñequera ajustable", "Transpirable", "Evita callos"],
    specs: [
      { label: "Material", value: "Microfibra + neopreno" },
      { label: "Tallas", value: "S / M / L / XL" },
      { label: "Uso", value: "Fuerza, funcional" },
    ],
    variants: { label: "Talla", options: ["S", "M", "L", "XL"] },
    image: gloves,
    tags: ["MÁS VENDIDO", "OFERTA"],
    bestSeller: true,
    featured: true,
  },
  {
    ...base,
    slug: "cinturon-lumbar-power",
    name: "Cinturón Lumbar Power",
    category: "cinturones",
    price: 119.9,
    rating: 4.9,
    reviews: 87,
    short: "Soporte firme para levantamientos pesados.",
    description:
      "Cinturón de cuero con hebilla metálica de doble pin. Estabiliza la zona lumbar en sentadillas, peso muerto y press militar.",
    benefits: ["Soporte lumbar", "Cuero resistente", "Hebilla metálica", "Ajuste preciso"],
    specs: [
      { label: "Ancho", value: "10 cm" },
      { label: "Material", value: "Cuero genuino" },
      { label: "Tallas", value: "M / L / XL" },
    ],
    variants: { label: "Talla", options: ["M", "L", "XL"] },
    image: belt,
    tags: ["TOP"],
    bestSeller: true,
  },
  {
    ...base,
    slug: "pesa-hexagonal-20kg",
    name: "Pesa Hexagonal 20 kg",
    category: "pesas",
    price: 249.9,
    rating: 4.9,
    reviews: 64,
    short: "Mancuerna hexagonal recubierta, base antirodadura.",
    description:
      "Mancuerna hexagonal con recubrimiento de caucho y mango moleteado de acero. No rueda, protege el piso y soporta uso intensivo.",
    benefits: ["No rueda", "Mango moleteado", "Protege el piso", "Uso intensivo"],
    specs: [
      { label: "Peso", value: "20 kg" },
      { label: "Material", value: "Acero + caucho" },
      { label: "Venta", value: "Por unidad" },
    ],
    image: dumbbell,
    tags: ["TOP"],
    featured: true,
  },
  {
    ...base,
    slug: "pesa-hexagonal-1kg",
    name: "Pesa Hexagonal 1 kg",
    category: "pesas",
    price: 29.9,
    rating: 4.6,
    reviews: 51,
    short: "Ideal para tonificación y rutinas de alta repetición.",
    description:
      "Mancuerna compacta de 1 kg con recubrimiento antideslizante. Perfecta para rutinas de tonificación, movilidad y rehabilitación.",
    benefits: ["Compacta", "Antideslizante", "Fácil de guardar"],
    specs: [
      { label: "Peso", value: "1 kg" },
      { label: "Venta", value: "Por unidad" },
    ],
    image: dumbbell,
    tags: ["NUEVO"],
  },
  {
    ...base,
    slug: "bandas-elasticas-set",
    name: "Bandas Elásticas Set",
    category: "bandas",
    price: 59.9,
    oldPrice: 79.9,
    rating: 4.7,
    reviews: 143,
    short: "Resistencia progresiva para entrenar en cualquier lugar.",
    description:
      "Set de bandas de látex con distintos niveles de resistencia. Ideales para activación, fuerza y entrenamiento en casa o viaje.",
    benefits: ["Resistencia progresiva", "Portátil", "Full body", "Látex reforzado"],
    specs: [
      { label: "Incluye", value: "3 niveles" },
      { label: "Material", value: "Látex natural" },
    ],
    variants: { label: "Resistencia", options: ["Ligera", "Media", "Fuerte"] },
    image: bands,
    tags: ["OFERTA", "MÁS VENDIDO"],
    bestSeller: true,
  },
  {
    ...base,
    slug: "tobilleras-2kg",
    name: "Tobilleras 2 kg",
    category: "tobilleras",
    price: 49.9,
    rating: 4.6,
    reviews: 39,
    short: "Peso adicional para piernas y glúteos.",
    description:
      "Par de tobilleras de neopreno con relleno uniforme y cierre de velcro reforzado. Cómodas para caminatas, cardio y trabajo de piernas.",
    benefits: ["Par incluido", "Velcro reforzado", "Neopreno suave"],
    specs: [
      { label: "Peso", value: "2 kg (1 kg c/u)" },
      { label: "Contenido", value: "Par" },
    ],
    image: ankle,
    tags: ["MÁS VENDIDO"],
    bestSeller: true,
  },
  {
    ...base,
    slug: "tobilleras-3kg",
    name: "Tobilleras 3 kg",
    category: "tobilleras",
    price: 59.9,
    rating: 4.7,
    reviews: 33,
    short: "Intensidad media para rutinas de piernas.",
    description:
      "Par de tobilleras de 3 kg con ajuste firme y acolchado interior. Añade carga controlada a tus movimientos.",
    benefits: ["Ajuste firme", "Acolchado interior", "Par incluido"],
    specs: [
      { label: "Peso", value: "3 kg (1.5 kg c/u)" },
      { label: "Contenido", value: "Par" },
    ],
    image: ankle,
    tags: [],
  },
  {
    ...base,
    slug: "tobilleras-4kg",
    name: "Tobilleras 4 kg",
    category: "tobilleras",
    price: 69.9,
    rating: 4.7,
    reviews: 21,
    short: "Máxima carga para entrenamiento avanzado.",
    description:
      "Par de tobilleras de 4 kg para atletas que buscan mayor exigencia en piernas y core.",
    benefits: ["Alta carga", "Costuras reforzadas", "Par incluido"],
    specs: [
      { label: "Peso", value: "4 kg (2 kg c/u)" },
      { label: "Contenido", value: "Par" },
    ],
    image: ankle,
    tags: [],
  },
  {
    ...base,
    slug: "chaleco-peso-10kg",
    name: "Chaleco de Peso 10 kg",
    category: "chalecos",
    price: 229.9,
    rating: 4.8,
    reviews: 27,
    short: "Sobrecarga distribuida para calistenia y cardio.",
    description:
      "Chaleco ajustable con bolsillos de carga distribuida. Aumenta la intensidad en dominadas, flexiones y trote.",
    benefits: ["Carga distribuida", "Ajuste lateral", "Diseño compacto"],
    specs: [
      { label: "Peso", value: "10 kg" },
      { label: "Talla", value: "Única ajustable" },
    ],
    image: vest,
    tags: ["TOP"],
    featured: true,
  },
  {
    ...base,
    slug: "chaleco-peso-20kg",
    name: "Chaleco de Peso 20 kg",
    category: "chalecos",
    price: 349.9,
    rating: 4.8,
    reviews: 18,
    short: "Para atletas que buscan máxima exigencia.",
    description:
      "Chaleco de 20 kg con lastres removibles para regular la carga según tu progresión.",
    benefits: ["Lastres removibles", "Alta resistencia", "Ajuste firme"],
    specs: [
      { label: "Peso", value: "20 kg" },
      { label: "Lastres", value: "Removibles" },
    ],
    image: vest,
    tags: ["NUEVO"],
  },
  {
    ...base,
    slug: "proteina-performance",
    name: "Proteína Performance",
    category: "suplementos",
    price: 189.9,
    oldPrice: 219.9,
    rating: 4.9,
    reviews: 210,
    short: "Aporte proteico para tu rutina diaria.",
    description:
      "Proteína en polvo de fácil disolución. Complementa tu alimentación según tus objetivos de entrenamiento.",
    benefits: ["Fácil disolución", "Sabor neutro-chocolate", "Formato 900 g"],
    specs: [
      { label: "Contenido", value: "900 g" },
      { label: "Sabores", value: "Chocolate / Vainilla" },
    ],
    variants: { label: "Sabor", options: ["Chocolate", "Vainilla"] },
    image: protein,
    tags: ["MÁS VENDIDO", "OFERTA"],
    bestSeller: true,
    featured: true,
  },
  {
    ...base,
    slug: "creatina-monohidratada",
    name: "Creatina Monohidratada",
    category: "suplementos",
    price: 149.9,
    rating: 4.9,
    reviews: 176,
    short: "Formato en polvo micronizado, 300 g.",
    description:
      "Creatina monohidratada micronizada en envase de 300 g. Consulta con tu especialista antes de iniciar cualquier suplementación.",
    benefits: ["Micronizada", "300 g", "Sin sabor"],
    specs: [
      { label: "Contenido", value: "300 g" },
      { label: "Porciones", value: "60" },
    ],
    image: creatine,
    tags: ["TOP"],
    bestSeller: true,
    featured: true,
  },
  {
    ...base,
    slug: "collagen-fit",
    name: "Collagen Fit",
    category: "suplementos",
    price: 129.9,
    rating: 4.7,
    reviews: 64,
    short: "Colágeno en polvo de disolución rápida.",
    description: "Suplemento de colágeno en polvo para incorporar a tu rutina diaria.",
    benefits: ["Disolución rápida", "Formato práctico"],
    specs: [{ label: "Contenido", value: "300 g" }],
    image: protein,
    tags: ["NUEVO"],
  },
  {
    ...base,
    slug: "quemadores-xb",
    name: "Quemadores XB",
    category: "suplementos",
    price: 99.9,
    rating: 4.5,
    reviews: 48,
    short: "Cápsulas en presentación de 60 unidades.",
    description:
      "Presentación en cápsulas. Consulta con un profesional de la salud antes de consumir cualquier suplemento.",
    benefits: ["60 cápsulas", "Formato práctico"],
    specs: [{ label: "Contenido", value: "60 cápsulas" }],
    image: creatine,
    tags: ["PROMO"],
  },
  {
    ...base,
    slug: "hand-grip-ajustable",
    name: "Hand Grip Ajustable",
    category: "hand-grip",
    price: 39.9,
    rating: 4.6,
    reviews: 92,
    short: "Fortalece el agarre y el antebrazo.",
    description:
      "Hand grip con resistencia regulable y mango ergonómico antideslizante. Ideal para mejorar el agarre en tirones y dominadas.",
    benefits: ["Resistencia regulable", "Mango ergonómico", "Portátil"],
    specs: [
      { label: "Resistencia", value: "10 – 60 kg" },
      { label: "Contenido", value: "Unidad" },
    ],
    image: grip,
    tags: ["MÁS VENDIDO"],
    bestSeller: true,
  },
  {
    ...base,
    slug: "finger-trainer",
    name: "Finger Trainer",
    category: "hand-grip",
    price: 29.9,
    rating: 4.4,
    reviews: 26,
    short: "Entrenamiento independiente de dedos.",
    description: "Entrenador de dedos con resistencia por muelle para trabajo específico de mano.",
    benefits: ["Resistencia por dedo", "Compacto"],
    specs: [{ label: "Contenido", value: "Unidad" }],
    image: grip,
    tags: [],
  },
  {
    ...base,
    slug: "soga-speed-pro",
    name: "Soga Speed Pro",
    category: "sogas",
    price: 44.9,
    rating: 4.7,
    reviews: 118,
    short: "Rodamientos rápidos para doble salto.",
    description:
      "Soga de velocidad con cable de acero recubierto, rodamientos internos y mangos de aluminio. Longitud ajustable.",
    benefits: ["Rodamientos internos", "Cable de acero", "Longitud ajustable"],
    specs: [
      { label: "Cable", value: "Acero recubierto" },
      { label: "Largo", value: "3 m ajustable" },
    ],
    image: rope,
    tags: ["MÁS VENDIDO"],
    bestSeller: true,
  },
  {
    ...base,
    slug: "mat-pro-10mm",
    name: "Mat Pro 10 mm",
    category: "mat",
    price: 79.9,
    rating: 4.8,
    reviews: 88,
    short: "Amortiguación alta para suelo y core.",
    description:
      "Colchoneta de 10 mm con superficie antideslizante y correa de transporte incluida.",
    benefits: ["10 mm de grosor", "Antideslizante", "Correa incluida"],
    specs: [
      { label: "Medidas", value: "180 × 60 cm" },
      { label: "Grosor", value: "10 mm" },
    ],
    image: mat,
    tags: ["TOP"],
  },
  {
    ...base,
    slug: "balanza-corporal-smart",
    name: "Balanza Corporal Smart",
    category: "balanzas",
    price: 109.9,
    oldPrice: 139.9,
    rating: 4.6,
    reviews: 73,
    short: "Vidrio templado y pantalla LED de alta lectura.",
    description:
      "Balanza corporal digital con sensores de precisión, superficie de vidrio templado y encendido automático.",
    benefits: ["Vidrio templado", "Pantalla LED", "Encendido automático"],
    specs: [
      { label: "Capacidad", value: "180 kg" },
      { label: "Precisión", value: "100 g" },
    ],
    image: scale,
    tags: ["OFERTA"],
  },
  {
    ...base,
    slug: "balanza-alimentos",
    name: "Balanza para Alimentos",
    category: "balanzas",
    price: 69.9,
    rating: 4.5,
    reviews: 41,
    short: "Control preciso de porciones.",
    description: "Balanza digital de cocina con función tara y lectura al gramo.",
    benefits: ["Función tara", "Lectura al gramo", "Compacta"],
    specs: [
      { label: "Capacidad", value: "5 kg" },
      { label: "Precisión", value: "1 g" },
    ],
    image: scale,
    tags: [],
  },
  {
    ...base,
    slug: "rodilleras-compresion",
    name: "Rodilleras de Compresión",
    category: "proteccion",
    price: 79.9,
    rating: 4.7,
    reviews: 57,
    short: "Compresión firme para sentadillas.",
    description:
      "Par de rodilleras de compresión con tejido elástico de alta densidad y bandas antideslizantes.",
    benefits: ["Compresión firme", "Antideslizante", "Par incluido"],
    specs: [
      { label: "Tallas", value: "M / L / XL" },
      { label: "Contenido", value: "Par" },
    ],
    variants: { label: "Talla", options: ["M", "L", "XL"] },
    image: knee,
    tags: ["TOP"],
  },
  {
    ...base,
    slug: "protector-espalda-barra",
    name: "Protector de Espalda para Barra",
    category: "proteccion",
    price: 34.9,
    rating: 4.5,
    reviews: 22,
    short: "Acolchado para sentadillas y hip thrust.",
    description: "Almohadilla de espuma de alta densidad que reduce la presión de la barra.",
    benefits: ["Espuma densa", "Velcro de sujeción", "Universal"],
    specs: [{ label: "Compatibilidad", value: "Barra olímpica" }],
    image: mat,
    tags: [],
  },
  {
    ...base,
    slug: "bicicleta-estatica-core",
    name: "Bicicleta Estática Core",
    category: "cardio",
    price: 1299.9,
    oldPrice: 1499.9,
    rating: 4.9,
    reviews: 35,
    short: "Volante de inercia silencioso y monitor digital.",
    description:
      "Bicicleta estática con volante de inercia, resistencia regulable, monitor digital y estructura reforzada para uso diario.",
    benefits: ["Silenciosa", "Resistencia regulable", "Monitor digital", "Estructura reforzada"],
    specs: [
      { label: "Resistencia", value: "Magnética regulable" },
      { label: "Peso máximo", value: "120 kg" },
      { label: "Monitor", value: "Tiempo, distancia, calorías" },
    ],
    image: bike,
    tags: ["OFERTA", "TOP"],
    featured: true,
  },
  {
    ...base,
    slug: "push-up-stand",
    name: "Push Up Stand",
    category: "accesorios",
    price: 39.9,
    rating: 4.6,
    reviews: 66,
    short: "Mayor rango de movimiento en flexiones.",
    description: "Par de soportes antideslizantes para flexiones, con mango ergonómico.",
    benefits: ["Mayor rango", "Antideslizante", "Par incluido"],
    specs: [{ label: "Contenido", value: "Par" }],
    image: grip,
    tags: ["NUEVO"],
  },
  {
    ...base,
    slug: "suction-sit-up",
    name: "Suction Sit Up",
    category: "accesorios",
    price: 49.9,
    rating: 4.4,
    reviews: 31,
    short: "Fijación por succión para abdominales en casa.",
    description: "Soporte de abdominales con ventosa de fijación y acolchado para tobillos.",
    benefits: ["Fijación por succión", "Portátil", "Acolchado"],
    specs: [{ label: "Uso", value: "Superficies lisas" }],
    image: mat,
    tags: [],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

export const PACKS = [
  {
    slug: "pack-home-gym",
    name: "Pack Home Gym",
    claim: "Todo lo que necesitas para empezar.",
    includes: ["Bandas elásticas", "Hand grip", "Mat Pro 10 mm", "Soga Speed Pro"],
    price: 199.9,
    oldPrice: 264.6,
    image: mat,
  },
  {
    slug: "pack-fuerza",
    name: "Pack Fuerza",
    claim: "Levanta más, con más seguridad.",
    includes: ["Guantes Pro Training", "Cinturón Lumbar Power", "Rodilleras de compresión"],
    price: 239.9,
    oldPrice: 269.7,
    image: belt,
  },
  {
    slug: "pack-nutricion",
    name: "Pack Nutrición",
    claim: "Recupera y rinde cada semana.",
    includes: ["Proteína Performance", "Creatina Monohidratada"],
    price: 299.9,
    oldPrice: 339.8,
    image: protein,
  },
];
