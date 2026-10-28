import { queryOptions } from "@tanstack/react-query";
import ring from "@/assets/ring.jpg";
import bracelet from "@/assets/bracelet.jpg";
import necklace from "@/assets/necklace.jpg";
import { supabase } from "@/integrations/supabase/client";

export type Category = "rings" | "bracelets" | "necklaces";

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: string;
  category: Category;
  price: number;
  image_url: string;
  description: string;
  material: string;
  stock: number;
  is_active: boolean;
}

const assets: Record<string, string> = { ring, bracelet, necklace };
const categoryAsset: Record<Category, string> = { rings: ring, bracelets: bracelet, necklaces: necklace };

export const productImage = (p: Pick<Product, "image_url" | "category">) => {
  if (p.image_url.startsWith("asset:")) return assets[p.image_url.slice(6)] ?? categoryAsset[p.category];
  return p.image_url || categoryAsset[p.category];
};

export const categories: { id: Category; label: string; image: string }[] = [
  { id: "rings", label: "Rings", image: ring },
  { id: "bracelets", label: "Bracelets", image: bracelet },
  { id: "necklaces", label: "Necklaces", image: necklace },
];

const toProduct = (r: Record<string, unknown>) => ({ ...r, price: Number(r["price"]) }) as Product;

export const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: async () => {
    const { data, error } = await supabase.from("products").select("*").order("created_at");
    if (error) throw error;
    return (data ?? []).map(toProduct);
  },
});

export const productQuery = (slug: string) =>
  queryOptions({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      return data ? toProduct(data) : null;
    },
  });

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
