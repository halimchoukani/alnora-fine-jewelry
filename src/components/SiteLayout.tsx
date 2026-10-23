import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { count } = useCart();
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-foreground text-background text-center eyebrow py-2">Complimentary shipping & gift wrapping</div>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-6 h-20 grid grid-cols-3 items-center">
          <nav className="flex gap-8 eyebrow">
            <Link to="/shop" className="hover:text-primary">Jewelry</Link>
            <Link to="/shop" search={{ category: "rings" }} className="hidden md:inline hover:text-primary">Rings</Link>
            <Link to="/maison" className="hidden md:inline hover:text-primary">Maison</Link>
          </nav>
          <Link to="/" className="justify-self-center font-display text-3xl tracking-[0.35em]">ALNORA</Link>
          <Link to="/cart" className="justify-self-end flex items-center gap-2 eyebrow hover:text-primary" aria-label="Shopping bag">
            <ShoppingBag className="h-4 w-4" strokeWidth={1.25} />
            <span>({count})</span>
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t mt-24">
        <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-4 text-sm">
          <div>
            <p className="font-display text-2xl tracking-[0.3em]">ALNORA</p>
            <p className="mt-4 text-muted-foreground">Fine jewelry and accessories, crafted to be treasured.</p>
          </div>
          <div><p className="eyebrow mb-4">Shop</p><Link to="/shop" className="block text-muted-foreground hover:text-foreground">All jewelry</Link></div>
          <div><p className="eyebrow mb-4">Maison</p><Link to="/maison" className="block text-muted-foreground hover:text-foreground">Our story</Link></div>
          <div><p className="eyebrow mb-4">Client care</p><p className="text-muted-foreground">Free returns within 30 days</p></div>
        </div>
        <p className="text-center eyebrow text-muted-foreground pb-8">© {new Date().getFullYear()} Alnora</p>
      </footer>
    </div>
  );
}
