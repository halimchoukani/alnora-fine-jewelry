import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/maison")({
  head: () => ({
    meta: [
      { title: "The Maison — ALNORA" },
      { name: "description", content: "The story and craftsmanship behind ALNORA fine jewelry." },
      { property: "og:title", content: "The Maison — ALNORA" },
      { property: "og:description", content: "The story and craftsmanship behind ALNORA fine jewelry." },
    ],
  }),
  component: Maison,
});

function Maison() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 grid gap-16 md:grid-cols-2 items-center">
      <img src={hero} alt="ALNORA jewelry" loading="lazy" width={1920} height={1088} className="aspect-[4/5] object-cover w-full" />
      <div>
        <p className="eyebrow text-primary">The Maison</p>
        <h1 className="mt-4 text-5xl leading-tight">Crafted to be treasured</h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">ALNORA was born from a love of light and gold. Each piece is designed with intention and finished by hand, using ethically sourced stones and 18K gold.</p>
        <p className="mt-4 text-muted-foreground leading-relaxed">From everyday accessories to heirloom creations, our jewels are made to mark the moments that matter.</p>
        <Link to="/shop" className="btn-outline-luxe mt-10">Explore the collection</Link>
      </div>
    </div>
  );
}
