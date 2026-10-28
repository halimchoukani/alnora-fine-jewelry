import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ShoppingBag, User, Menu } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { categories } from "@/lib/products";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { count } = useCart();
  const { user, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-foreground text-background text-center eyebrow py-2 px-4 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em]">
        Complimentary shipping & gift wrapping
      </div>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between md:grid md:grid-cols-3">
          {/* Mobile hamburger menu */}
          <div className="flex items-center md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open navigation menu"
                  className="p-2 -ml-2 text-foreground hover:text-primary transition-colors focus:outline-none"
                >
                  <Menu className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-sm flex flex-col justify-between p-6">
                <div>
                  <SheetHeader className="text-left pb-6 border-b">
                    <SheetTitle className="font-display text-2xl tracking-[0.3em]">ALNORA</SheetTitle>
                    <p className="eyebrow text-[10px] text-muted-foreground mt-1">Fine Jewelry</p>
                  </SheetHeader>
                  <nav className="flex flex-col gap-5 py-6">
                    <Link
                      to="/shop"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-display tracking-wider hover:text-primary transition-colors"
                    >
                      All Jewelry
                    </Link>
                    <div className="pl-3 flex flex-col gap-3 border-l border-border/60">
                      {categories.map((c) => (
                        <Link
                          key={c.id}
                          to="/shop"
                          search={{ category: c.id }}
                          onClick={() => setMobileMenuOpen(false)}
                          className="eyebrow text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                    <Link
                      to="/maison"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-display tracking-wider hover:text-primary transition-colors"
                    >
                      The Maison
                    </Link>
                    <div className="pt-4 border-t border-border/60 flex flex-col gap-4">
                      <Link
                        to={user ? "/account" : "/auth"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
                      >
                        <User className="h-4 w-4" strokeWidth={1.5} />
                        <span>{user ? "My Account" : "Sign in / Register"}</span>
                      </Link>
                      <Link
                        to="/cart"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between text-sm font-medium hover:text-primary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                          <span>Shopping Bag</span>
                        </div>
                        <span className="eyebrow text-xs bg-card px-2 py-0.5 border">{count}</span>
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setMobileMenuOpen(false)}
                          className="eyebrow text-xs text-primary pt-2 font-medium"
                        >
                          Store Admin Panel
                        </Link>
                      )}
                    </div>
                  </nav>
                </div>
                <div className="pt-6 border-t text-xs text-muted-foreground">
                  <p className="eyebrow text-[10px]">Client Concierge</p>
                  <p className="mt-1">Free returns within 30 days & insured delivery worldwide.</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 eyebrow">
            <Link to="/shop" className="hover:text-primary transition-colors">Jewelry</Link>
            <Link to="/shop" search={{ category: "rings" }} className="hover:text-primary transition-colors">Rings</Link>
            <Link to="/maison" className="hover:text-primary transition-colors">Maison</Link>
          </nav>

          {/* Logo */}
          <Link
            to="/"
            className="font-display text-2xl sm:text-3xl tracking-[0.25em] sm:tracking-[0.35em] text-center"
          >
            ALNORA
          </Link>

          {/* User & Bag actions */}
          <div className="flex items-center justify-end gap-4 sm:gap-6 eyebrow">
            {isAdmin && (
              <Link to="/admin" className="hidden md:inline hover:text-primary transition-colors">
                Admin
              </Link>
            )}
            <Link
              to={user ? "/account" : "/auth"}
              className="flex items-center gap-2 hover:text-primary transition-colors p-1"
              aria-label={user ? "My account" : "Sign in"}
            >
              <User className="h-4 w-4" strokeWidth={1.25} />
              <span className="hidden md:inline">{user ? "Account" : "Sign in"}</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-1.5 sm:gap-2 hover:text-primary transition-colors p-1"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.25} />
              <span className="text-xs sm:text-sm">({count})</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t mt-16 sm:mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-sm">
          <div>
            <p className="font-display text-2xl tracking-[0.3em]">ALNORA</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">Fine jewelry and accessories, crafted to be treasured.</p>
          </div>
          <div>
            <p className="eyebrow mb-4">Shop</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">All jewelry</Link>
              {categories.map((c) => (
                <Link key={c.id} to="/shop" search={{ category: c.id }} className="text-muted-foreground hover:text-foreground transition-colors">
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4">Maison</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/maison" className="text-muted-foreground hover:text-foreground transition-colors">Our story</Link>
              <p className="text-muted-foreground">18K Ethical Gold</p>
              <p className="text-muted-foreground">Certified Stones</p>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4">Client care</p>
            <div className="flex flex-col gap-2.5 text-muted-foreground">
              <p>Free returns within 30 days</p>
              <p>Complimentary gift packaging</p>
              <p>Certificate of authenticity</p>
            </div>
          </div>
        </div>
        <div className="border-t border-border/40 py-6 px-4">
          <p className="text-center eyebrow text-[10px] sm:text-xs text-muted-foreground">
            © {new Date().getFullYear()} ALNORA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
