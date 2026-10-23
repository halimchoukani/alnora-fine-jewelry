import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { formatPrice, products } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — ALNORA" },
      { name: "description", content: "Review the ALNORA pieces in your shopping bag." },
      { property: "og:title", content: "Your Bag — ALNORA" },
      { property: "og:description", content: "Review the ALNORA pieces in your shopping bag." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, clear } = useCart();
  const [done, setDone] = useState(false);
  const items = lines.map((l) => ({ ...l, p: products.find((x) => x.slug === l.slug)! })).filter((x) => x.p);
  const total = items.reduce((s, x) => s + x.p.price * x.qty, 0);

  if (done) return (
    <div className="py-32 text-center px-6"><h1 className="text-5xl">Thank you</h1><p className="mt-4 text-muted-foreground">Your order request has been received.</p><Link to="/shop" className="btn-luxe mt-10">Continue shopping</Link></div>
  );
  if (!items.length) return (
    <div className="py-32 text-center px-6"><h1 className="text-5xl">Your bag is empty</h1><Link to="/shop" className="btn-luxe mt-10">Discover jewelry</Link></div>
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-5xl text-center">Your Bag</h1>
      <div className="mt-14 divide-y border-y">
        {items.map(({ p, qty }) => (
          <div key={p.slug} className="flex gap-6 py-6 items-center">
            <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1024} className="h-28 w-28 object-cover bg-card" />
            <div className="flex-1">
              <p className="eyebrow text-muted-foreground">{p.collection}</p>
              <p className="font-display text-2xl">{p.name}</p>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <button aria-label="Decrease" onClick={() => setQty(p.slug, qty - 1)} className="px-2 border">−</button>
                <span>{qty}</span>
                <button aria-label="Increase" onClick={() => setQty(p.slug, qty + 1)} className="px-2 border">+</button>
                <button onClick={() => remove(p.slug)} className="eyebrow text-muted-foreground hover:text-primary ml-4">Remove</button>
              </div>
            </div>
            <p>{formatPrice(p.price * qty)}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-end gap-6">
        <p className="text-xl"><span className="eyebrow mr-4">Total</span>{formatPrice(total)}</p>
        <button className="btn-luxe" onClick={() => { clear(); setDone(true); }}>Checkout</button>
      </div>
    </div>
  );
}
