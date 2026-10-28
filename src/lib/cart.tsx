import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export interface CartLine { productId: string; qty: number }

interface CartCtx {
  lines: CartLine[];
  add: (productId: string) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  reload: () => Promise<void>;
  count: number;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "alnora-cart-v2";

const readGuest = (): CartLine[] => {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  const [lines, setLines] = useState<CartLine[]>([]);
  const uid = user?.id ?? null;
  const uidRef = useRef(uid);
  uidRef.current = uid;

  const reload = useCallback(async () => {
    if (!uidRef.current) { setLines(readGuest()); return; }
    const { data } = await supabase.from("cart_items").select("product_id, quantity").order("created_at");
    setLines((data ?? []).map((r) => ({ productId: r.product_id, qty: r.quantity })));
  }, []);

  // Load cart; when someone signs in, move their guest bag into their account.
  useEffect(() => {
    if (!ready) return;
    (async () => {
      if (uid) {
        const guest = readGuest();
        if (guest.length) {
          const { data: existing } = await supabase.from("cart_items").select("product_id, quantity");
          const rows = guest.map((g) => ({
            user_id: uid,
            product_id: g.productId,
            quantity: g.qty + (existing?.find((e) => e.product_id === g.productId)?.quantity ?? 0),
          }));
          await supabase.from("cart_items").upsert(rows, { onConflict: "user_id,product_id" });
          localStorage.removeItem(KEY);
        }
      }
      await reload();
    })();
  }, [uid, ready, reload]);

  const persist = async (productId: string, qty: number) => {
    if (!uidRef.current) return;
    if (qty <= 0) await supabase.from("cart_items").delete().eq("product_id", productId);
    else await supabase.from("cart_items").upsert({ user_id: uidRef.current, product_id: productId, quantity: qty }, { onConflict: "user_id,product_id" });
  };

  const update = (productId: string, fn: (q: number) => number) => {
    setLines((l) => {
      const cur = l.find((x) => x.productId === productId)?.qty ?? 0;
      const qty = fn(cur);
      const next = qty <= 0 ? l.filter((x) => x.productId !== productId)
        : cur ? l.map((x) => (x.productId === productId ? { ...x, qty } : x)) : [...l, { productId, qty }];
      if (!uidRef.current) localStorage.setItem(KEY, JSON.stringify(next));
      void persist(productId, qty);
      return next;
    });
  };

  const value: CartCtx = {
    lines,
    add: (id) => update(id, (q) => q + 1),
    remove: (id) => update(id, () => 0),
    setQty: (id, qty) => update(id, () => qty),
    reload,
    count: lines.reduce((s, x) => s + x.qty, 0),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
