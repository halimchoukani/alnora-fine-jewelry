import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice, productImage, productsQuery } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

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
  const { lines, setQty, remove, reload } = useCart();
  const { user } = useAuth();
  const { data: products } = useQuery(productsQuery);
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [doneId, setDoneId] = useState<string | null>(null);

  const items = lines.map((l) => ({ ...l, p: products?.find((x) => x.id === l.productId) })).filter((x) => x.p) as { productId: string; qty: number; p: NonNullable<typeof products>[number] }[];
  const total = items.reduce((s, x) => s + x.p.price * x.qty, 0);

  const checkout = async () => {
    if (!user) { navigate({ to: "/auth", search: { redirect: "/cart" } }); return; }
    setBusy(true);
    const { data, error } = await supabase.rpc("place_order");
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    await reload();
    qc.invalidateQueries({ queryKey: ["products"] });
    setDoneId(data as string);
  };

  if (doneId) return (
    <div className="py-32 text-center px-6">
      <h1 className="text-5xl">Thank you</h1>
      <p className="mt-4 text-muted-foreground">Your order has been placed. Order reference {doneId.slice(0, 8).toUpperCase()}.</p>
      <div className="mt-10 flex justify-center gap-4"><Link to="/account" className="btn-luxe">View my orders</Link><Link to="/shop" className="btn-outline-luxe">Continue shopping</Link></div>
    </div>
  );
  if (!products && lines.length) return <div className="py-32 text-center text-muted-foreground">Loading your bag…</div>;
  if (!items.length) return (
    <div className="py-32 text-center px-6"><h1 className="text-5xl">Your bag is empty</h1><Link to="/shop" className="btn-luxe mt-10">Discover jewelry</Link></div>
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-5xl text-center">Your Bag</h1>
      <div className="mt-14 divide-y border-y">
        {items.map(({ p, qty }) => (
          <div key={p.id} className="flex gap-6 py-6 items-center">
            <img src={productImage(p)} alt={p.name} loading="lazy" width={1024} height={1024} className="h-28 w-28 object-cover bg-card" />
            <div className="flex-1">
              <p className="eyebrow text-muted-foreground">{p.collection}</p>
              <p className="font-display text-2xl">{p.name}</p>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <button aria-label="Decrease" onClick={() => setQty(p.id, qty - 1)} className="px-2 border">−</button>
                <span>{qty}</span>
                <button aria-label="Increase" disabled={qty >= p.stock} onClick={() => setQty(p.id, qty + 1)} className="px-2 border disabled:opacity-40">+</button>
                <button onClick={() => remove(p.id)} className="eyebrow text-muted-foreground hover:text-primary ml-4">Remove</button>
              </div>
            </div>
            <p>{formatPrice(p.price * qty)}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-end gap-4">
        <p className="text-xl"><span className="eyebrow mr-4">Total</span>{formatPrice(total)}</p>
        {user && <p className="text-sm text-muted-foreground">Ships to the address in <Link to="/account" className="link-underline">your account</Link>. No payment is taken online.</p>}
        <button className="btn-luxe" disabled={busy} onClick={checkout}>{user ? (busy ? "Placing order…" : "Place order") : "Sign in to check out"}</button>
      </div>
    </div>
  );
}
