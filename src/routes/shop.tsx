import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { categories, productsQuery, type Category } from "@/lib/products";
import { ProductCard, ProductGridSkeleton } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): { category?: Category } => {
    const c = s["category"] as string | undefined;
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
  const { data } = useQuery(productsQuery);
  const active = data?.filter((p) => p.is_active);
  const list = active && category ? active.filter((p) => p.category === category) : active;
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
        {list ? list.map((p) => <ProductCard key={p.id} p={p} />) : <ProductGridSkeleton n={6} />}
        {list && !list.length && <p className="col-span-full text-center text-muted-foreground">No pieces here yet.</p>}
      </div>
    </div>
  );
}
