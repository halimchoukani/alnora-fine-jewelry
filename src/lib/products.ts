import ring from "@/assets/ring.jpg";
import bracelet from "@/assets/bracelet.jpg";
import necklace from "@/assets/necklace.jpg";

export type Category = "rings" | "bracelets" | "necklaces";

export interface Product {
  slug: string;
  name: string;
  collection: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  material: string;
}

export const products: Product[] = [
  { slug: "solstice-solitaire", name: "Solstice Solitaire Ring", collection: "Solstice", category: "rings", price: 4800, image: ring, material: "18K yellow gold, 1.2ct diamond", description: "A single brilliant diamond held aloft by four delicate claws — the purest expression of light." },
  { slug: "constellation-bangle", name: "Constellation Bangle", collection: "Constellation", category: "bracelets", price: 3650, image: bracelet, material: "18K yellow gold, diamonds", description: "Seven bezel-set diamonds orbit a polished gold band, inspired by the night sky." },
  { slug: "verdant-pendant", name: "Verdant Emerald Pendant", collection: "Verdant", category: "necklaces", price: 5200, image: necklace, material: "18K yellow gold, emerald, diamonds", description: "A pear-cut emerald crowned by a diamond leaf, suspended on a fine gold chain." },
  { slug: "solstice-band", name: "Solstice Eternity Band", collection: "Solstice", category: "rings", price: 2900, image: ring, material: "18K yellow gold, diamonds", description: "A refined band that catches light from every angle." },
  { slug: "constellation-cuff", name: "Constellation Cuff", collection: "Constellation", category: "bracelets", price: 4100, image: bracelet, material: "18K yellow gold", description: "A sculpted cuff with a hidden clasp and timeless silhouette." },
  { slug: "verdant-drop", name: "Verdant Drop Necklace", collection: "Verdant", category: "necklaces", price: 6800, image: necklace, material: "18K yellow gold, emerald", description: "An heirloom piece, crafted to be passed from one generation to the next." },
];

export const categories: { id: Category; label: string; image: string }[] = [
  { id: "rings", label: "Rings", image: ring },
  { id: "bracelets", label: "Bracelets", image: bracelet },
  { id: "necklaces", label: "Necklaces", image: necklace },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
