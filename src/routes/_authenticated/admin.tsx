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

const field = "w-full border bg-background px-3 py-2 text-base sm:text-sm outline-none focus:border-primary min-h-[44px]";
const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function Admin() {
  const { isAdmin, ready } = useAuth();
  const [tab, setTab] = useState<"products" | "orders">("products");
  if (!ready) return <p className="py-24 sm:py-32 text-center text-muted-foreground">Loading…</p>;
  if (!isAdmin)
    return (
      <div className="py-24 sm:py-32 text-center px-4">
        <h1 className="text-3xl sm:text-4xl">Admins only</h1>
        <Link to="/" className="btn-luxe mt-6 sm:mt-8 w-full sm:w-auto">
          Back home
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-16">
      <h1 className="text-3xl sm:text-5xl text-center">Store Admin</h1>
      <div className="mt-6 sm:mt-8 flex justify-center gap-6 sm:gap-8 border-b pb-4">
        {(["products", "orders"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`eyebrow py-1.5 px-3 transition-colors capitalize ${
              tab === t ? "link-underline text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
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
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["products"] });
    }
  };

  return (
    <div className="mt-8 sm:mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="eyebrow text-muted-foreground text-xs">{data?.length ?? 0} pieces in catalog</p>
        <button className="btn-luxe w-full sm:w-auto" onClick={() => setEditing("new")}>
          Add product
        </button>
      </div>
      {editing && <ProductForm product={editing === "new" ? null : editing} onDone={() => setEditing(null)} />}
      <div className="mt-6 divide-y border-y">
        {data?.map((p) => (
          <div key={p.id} className="py-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <img src={productImage(p)} alt="" className="h-16 w-16 flex-shrink-0 object-cover bg-card shadow-xs" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg sm:text-xl truncate">
                  {p.name}{" "}
                  {!p.is_active && (
                    <span className="eyebrow text-[10px] text-muted-foreground ml-2 border px-1.5 py-0.5">hidden</span>
                  )}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  <span className="capitalize">{p.category}</span> · {formatPrice(p.price)} · {p.stock} in stock
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 self-end sm:self-center">
              <button
                className="eyebrow text-xs link-underline p-1.5 hover:text-primary transition-colors"
                onClick={() => setEditing(p)}
              >
                Edit
              </button>
              <button
                className="eyebrow text-xs text-destructive p-1.5 hover:opacity-80 transition-opacity"
                onClick={() => remove(p)}
              >
                Delete
              </button>
            </div>
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
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(product ? "Product updated" : "Product added");
    qc.invalidateQueries({ queryKey: ["products"] });
    qc.invalidateQueries({ queryKey: ["product"] });
    onDone();
  };
  return (
    <form onSubmit={submit} className="mt-6 grid gap-4 border p-4 sm:p-6 sm:grid-cols-2 bg-card">
      <h2 className="sm:col-span-2 text-xl sm:text-2xl font-display">{product ? `Edit ${product.name}` : "New product"}</h2>
      <label>
        <span className="eyebrow text-xs">Name</span>
        <input name="name" required defaultValue={product?.name} className={`${field} mt-1`} />
      </label>
      <label>
        <span className="eyebrow text-xs">Collection</span>
        <input name="collection" defaultValue={product?.collection} className={`${field} mt-1`} />
      </label>
      <label>
        <span className="eyebrow text-xs">Category</span>
        <select name="category" defaultValue={product?.category ?? "rings"} className={`${field} mt-1`}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="eyebrow text-xs">Price (USD)</span>
        <input name="price" type="number" min={0} step="0.01" required defaultValue={product?.price} className={`${field} mt-1`} />
      </label>
      <label>
        <span className="eyebrow text-xs">Stock</span>
        <input name="stock" type="number" min={0} required defaultValue={product?.stock ?? 10} className={`${field} mt-1`} />
      </label>
      <label>
        <span className="eyebrow text-xs">Image link (optional)</span>
        <input name="image_url" placeholder="https://…" defaultValue={product?.image_url} className={`${field} mt-1`} />
      </label>
      <label className="sm:col-span-2">
        <span className="eyebrow text-xs">Material</span>
        <input name="material" defaultValue={product?.material} className={`${field} mt-1`} />
      </label>
      <label className="sm:col-span-2">
        <span className="eyebrow text-xs">Description</span>
        <textarea name="description" rows={3} defaultValue={product?.description} className={`${field} mt-1`} />
      </label>
      <label className="flex items-center gap-2 text-sm sm:col-span-2 py-1 cursor-pointer">
        <input type="checkbox" name="is_active" defaultChecked={product?.is_active ?? true} className="h-4 w-4" />
        <span>Visible in shop</span>
      </label>
      <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
        <button disabled={busy} className="btn-luxe w-full sm:w-auto">
          {busy ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={onDone} className="btn-outline-luxe w-full sm:w-auto">
          Cancel
        </button>
      </div>
    </form>
  );
}

function Orders() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () =>
      (await supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false })).data ?? [],
  });
  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Order updated");
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
    }
  };
  if (data?.length === 0) return <p className="mt-10 text-center text-muted-foreground">No orders yet.</p>;
  return (
    <div className="mt-8 sm:mt-10 divide-y border-y">
      {data?.map((o) => (
        <div key={o.id} className="py-6 flex flex-col md:grid md:grid-cols-3 gap-4">
          <div>
            <p className="eyebrow text-xs">#{o.id.slice(0, 8).toUpperCase()}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{new Date(o.created_at).toLocaleString()}</p>
            <p className="mt-2 font-medium text-base sm:text-lg">{formatPrice(Number(o.total))}</p>
          </div>
          <div className="text-sm">
            <p className="font-medium">{o.full_name || "—"} {o.phone && `· ${o.phone}`}</p>
            <p className="text-muted-foreground text-xs mt-0.5">
              {[o.address_line, o.city, o.postal_code, o.country].filter(Boolean).join(", ") || "No address given"}
            </p>
            <ul className="mt-2 text-xs text-muted-foreground space-y-0.5">
              {o.order_items.map((i) => (
                <li key={i.id}>
                  {i.quantity} × {i.product_name}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:justify-self-end flex flex-col justify-center">
            <label className="text-xs eyebrow text-muted-foreground mb-1 md:hidden">Update Status</label>
            <select
              value={o.status}
              onChange={(e) => setStatus(o.id, e.target.value)}
              className={`${field} w-full md:w-auto uppercase text-xs`}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
