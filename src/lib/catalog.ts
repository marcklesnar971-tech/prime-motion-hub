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
import imgBancaAbdominalLigas from "@/assets/cat/banca-abdominal-ligas.jpg.asset.json";
import imgBancaAbdominalPlegable from "@/assets/cat/banca-abdominal-plegable.jpg.asset.json";
import imgBancaDdsAmarilla from "@/assets/cat/banca-dds-amarilla.jpg.asset.json";
import imgBancaDdsRoja from "@/assets/cat/banca-dds-roja.jpg.asset.json";
import imgBancaDobleRack from "@/assets/cat/banca-doble-rack.jpg.asset.json";
import imgBancaLibrePecho from "@/assets/cat/banca-libre-pecho.jpg.asset.json";
import imgBancaRomana from "@/assets/cat/banca-romana.jpg.asset.json";
import imgCoderasNeopreno from "@/assets/cat/coderas-neopreno.jpg.asset.json";
import imgGuantesCuero from "@/assets/cat/guantes-cuero.jpg.asset.json";
import imgGuantesGym from "@/assets/cat/guantes-gym.jpg.asset.json";
import imgGuantesNikeImportado from "@/assets/cat/guantes-nike-importado.jpg.asset.json";
import imgGuantesNikeNacional from "@/assets/cat/guantes-nike-nacional.jpg.asset.json";
import imgHandGripContador from "@/assets/cat/hand-grip-contador.jpg.asset.json";
import imgHandGripRegulador from "@/assets/cat/hand-grip-regulador.jpg.asset.json";
import imgLigas11Piezas from "@/assets/cat/ligas-11-piezas.jpg.asset.json";
import imgMancuernas20kg from "@/assets/cat/mancuernas-20kg.jpg.asset.json";
import imgMat10mm from "@/assets/cat/mat-10mm.jpg.asset.json";
import imgMat6mm from "@/assets/cat/mat-6mm.jpg.asset.json";
import imgMat8mm from "@/assets/cat/mat-8mm.jpg.asset.json";
import imgPushUpCromado from "@/assets/cat/push-up-cromado.jpg.asset.json";
import imgPushUpPvc from "@/assets/cat/push-up-pvc.jpg.asset.json";
import imgRodilleraCobre from "@/assets/cat/rodillera-cobre.jpg.asset.json";
import imgRodilleraGel from "@/assets/cat/rodillera-gel.jpg.asset.json";
import imgRodillerasPotencia from "@/assets/cat/rodilleras-potencia.jpg.asset.json";
import imgRodillerasSinSujetador from "@/assets/cat/rodilleras-sin-sujetador.jpg.asset.json";
import imgRodillerasSujetador from "@/assets/cat/rodilleras-sujetador.jpg.asset.json";
import imgRuedaCajaRoja from "@/assets/cat/rueda-caja-roja.jpg.asset.json";
import imgRuedaDoble from "@/assets/cat/rueda-doble.jpg.asset.json";
import imgRuedaPequena from "@/assets/cat/rueda-pequena.jpg.asset.json";
import imgRuedaTorito from "@/assets/cat/rueda-torito.jpg.asset.json";
import imgSetHandGrip from "@/assets/cat/set-hand-grip.jpg.asset.json";
import imgSogaAluminio from "@/assets/cat/soga-aluminio.jpg.asset.json";
import imgSogaPesoContador from "@/assets/cat/soga-peso-contador.jpg.asset.json";
import imgTotalCrunch from "@/assets/cat/total-crunch.jpg.asset.json";

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
  /** Unidades disponibles (editable desde el panel). */
  stockQty?: number | undefined;
  colors?: string[] | undefined;
  sizes?: string[] | undefined;
  /** Fotos adicionales para la galería del producto. */
  gallery?: string[] | undefined;
  /** Nombre de la promoción activa aplicada al precio. */
  promoLabel?: string | undefined;
};


export type Category = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  { slug: "maquinas", name: "Máquinas y bancas", blurb: "Equipamiento pesado", image: imgBancaDobleRack.url },
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
  {
    ...base,
    slug: "banca-doble-rack",
    name: "Banca Doble Rack",
    category: "maquinas",
    price: 600,
    rating: 4.9,
    reviews: 24,
    short: "Estación de press con doble rack y soporte para barra.",
    description:
      "Banca de entrenamiento con doble rack ajustable, respaldo regulable y extensión de piernas. Ideal para press de pecho, sentadillas y trabajo de piernas en casa.",
    benefits: ["Doble rack ajustable", "Respaldo regulable", "Extensión de piernas", "Estructura reforzada"],
    specs: [
      { label: "Tipo", value: "Banca con rack" },
      { label: "Uso", value: "Pecho, piernas, hombro" },
    ],
    image: imgBancaDobleRack.url,
    tags: ["TOP"],
  },
  {
    ...base,
    slug: "banca-libre-pecho-predicador-ligas",
    name: "Banca Libre de Pecho + Predicador + Ligas",
    category: "maquinas",
    price: 350,
    rating: 4.8,
    reviews: 19,
    short: "Banca multiposición con predicador y ligas incluidas.",
    description:
      "Banca libre de pecho con respaldo multiposición, brazo predicador para bíceps y ligas de resistencia incluidas. Compacta y plegable.",
    benefits: ["Multiposición", "Predicador incluido", "Ligas incluidas", "Plegable"],
    specs: [
      { label: "Incluye", value: "Predicador + ligas" },
      { label: "Uso", value: "Pecho, bíceps, abdomen" },
    ],
    image: imgBancaLibrePecho.url,
    tags: ["MÁS VENDIDO"],
  },
  {
    ...base,
    slug: "banca-dds-predicador-rojo",
    name: "Banca DDS con Predicador Rojo",
    category: "maquinas",
    price: 600,
    rating: 4.8,
    reviews: 14,
    short: "Banca DDS ajustable con predicador y agarre.",
    description:
      "Banca DDS de estructura reforzada con respaldo ajustable en varios ángulos y predicador para trabajo aislado de bíceps.",
    benefits: ["Ángulos ajustables", "Predicador integrado", "Acolchado firme"],
    specs: [
      { label: "Color", value: "Negro / rojo" },
      { label: "Uso", value: "Fuerza general" },
    ],
    image: imgBancaDdsRoja.url,
    tags: ["TOP"],
  },
  {
    ...base,
    slug: "banca-dds-amarilla-biceps",
    name: "Banca DDS Amarilla con Agarre Bíceps",
    category: "maquinas",
    price: 630,
    rating: 4.8,
    reviews: 11,
    short: "Banca DDS con agarre de bíceps y respaldo regulable.",
    description:
      "Banca DDS con acabado amarillo, agarre para bíceps y respaldo regulable. Pensada para rutinas completas de fuerza en casa.",
    benefits: ["Agarre para bíceps", "Respaldo regulable", "Estructura estable"],
    specs: [
      { label: "Color", value: "Negro / amarillo" },
      { label: "Uso", value: "Fuerza general" },
    ],
    image: imgBancaDdsAmarilla.url,
    tags: ["NUEVO"],
  },
  {
    ...base,
    slug: "banca-abdominal-ligas",
    name: "Banca Abdominal + Ligas",
    category: "maquinas",
    price: 230,
    rating: 4.7,
    reviews: 32,
    short: "Banca inclinada para abdomen con ligas incluidas.",
    description:
      "Banca abdominal con inclinación regulable, sujeción de pies acolchada y ligas de resistencia para sumar trabajo de brazos.",
    benefits: ["Inclinación regulable", "Ligas incluidas", "Sujeción acolchada"],
    specs: [
      { label: "Incluye", value: "Ligas de resistencia" },
      { label: "Uso", value: "Core y brazos" },
    ],
    image: imgBancaAbdominalLigas.url,
    tags: ["OFERTA"],
  },
  {
    ...base,
    slug: "banca-abdominal-plegable",
    name: "Banca Abdominal Plegable Negra",
    category: "maquinas",
    price: 320,
    rating: 4.7,
    reviews: 18,
    short: "Se pliega y guarda en cualquier espacio.",
    description:
      "Banca abdominal plegable con múltiples posiciones de inclinación y estructura de acero. Perfecta para departamentos.",
    benefits: ["Plegable", "Acero reforzado", "Varias inclinaciones"],
    specs: [
      { label: "Color", value: "Negro" },
      { label: "Uso", value: "Core" },
    ],
    image: imgBancaAbdominalPlegable.url,
    tags: [],
  },
  {
    ...base,
    slug: "banca-romana-abdominal",
    name: "Banca Romana Abdominal",
    category: "maquinas",
    price: 350,
    rating: 4.8,
    reviews: 16,
    short: "Silla romana para core, lumbares y dips.",
    description:
      "Banca romana ajustable para hiperextensiones, trabajo lumbar y abdominales. Almohadillas de alta densidad.",
    benefits: ["Hiperextensiones", "Trabajo lumbar", "Altura ajustable"],
    specs: [
      { label: "Tipo", value: "Silla romana" },
      { label: "Uso", value: "Core y lumbar" },
    ],
    image: imgBancaRomana.url,
    tags: ["TOP"],
  },
  {
    ...base,
    slug: "total-crunch-naranja",
    name: "Total Crunch Naranja",
    category: "maquinas",
    price: 350,
    rating: 4.6,
    reviews: 22,
    short: "Entrenamiento full body de bajo impacto.",
    description:
      "Máquina Total Crunch para trabajo simultáneo de piernas, core y brazos con resistencia regulable y bajo impacto articular.",
    benefits: ["Full body", "Bajo impacto", "Resistencia regulable"],
    specs: [
      { label: "Color", value: "Naranja" },
      { label: "Uso", value: "Cardio y tonificación" },
    ],
    image: imgTotalCrunch.url,
    tags: ["MÁS VENDIDO"],
  },
  {
    ...base,
    slug: "mancuernas-20kg-maletin",
    name: "Mancuernas 20 kg en Maletín",
    category: "pesas",
    price: 215,
    rating: 4.8,
    reviews: 45,
    short: "Set de mancuernas desmontables con discos y maletín.",
    description:
      "Set de mancuernas ajustables de 20 kg con discos intercambiables, barras roscadas y maletín de transporte.",
    benefits: ["Discos intercambiables", "Maletín incluido", "20 kg totales"],
    specs: [
      { label: "Peso total", value: "20 kg" },
      { label: "Incluye", value: "Maletín" },
    ],
    image: imgMancuernas20kg.url,
    tags: ["MÁS VENDIDO"],
  },
  {
    ...base,
    slug: "mat-10mm",
    name: "Mat de 10 mm",
    category: "mat",
    price: 45,
    rating: 4.8,
    reviews: 60,
    short: "Colchoneta gruesa con máxima amortiguación.",
    description:
      "Mat de 10 mm de espesor, superficie antideslizante y alta amortiguación para suelo, core y yoga.",
    benefits: ["10 mm", "Antideslizante", "Fácil de enrollar"],
    specs: [
      { label: "Grosor", value: "10 mm" },
      { label: "Uso", value: "Yoga, core" },
    ],
    image: imgMat10mm.url,
    tags: ["TOP"],
  },
  {
    ...base,
    slug: "mat-8mm",
    name: "Mat de 8 mm",
    category: "mat",
    price: 40,
    rating: 4.7,
    reviews: 44,
    short: "Equilibrio entre confort y estabilidad.",
    description:
      "Mat de 8 mm con estuche de transporte, ideal para rutinas de suelo, planchas y estiramientos.",
    benefits: ["8 mm", "Incluye estuche", "Ligero"],
    specs: [
      { label: "Grosor", value: "8 mm" },
      { label: "Uso", value: "Suelo y estiramientos" },
    ],
    image: imgMat8mm.url,
    tags: [],
  },
  {
    ...base,
    slug: "mat-6mm",
    name: "Mat de 6 mm",
    category: "mat",
    price: 35,
    rating: 4.6,
    reviews: 38,
    short: "Ligero y fácil de transportar.",
    description:
      "Mat de 6 mm compacto, con superficie texturizada antideslizante y bolso de transporte.",
    benefits: ["6 mm", "Compacto", "Antideslizante"],
    specs: [
      { label: "Grosor", value: "6 mm" },
      { label: "Uso", value: "Yoga y pilates" },
    ],
    image: imgMat6mm.url,
    tags: [],
  },
  {
    ...base,
    slug: "rueda-abdominal-caja-roja",
    name: "Rueda Abdominal Caja Roja",
    category: "accesorios",
    price: 40,
    rating: 4.6,
    reviews: 29,
    short: "Rueda de doble llanta para core estable.",
    description:
      "Rueda abdominal con doble llanta ancha y mangos antideslizantes. Trabajo intenso de core con buena estabilidad.",
    benefits: ["Doble llanta", "Mangos antideslizantes", "Rodamiento suave"],
    specs: [
      { label: "Contenido", value: "Unidad" },
      { label: "Uso", value: "Core" },
    ],
    image: imgRuedaCajaRoja.url,
    tags: ["MÁS VENDIDO"],
  },
  {
    ...base,
    slug: "rueda-abdominal-torito",
    name: "Rueda Abdominal Torito",
    category: "accesorios",
    price: 45,
    rating: 4.6,
    reviews: 21,
    short: "Llantas anchas tipo todoterreno.",
    description:
      "Rueda abdominal con llantas anchas para mayor tracción y estabilidad en cualquier superficie.",
    benefits: ["Llantas anchas", "Alta tracción", "Eje reforzado"],
    specs: [
      { label: "Contenido", value: "Unidad" },
      { label: "Uso", value: "Core" },
    ],
    image: imgRuedaTorito.url,
    tags: [],
  },
  {
    ...base,
    slug: "rueda-abdominal-pequena",
    name: "Rueda Abdominal Pequeña",
    category: "accesorios",
    price: 35,
    rating: 4.5,
    reviews: 17,
    short: "Compacta y práctica para empezar.",
    description:
      "Rueda abdominal compacta ideal para iniciar el trabajo de core en casa.",
    benefits: ["Compacta", "Ligera", "Fácil de guardar"],
    specs: [
      { label: "Contenido", value: "Unidad" },
      { label: "Uso", value: "Core" },
    ],
    image: imgRuedaPequena.url,
    tags: [],
  },
  {
    ...base,
    slug: "rueda-abdominal-doble",
    name: "Rueda Abdominal Doble",
    category: "accesorios",
    price: 55,
    rating: 4.7,
    reviews: 25,
    short: "Incluye mini mat para rodillas.",
    description:
      "Rueda abdominal doble con retorno asistido y mini mat de apoyo para rodillas.",
    benefits: ["Rueda doble", "Mini mat incluido", "Retorno asistido"],
    specs: [
      { label: "Incluye", value: "Mini mat" },
      { label: "Uso", value: "Core" },
    ],
    image: imgRuedaDoble.url,
    tags: ["NUEVO"],
  },
  {
    ...base,
    slug: "push-up-pvc",
    name: "Push Up PVC",
    category: "accesorios",
    price: 30,
    rating: 4.5,
    reviews: 34,
    short: "Soportes de flexiones ligeros y estables.",
    description:
      "Par de soportes para flexiones en PVC resistente con base antideslizante y mango ergonómico.",
    benefits: ["Par incluido", "Base antideslizante", "Ligeros"],
    specs: [
      { label: "Contenido", value: "Par" },
      { label: "Material", value: "PVC" },
    ],
    image: imgPushUpPvc.url,
    tags: [],
  },
  {
    ...base,
    slug: "push-up-cromado",
    name: "Push Up Cromado",
    category: "accesorios",
    price: 35,
    rating: 4.6,
    reviews: 28,
    short: "Acabado cromado y mayor resistencia.",
    description:
      "Par de soportes para flexiones con estructura metálica cromada y mangos acolchados.",
    benefits: ["Estructura metálica", "Mangos acolchados", "Par incluido"],
    specs: [
      { label: "Contenido", value: "Par" },
      { label: "Material", value: "Acero cromado" },
    ],
    image: imgPushUpCromado.url,
    tags: ["TOP"],
  },
  {
    ...base,
    slug: "salta-soga-peso-contador",
    name: "Salta Soga con Peso y Contador",
    category: "sogas",
    price: 30,
    rating: 4.6,
    reviews: 41,
    short: "Contador digital y mangos con peso.",
    description:
      "Soga de saltar con contador de saltos, mangos lastrados y cable ajustable.",
    benefits: ["Contador digital", "Mangos con peso", "Cable ajustable"],
    specs: [
      { label: "Largo", value: "3 m ajustable" },
      { label: "Extra", value: "Contador" },
    ],
    image: imgSogaPesoContador.url,
    tags: ["MÁS VENDIDO"],
  },
  {
    ...base,
    slug: "salta-soga-aluminio",
    name: "Salta Soga de Aluminio",
    category: "sogas",
    price: 45,
    rating: 4.7,
    reviews: 36,
    short: "Mangos de aluminio y giro veloz.",
    description:
      "Soga de velocidad con mangos de aluminio, rodamientos internos y cable de acero recubierto.",
    benefits: ["Mangos de aluminio", "Rodamientos internos", "Cable de acero"],
    specs: [
      { label: "Largo", value: "3 m ajustable" },
      { label: "Material", value: "Aluminio" },
    ],
    image: imgSogaAluminio.url,
    tags: ["TOP"],
  },
  {
    ...base,
    slug: "ligas-resistencia-11-piezas",
    name: "Ligas de Resistencia de 11 Piezas",
    category: "bandas",
    price: 50,
    rating: 4.8,
    reviews: 72,
    short: "Kit completo para entrenar en casa.",
    description:
      "Set de 11 piezas con tubos de resistencia, anclaje de puerta, tobilleras, mangos y bolso de transporte.",
    benefits: ["11 piezas", "Anclaje de puerta", "Bolso incluido", "Full body"],
    specs: [
      { label: "Incluye", value: "11 piezas" },
      { label: "Uso", value: "Full body" },
    ],
    image: imgLigas11Piezas.url,
    tags: ["OFERTA", "MÁS VENDIDO"],
  },
  {
    ...base,
    slug: "set-hand-grip",
    name: "Set de Hand Grip",
    category: "hand-grip",
    price: 45,
    rating: 4.7,
    reviews: 33,
    short: "Kit completo para fuerza de agarre.",
    description:
      "Set de entrenamiento de agarre con hand grip regulable, pelota, anillo y ejercitador de dedos.",
    benefits: ["Kit completo", "Resistencia variable", "Portátil"],
    specs: [
      { label: "Incluye", value: "Set de piezas" },
      { label: "Uso", value: "Agarre y antebrazo" },
    ],
    image: imgSetHandGrip.url,
    tags: ["NUEVO"],
  },
  {
    ...base,
    slug: "hand-grip-contador",
    name: "Hand Grip con Regulador y Contador 5 – 60 kg",
    category: "hand-grip",
    price: 30,
    rating: 4.7,
    reviews: 47,
    short: "Cuenta repeticiones mientras entrenas.",
    description:
      "Hand grip con resistencia regulable de 5 a 60 kg y contador digital de repeticiones.",
    benefits: ["Contador digital", "5 – 60 kg", "Mango ergonómico"],
    specs: [
      { label: "Resistencia", value: "5 – 60 kg" },
      { label: "Extra", value: "Contador" },
    ],
    image: imgHandGripContador.url,
    tags: ["MÁS VENDIDO"],
  },
  {
    ...base,
    slug: "hand-grip-con-regulador",
    name: "Hand Grip con Regulador",
    category: "hand-grip",
    price: 25,
    rating: 4.6,
    reviews: 39,
    short: "Resistencia ajustable, formato compacto.",
    description:
      "Hand grip con muelle regulable y mangos antideslizantes para fortalecer mano y antebrazo.",
    benefits: ["Resistencia regulable", "Antideslizante", "Compacto"],
    specs: [
      { label: "Resistencia", value: "Regulable" },
      { label: "Contenido", value: "Unidad" },
    ],
    image: imgHandGripRegulador.url,
    tags: [],
  },
  {
    ...base,
    slug: "rodilleras-potencia",
    name: "Rodilleras de Potencia para Levantamiento",
    category: "proteccion",
    price: 50,
    rating: 4.8,
    reviews: 26,
    short: "Vendas de compresión para sentadilla pesada.",
    description:
      "Par de rodilleras de potencia tipo venda, con alta compresión y cierre de velcro para levantamientos pesados.",
    benefits: ["Alta compresión", "Cierre de velcro", "Par incluido"],
    specs: [
      { label: "Contenido", value: "Par" },
      { label: "Uso", value: "Powerlifting" },
    ],
    image: imgRodillerasPotencia.url,
    tags: ["TOP"],
  },
  {
    ...base,
    slug: "rodillera-articulada-gel",
    name: "Rodillera Articulada Ortopédica con Gel",
    category: "proteccion",
    price: 27,
    rating: 4.6,
    reviews: 23,
    short: "Soporte articulado con almohadilla de gel.",
    description:
      "Rodillera ortopédica con soporte lateral articulado y almohadilla de gel rotuliana. Tallas S, M y L.",
    benefits: ["Soporte articulado", "Almohadilla de gel", "Tejido transpirable"],
    specs: [
      { label: "Tallas", value: "S / M / L" },
      { label: "Contenido", value: "Unidad" },
    ],
    image: imgRodilleraGel.url,
    tags: [],
  },
  {
    ...base,
    slug: "rodillera-fibra-cobre",
    name: "Rodillera de Fibra de Cobre",
    category: "proteccion",
    price: 30,
    rating: 4.6,
    reviews: 20,
    short: "Tejido de cobre, ajuste cómodo y transpirable.",
    description:
      "Rodillera de compresión en fibra de cobre, ligera y transpirable para uso prolongado.",
    benefits: ["Fibra de cobre", "Transpirable", "Compresión media"],
    specs: [
      { label: "Tallas", value: "M / L / XL" },
      { label: "Contenido", value: "Unidad" },
    ],
    image: imgRodilleraCobre.url,
    tags: ["NUEVO"],
  },
  {
    ...base,
    slug: "rodilleras-compresion-sujetador",
    name: "Rodilleras de Compresión con Sujetador",
    category: "proteccion",
    price: 25,
    rating: 4.6,
    reviews: 18,
    short: "Con banda de sujeción extra.",
    description:
      "Rodillera de compresión con banda de sujeción ajustable para mayor estabilidad de la rótula.",
    benefits: ["Banda de sujeción", "Compresión firme", "Antideslizante"],
    specs: [
      { label: "Tallas", value: "M / L / XL" },
      { label: "Contenido", value: "Unidad" },
    ],
    image: imgRodillerasSujetador.url,
    tags: [],
  },
  {
    ...base,
    slug: "rodilleras-compresion-sin-sujetador",
    name: "Rodilleras de Compresión sin Sujetador",
    category: "proteccion",
    price: 15,
    rating: 4.5,
    reviews: 15,
    short: "Compresión ligera para el día a día.",
    description:
      "Rodillera de compresión tejida sin banda de sujeción, cómoda para entrenamientos y uso diario.",
    benefits: ["Tejido elástico", "Ligera", "Uso diario"],
    specs: [
      { label: "Tallas", value: "M / L / XL" },
      { label: "Contenido", value: "Unidad" },
    ],
    image: imgRodillerasSinSujetador.url,
    tags: ["PROMO"],
  },
  {
    ...base,
    slug: "coderas-neopreno",
    name: "Coderas Deportivas de Neopreno",
    category: "proteccion",
    price: 15,
    rating: 4.5,
    reviews: 14,
    short: "Soporte y calor para el codo.",
    description:
      "Codera deportiva de neopreno con ajuste de velcro, brinda soporte y retención de calor.",
    benefits: ["Neopreno", "Ajuste de velcro", "Soporte firme"],
    specs: [
      { label: "Talla", value: "Única ajustable" },
      { label: "Contenido", value: "Unidad" },
    ],
    image: imgCoderasNeopreno.url,
    tags: [],
  },
  {
    ...base,
    slug: "guantes-cuero-nacional",
    name: "Guantes de Cuero Nacional",
    category: "guantes",
    price: 50,
    rating: 4.7,
    reviews: 31,
    short: "Cuero nacional con muñequera larga.",
    description:
      "Guantes de entrenamiento en cuero nacional con muñequera larga envolvente y palma reforzada.",
    benefits: ["Cuero nacional", "Muñequera larga", "Palma reforzada"],
    specs: [
      { label: "Material", value: "Cuero" },
      { label: "Tallas", value: "S / M / L / XL" },
    ],
    image: imgGuantesCuero.url,
    tags: ["TOP"],
  },
  {
    ...base,
    slug: "guantes-gym-deportivos",
    name: "Guantes GYM Deportivos",
    category: "guantes",
    price: 45,
    rating: 4.7,
    reviews: 37,
    short: "Palma acolchada y muñequera ajustable.",
    description:
      "Guantes de gimnasio con palma acolchada antideslizante y muñequera ajustable de sujeción firme.",
    benefits: ["Palma acolchada", "Antideslizantes", "Muñequera ajustable"],
    specs: [
      { label: "Material", value: "Microfibra" },
      { label: "Tallas", value: "S / M / L / XL" },
    ],
    image: imgGuantesGym.url,
    tags: ["MÁS VENDIDO"],
  },
  {
    ...base,
    slug: "guantes-nike-importado",
    name: "Guantes NIKE Importado",
    category: "guantes",
    price: 45,
    rating: 4.8,
    reviews: 29,
    short: "Modelo importado, ajuste premium.",
    description:
      "Guantes de entrenamiento importados con refuerzo en palma y cierre de velcro ajustable.",
    benefits: ["Importado", "Palma reforzada", "Cierre de velcro"],
    specs: [
      { label: "Tallas", value: "S / M / L / XL" },
      { label: "Contenido", value: "Par" },
    ],
    image: imgGuantesNikeImportado.url,
    tags: ["TOP"],
  },
  {
    ...base,
    slug: "guantes-nike-nacional",
    name: "Guantes NIKE Nacional",
    category: "guantes",
    price: 38.5,
    rating: 4.6,
    reviews: 24,
    short: "Versión nacional, excelente relación precio-calidad.",
    description:
      "Guantes de entrenamiento nacionales con palma antideslizante y muñequera de sujeción.",
    benefits: ["Antideslizantes", "Muñequera de sujeción", "Ligeros"],
    specs: [
      { label: "Tallas", value: "S / M / L / XL" },
      { label: "Contenido", value: "Par" },
    ],
    image: imgGuantesNikeNacional.url,
    tags: ["OFERTA"],
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
