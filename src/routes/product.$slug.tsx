import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { formatPrice, products } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const p = products.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { slug: p.slug, name: p.name, description: p.description };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — ALNORA` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.name} — ALNORA` },
          { property: "og:description", content: loaderData.description },
        ]
      : [{ title: "Piece not found — ALNORA" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="py-32 text-center"><h1 className="text-4xl">Piece not found</h1><Link to="/shop" className="btn-luxe mt-8">Back to shop</Link></div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = products.find((x) => x.slug === slug)!;
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 grid gap-16 md:grid-cols-2 items-center">
      <div className="bg-card aspect-square overflow-hidden">
        <img src={p.image} alt={p.name} width={1024} height={1024} className="h-full w-full object-cover" />
      </div>
      <div>
        <p className="eyebrow text-muted-foreground">{p.collection} collection</p>
        <h1 className="mt-4 text-5xl leading-tight">{p.name}</h1>
        <p className="mt-4 text-xl">{formatPrice(p.price)}</p>
        <p className="mt-8 text-muted-foreground leading-relaxed">{p.description}</p>
        <p className="mt-6 text-sm"><span className="eyebrow mr-3">Material</span>{p.material}</p>
        <button className="btn-luxe mt-10 w-full" onClick={() => { add(p.slug); setAdded(true); }}>
          {added ? "Added to bag" : "Add to bag"}
        </button>
        {added && <Link to="/cart" className="mt-4 block text-center eyebrow link-underline w-fit mx-auto">View bag</Link>}
      </div>
    </div>
  );
}
