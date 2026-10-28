import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { useQuery } from "@tanstack/react-query";
import { categories, productsQuery } from "@/lib/products";
import { ProductCard, ProductGridSkeleton } from "@/components/ProductCard";

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
  const { data: products } = useQuery(productsQuery);
  return (
    <>
      <section className="relative h-[80vh] sm:h-[85vh] min-h-[480px] sm:min-h-[560px] overflow-hidden">
        <img
          src={hero}
          alt="Woman wearing ALNORA diamond jewelry"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 flex items-end pb-8 sm:pb-20">
          <div className="w-full sm:max-w-md bg-background/90 backdrop-blur-sm p-6 sm:p-10 shadow-sm border border-border/40">
            <p className="eyebrow text-primary">New High Jewelry</p>
            <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl leading-tight">The Art of Light</h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Pieces shaped by hand, made to illuminate every moment.
            </p>
            <Link to="/shop" className="btn-luxe mt-6 sm:mt-8 w-full sm:w-auto">
              Discover
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-24">
        <div className="text-center mb-10 sm:mb-14">
          <p className="eyebrow text-muted-foreground">Explore</p>
          <h2 className="mt-2 sm:mt-3 text-3xl sm:text-4xl">Shop by Category</h2>
        </div>
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.id} to="/shop" search={{ category: c.id }} className="group block text-center">
              <div className="aspect-[4/5] overflow-hidden bg-card">
                <img
                  src={c.image}
                  alt={c.label}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 sm:mt-5 eyebrow link-underline inline-block">{c.label}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-card py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <p className="eyebrow text-muted-foreground">Iconic creations</p>
            <h2 className="mt-2 sm:mt-3 text-3xl sm:text-4xl">The Signatures</h2>
          </div>
          <div className="grid gap-6 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products ? (
              products
                .filter((p) => p.is_active)
                .slice(0, 3)
                .map((p) => <ProductCard key={p.id} p={p} />)
            ) : (
              <ProductGridSkeleton />
            )}
          </div>
          <div className="text-center mt-10 sm:mt-14">
            <Link to="/shop" className="btn-outline-luxe w-full sm:w-auto">
              View all
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-28 text-center">
        <p className="eyebrow text-primary">The Maison</p>
        <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl leading-snug">
          "Every jewel holds a story — ours begins with yours."
        </h2>
        <Link to="/maison" className="mt-6 sm:mt-8 inline-block eyebrow link-underline">
          Our story
        </Link>
      </section>
    </>
  );
}
