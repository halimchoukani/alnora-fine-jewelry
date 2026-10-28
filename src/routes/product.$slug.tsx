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

  if (isLoading)
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-16">
        <div className="bg-card aspect-square max-w-xl mx-auto animate-pulse" />
      </div>
    );
  if (!p)
    return (
      <div className="py-24 sm:py-32 text-center px-4">
        <h1 className="text-3xl sm:text-4xl">Piece not found</h1>
        <Link to="/shop" className="btn-luxe mt-6 sm:mt-8 w-full sm:w-auto">
          Back to shop
        </Link>
      </div>
    );

  const inBag = lines.find((l) => l.productId === p.id)?.qty ?? 0;
  const soldOut = p.stock <= inBag;
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-16">
      <div className="mb-6">
        <Link to="/shop" className="eyebrow text-[10px] sm:text-xs text-muted-foreground hover:text-foreground transition-colors">
          &larr; Back to all jewelry
        </Link>
      </div>
      <div className="grid gap-8 sm:gap-12 md:gap-16 md:grid-cols-2 items-start">
        <title>{`${p.name} — ALNORA`}</title>
        <div className="bg-card aspect-square overflow-hidden max-w-xl w-full mx-auto shadow-sm">
          <img
            src={productImage(p)}
            alt={p.name}
            width={1024}
            height={1024}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="eyebrow text-muted-foreground">{p.collection} collection</p>
          <h1 className="mt-2 sm:mt-4 text-3xl sm:text-4xl md:text-5xl leading-tight">{p.name}</h1>
          <p className="mt-3 sm:mt-4 text-xl sm:text-2xl font-light">{formatPrice(p.price)}</p>
          <p className="mt-6 sm:mt-8 text-sm sm:text-base text-muted-foreground leading-relaxed">{p.description}</p>
          <div className="mt-6 pt-6 border-t border-border/60">
            <p className="text-sm">
              <span className="eyebrow mr-3 text-muted-foreground">Material</span>
              <span className="font-normal">{p.material}</span>
            </p>
          </div>
          <button
            disabled={soldOut}
            className="btn-luxe mt-8 sm:mt-10 w-full disabled:opacity-50"
            onClick={() => {
              add(p.id);
              setAdded(true);
            }}
          >
            {p.stock === 0
              ? "Sold out"
              : soldOut
                ? "All available pieces are in your bag"
                : added
                  ? "Added to bag"
                  : "Add to bag"}
          </button>
          {added && (
            <Link
              to="/cart"
              className="mt-4 block text-center eyebrow text-xs link-underline w-fit mx-auto p-1"
            >
              View bag
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
