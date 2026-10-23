import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, products, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): { category?: Category } => {
    const c = s.category as string | undefined;
    return categories.some((x) => x.id === c) ? { category: c as Category } : {};
  },
  head: () => ({
    meta: [
      { title: "Jewelry Collection — ALNORA" },
      { name: "description", content: "Browse ALNORA rings, bracelets and necklaces in 18K gold, diamonds and emeralds." },
      { property: "og:title", content: "Jewelry Collection — ALNORA" },
      { property: "og:description", content: "Browse ALNORA rings, bracelets and necklaces in 18K gold, diamonds and emeralds." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { category } = Route.useSearch();
  const list = category ? products.filter((p) => p.category === category) : products;
  const tab = (active: boolean) => `eyebrow pb-1 ${active ? "link-underline text-foreground" : "text-muted-foreground hover:text-foreground"}`;
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <h1 className="text-center text-5xl">{category ? categories.find((c) => c.id === category)?.label : "All Jewelry"}</h1>
      <div className="mt-10 flex justify-center gap-8">
        <Link to="/shop" className={tab(!category)}>All</Link>
        {categories.map((c) => (
          <Link key={c.id} to="/shop" search={{ category: c.id }} className={tab(category === c.id)}>{c.label}</Link>
        ))}
      </div>
      <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>
    </div>
  );
}
