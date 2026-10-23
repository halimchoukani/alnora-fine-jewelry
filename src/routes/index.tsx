import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ALNORA — Fine Jewelry & Accessories" },
      { name: "description", content: "Discover ALNORA's fine jewelry: diamond rings, gold bracelets and emerald necklaces." },
      { property: "og:title", content: "ALNORA — Fine Jewelry & Accessories" },
      { property: "og:description", content: "Discover ALNORA's fine jewelry: diamond rings, gold bracelets and emerald necklaces." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative h-[85vh] min-h-[560px] overflow-hidden">
        <img src={hero} alt="Woman wearing ALNORA diamond jewelry" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative h-full mx-auto max-w-7xl px-6 flex items-end pb-20">
          <div className="max-w-md bg-background/85 backdrop-blur-sm p-10">
            <p className="eyebrow text-primary">New High Jewelry</p>
            <h1 className="mt-4 text-5xl leading-tight">The Art of Light</h1>
            <p className="mt-4 text-muted-foreground">Pieces shaped by hand, made to illuminate every moment.</p>
            <Link to="/shop" className="btn-luxe mt-8">Discover</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-14">
          <p className="eyebrow text-muted-foreground">Explore</p>
          <h2 className="mt-3 text-4xl">Shop by Category</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.id} to="/shop" search={{ category: c.id }} className="group block text-center">
              <div className="aspect-[4/5] overflow-hidden bg-card">
                <img src={c.image} alt={c.label} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-5 eyebrow link-underline inline-block">{c.label}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-card py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <p className="eyebrow text-muted-foreground">Iconic creations</p>
            <h2 className="mt-3 text-4xl">The Signatures</h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
          <div className="text-center mt-14"><Link to="/shop" className="btn-outline-luxe">View all</Link></div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-28 text-center">
        <p className="eyebrow text-primary">The Maison</p>
        <h2 className="mt-4 text-4xl leading-snug">"Every jewel holds a story — ours begins with yours."</h2>
        <Link to="/maison" className="mt-8 inline-block eyebrow link-underline">Our story</Link>
      </section>
    </>
  );
}
