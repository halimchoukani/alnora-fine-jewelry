import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { formatPrice, productImage, productQuery } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$slug")({
  head: () => ({
    meta: [
      { title: "Fine Jewelry Piece — ALNORA" },
      { name: "description", content: "Discover this ALNORA creation in 18K gold and precious stones." },
      { property: "og:title", content: "Fine Jewelry Piece — ALNORA" },
      { property: "og:description", content: "Discover this ALNORA creation in 18K gold and precious stones." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { data: p, isLoading } = useQuery(productQuery(slug));
  const { add, lines } = useCart();
  const [added, setAdded] = useState(false);

  if (isLoading) return <div className="mx-auto max-w-7xl px-6 py-16"><div className="bg-card aspect-square max-w-xl animate-pulse" /></div>;
  if (!p) return <div className="py-32 text-center"><h1 className="text-4xl">Piece not found</h1><Link to="/shop" className="btn-luxe mt-8">Back to shop</Link></div>;

  const inBag = lines.find((l) => l.productId === p.id)?.qty ?? 0;
  const soldOut = p.stock <= inBag;
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 grid gap-16 md:grid-cols-2 items-center">
      <title>{`${p.name} — ALNORA`}</title>
      <div className="bg-card aspect-square overflow-hidden">
        <img src={productImage(p)} alt={p.name} width={1024} height={1024} className="h-full w-full object-cover" />
      </div>
      <div>
        <p className="eyebrow text-muted-foreground">{p.collection} collection</p>
        <h1 className="mt-4 text-5xl leading-tight">{p.name}</h1>
        <p className="mt-4 text-xl">{formatPrice(p.price)}</p>
        <p className="mt-8 text-muted-foreground leading-relaxed">{p.description}</p>
        <p className="mt-6 text-sm"><span className="eyebrow mr-3">Material</span>{p.material}</p>
        <button disabled={soldOut} className="btn-luxe mt-10 w-full disabled:opacity-50" onClick={() => { add(p.id); setAdded(true); }}>
          {p.stock === 0 ? "Sold out" : soldOut ? "All available pieces are in your bag" : added ? "Added to bag" : "Add to bag"}
        </button>
        {added && <Link to="/cart" className="mt-4 block text-center eyebrow link-underline w-fit mx-auto">View bag</Link>}
      </div>
    </div>
  );
}
