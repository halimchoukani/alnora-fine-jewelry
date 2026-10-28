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

  if (doneId)
    return (
      <div className="py-16 sm:py-32 text-center px-4 sm:px-6 max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-5xl">Thank you</h1>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          Your order has been placed. Order reference {doneId.slice(0, 8).toUpperCase()}.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link to="/account" className="btn-luxe w-full sm:w-auto">
            View my orders
          </Link>
          <Link to="/shop" className="btn-outline-luxe w-full sm:w-auto">
            Continue shopping
          </Link>
        </div>
      </div>
    );

  if (!products && lines.length)
    return <div className="py-24 sm:py-32 text-center text-muted-foreground px-4">Loading your bag…</div>;

  if (!items.length)
    return (
      <div className="py-20 sm:py-32 text-center px-4 max-w-md mx-auto">
        <h1 className="text-3xl sm:text-5xl">Your bag is empty</h1>
        <p className="mt-4 text-sm text-muted-foreground">Discover pieces crafted in 18K gold and precious stones.</p>
        <Link to="/shop" className="btn-luxe mt-8 sm:mt-10 w-full sm:w-auto">
          Discover jewelry
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-20">
      <h1 className="text-3xl sm:text-5xl text-center">Your Bag</h1>
      <div className="mt-8 sm:mt-14 divide-y border-y">
        {items.map(({ p, qty }) => (
          <div key={p.id} className="py-6 flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
            <div className="flex gap-4 sm:contents">
              <img
                src={productImage(p)}
                alt={p.name}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-20 w-20 sm:h-28 sm:w-28 flex-shrink-0 object-cover bg-card shadow-xs"
              />
              <div className="flex-1 min-w-0">
                <p className="eyebrow text-[10px] sm:text-xs text-muted-foreground">{p.collection}</p>
                <Link
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  className="font-display text-lg sm:text-2xl hover:text-primary transition-colors block truncate"
                >
                  {p.name}
                </Link>
                <p className="text-sm text-muted-foreground mt-0.5 sm:hidden">{formatPrice(p.price)} each</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:contents w-full">
              <div className="flex items-center gap-2 sm:gap-3 text-sm">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQty(p.id, qty - 1)}
                  className="h-8 w-8 sm:h-7 sm:w-7 flex items-center justify-center border hover:bg-card transition-colors touch-manipulation"
                >
                  −
                </button>
                <span className="w-6 text-center">{qty}</span>
                <button
                  aria-label="Increase quantity"
                  disabled={qty >= p.stock}
                  onClick={() => setQty(p.id, qty + 1)}
                  className="h-8 w-8 sm:h-7 sm:w-7 flex items-center justify-center border hover:bg-card transition-colors disabled:opacity-40 touch-manipulation"
                >
                  +
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="eyebrow text-[10px] sm:text-xs text-muted-foreground hover:text-destructive ml-4 sm:ml-6 p-1 transition-colors"
                >
                  Remove
                </button>
              </div>
              <p className="text-base sm:text-lg font-medium sm:font-normal whitespace-nowrap">
                {formatPrice(p.price * qty)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-10 flex flex-col items-stretch sm:items-end gap-4">
        <div className="flex justify-between sm:justify-end items-center gap-6 py-2 border-b sm:border-none">
          <span className="eyebrow text-muted-foreground">Subtotal</span>
          <span className="text-xl sm:text-2xl font-light">{formatPrice(total)}</span>
        </div>
        {user && (
          <p className="text-xs sm:text-sm text-muted-foreground text-left sm:text-right leading-relaxed">
            Ships to the address in{" "}
            <Link to="/account" className="link-underline">
              your account
            </Link>
            . No payment is taken online.
          </p>
        )}
        <button
          className="btn-luxe w-full sm:w-auto"
          disabled={busy}
          onClick={checkout}
        >
          {user ? (busy ? "Placing order…" : "Place order") : "Sign in to check out"}
        </button>
      </div>
    </div>
  );
}
