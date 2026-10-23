import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface CartLine { slug: string; qty: number }

interface CartCtx {
  lines: CartLine[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "alnora-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try { setLines(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(lines)); }, [lines, loaded]);

  const add = (slug: string) =>
    setLines((l) => l.some((x) => x.slug === slug) ? l.map((x) => x.slug === slug ? { ...x, qty: x.qty + 1 } : x) : [...l, { slug, qty: 1 }]);
  const remove = (slug: string) => setLines((l) => l.filter((x) => x.slug !== slug));
  const setQty = (slug: string, qty: number) =>
    setLines((l) => qty <= 0 ? l.filter((x) => x.slug !== slug) : l.map((x) => x.slug === slug ? { ...x, qty } : x));
  const clear = () => setLines([]);
  const count = lines.reduce((s, x) => s + x.qty, 0);

  return <Ctx.Provider value={{ lines, add, remove, setQty, clear, count }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
