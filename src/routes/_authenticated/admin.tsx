import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { categories, formatPrice, productImage, productsQuery, type Product } from "@/lib/products";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Store Admin — ALNORA" },
      { name: "description", content: "Manage ALNORA products and orders." },
      { property: "og:title", content: "Store Admin — ALNORA" },
      { property: "og:description", content: "Manage ALNORA products and orders." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const field = "w-full border bg-background px-3 py-2 text-sm outline-none focus:border-primary";
const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function Admin() {
  const { isAdmin, ready } = useAuth();
  const [tab, setTab] = useState<"products" | "orders">("products");
  if (!ready) return <p className="py-32 text-center text-muted-foreground">Loading…</p>;
  if (!isAdmin) return <div className="py-32 text-center"><h1 className="text-4xl">Admins only</h1><Link to="/" className="btn-luxe mt-8">Back home</Link></div>;
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-5xl text-center">Store Admin</h1>
      <div className="mt-8 flex justify-center gap-8">
        {(["products", "orders"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`eyebrow pb-1 ${tab === t ? "link-underline" : "text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      {tab === "products" ? <Products /> : <Orders />}
    </div>
  );
}

function Products() {
  const qc = useQueryClient();
  const { data } = useQuery(productsQuery);
  const [editing, setEditing] = useState<Product | "new" | null>(null);

  const remove = async (p: Product) => {
    if (!confirm(`Delete ${p.name}?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["products"] }); }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end"><button className="btn-luxe" onClick={() => setEditing("new")}>Add product</button></div>
      {editing && <ProductForm product={editing === "new" ? null : editing} onDone={() => setEditing(null)} />}
      <div className="mt-6 divide-y border-y">
        {data?.map((p) => (
          <div key={p.id} className="flex items-center gap-4 py-4">
            <img src={productImage(p)} alt="" className="h-16 w-16 object-cover bg-card" />
            <div className="flex-1">
              <p className="font-display text-xl">{p.name} {!p.is_active && <span className="eyebrow text-muted-foreground ml-2">hidden</span>}</p>
              <p className="text-sm text-muted-foreground">{p.category} · {formatPrice(p.price)} · {p.stock} in stock</p>
            </div>
            <button className="eyebrow link-underline" onClick={() => setEditing(p)}>Edit</button>
            <button className="eyebrow text-destructive" onClick={() => remove(p)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductForm({ product, onDone }: { product: Product | null; onDone: () => void }) {
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name")).trim();
    const row = {
      name,
      slug: product?.slug ?? slugify(name),
      collection: String(f.get("collection")).trim(),
      category: String(f.get("category")),
      price: Number(f.get("price")),
      stock: Number(f.get("stock")),
      image_url: String(f.get("image_url")).trim(),
      material: String(f.get("material")).trim(),
      description: String(f.get("description")).trim(),
      is_active: f.get("is_active") === "on",
    };
    setBusy(true);
    const { error } = product
      ? await supabase.from("products").update(row).eq("id", product.id)
      : await supabase.from("products").insert(row);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success(product ? "Product updated" : "Product added");
    qc.invalidateQueries({ queryKey: ["products"] });
    qc.invalidateQueries({ queryKey: ["product"] });
    onDone();
  };
  return (
    <form onSubmit={submit} className="mt-6 grid gap-4 border p-6 sm:grid-cols-2 bg-card">
      <h2 className="sm:col-span-2 text-2xl">{product ? `Edit ${product.name}` : "New product"}</h2>
      <label><span className="eyebrow">Name</span><input name="name" required defaultValue={product?.name} className={field} /></label>
      <label><span className="eyebrow">Collection</span><input name="collection" defaultValue={product?.collection} className={field} /></label>
      <label><span className="eyebrow">Category</span>
        <select name="category" defaultValue={product?.category ?? "rings"} className={field}>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </label>
      <label><span className="eyebrow">Price (USD)</span><input name="price" type="number" min={0} step="0.01" required defaultValue={product?.price} className={field} /></label>
      <label><span className="eyebrow">Stock</span><input name="stock" type="number" min={0} required defaultValue={product?.stock ?? 10} className={field} /></label>
      <label><span className="eyebrow">Image link (optional)</span><input name="image_url" placeholder="https://…" defaultValue={product?.image_url} className={field} /></label>
      <label className="sm:col-span-2"><span className="eyebrow">Material</span><input name="material" defaultValue={product?.material} className={field} /></label>
      <label className="sm:col-span-2"><span className="eyebrow">Description</span><textarea name="description" rows={3} defaultValue={product?.description} className={field} /></label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" defaultChecked={product?.is_active ?? true} /> Visible in shop</label>
      <div className="sm:col-span-2 flex gap-4">
        <button disabled={busy} className="btn-luxe">{busy ? "Saving…" : "Save"}</button>
        <button type="button" onClick={onDone} className="btn-outline-luxe">Cancel</button>
      </div>
    </form>
  );
}

function Orders() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => (await supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false })).data ?? [],
  });
  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Order updated"); qc.invalidateQueries({ queryKey: ["admin-orders"] }); }
  };
  if (data?.length === 0) return <p className="mt-10 text-center text-muted-foreground">No orders yet.</p>;
  return (
    <div className="mt-10 divide-y border-y">
      {data?.map((o) => (
        <div key={o.id} className="py-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="eyebrow">#{o.id.slice(0, 8).toUpperCase()}</p>
            <p className="text-sm text-muted-foreground">{new Date(o.created_at).toLocaleString()}</p>
            <p className="mt-2">{formatPrice(Number(o.total))}</p>
          </div>
          <div className="text-sm">
            <p>{o.full_name || "—"} {o.phone && `· ${o.phone}`}</p>
            <p className="text-muted-foreground">{[o.address_line, o.city, o.postal_code, o.country].filter(Boolean).join(", ") || "No address given"}</p>
            <ul className="mt-2">{o.order_items.map((i) => <li key={i.id}>{i.quantity} × {i.product_name}</li>)}</ul>
          </div>
          <div className="md:justify-self-end">
            <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)} className={field}>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
