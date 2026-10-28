import { Link } from "@tanstack/react-router";
import { formatPrice, productImage, type Product } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link to="/product/$slug" params={{ slug: p.slug }} className="group block">
      <div className="bg-card overflow-hidden aspect-square">
        <img src={productImage(p)} alt={p.name} loading="lazy" width={1024} height={1024}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="pt-5 text-center">
        <p className="eyebrow text-muted-foreground">{p.collection}</p>
        <h3 className="mt-2 text-xl">{p.name}</h3>
        <p className="mt-1 text-sm">{formatPrice(p.price)}</p>
      </div>
    </Link>
  );
}

export function ProductGridSkeleton({ n = 3 }: { n?: number }) {
  return (
    <>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i}><div className="bg-card aspect-square animate-pulse" /><div className="mt-5 h-4 bg-card mx-auto w-1/2" /></div>
      ))}
    </>
  );
}
