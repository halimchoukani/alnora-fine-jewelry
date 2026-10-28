import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "My Account — ALNORA" },
      { name: "description", content: "Manage your ALNORA profile, shipping address and orders." },
      { property: "og:title", content: "My Account — ALNORA" },
      { property: "og:description", content: "Manage your ALNORA profile and orders." },
    ],
  }),
  component: Account,
});

const field = "w-full border bg-background px-4 py-3 text-base sm:text-sm outline-none focus:border-primary min-h-[44px]";
const fields = [
  ["full_name", "Full name"], ["phone", "Phone"], ["address_line", "Address"],
  ["city", "City"], ["postal_code", "Postal code"], ["country", "Country"],
] as const;

function Account() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const profile = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => (await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle()).data,
  });
  const orders = useQuery({
    queryKey: ["my-orders", user?.id],
    enabled: !!user,
    queryFn: async () => (await supabase.from("orders").select("*, order_items(*)").eq("user_id", user!.id).order("created_at", { ascending: false })).data ?? [],
  });

  const save = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const row = Object.fromEntries(fields.map(([k]) => [k, String(f.get(k) ?? "").trim()]));
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({ id: user!.id, ...row, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) toast.error(error.message); else { toast.success("Profile saved"); qc.invalidateQueries({ queryKey: ["profile"] }); }
  };

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 sm:pb-8">
        <div>
          <p className="eyebrow text-muted-foreground text-xs">{user?.email}</p>
          <h1 className="mt-1 sm:mt-2 text-3xl sm:text-5xl">My Account</h1>
        </div>
        <button
          onClick={signOut}
          className="eyebrow link-underline text-xs text-muted-foreground hover:text-foreground w-fit py-1"
        >
          Sign out
        </button>
      </div>

      <section className="mt-10 sm:mt-14">
        <h2 className="text-2xl sm:text-3xl">Profile & Shipping</h2>
        <p className="text-sm text-muted-foreground mt-1">Used automatically for shipping when placing orders.</p>
        {profile.isLoading ? (
          <p className="mt-6 text-muted-foreground">Loading…</p>
        ) : (
          <form key={profile.data?.updated_at} onSubmit={save} className="mt-6 grid gap-4 sm:grid-cols-2">
            {fields.map(([k, label]) => (
              <label key={k} className={k === "address_line" ? "sm:col-span-2" : ""}>
                <span className="eyebrow text-xs text-muted-foreground">{label}</span>
                <input name={k} defaultValue={profile.data?.[k] ?? ""} className={`${field} mt-1.5`} />
              </label>
            ))}
            <div className="sm:col-span-2 pt-2">
              <button disabled={saving} className="btn-luxe w-full sm:w-auto">
                {saving ? "Saving…" : "Save profile"}
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="mt-14 sm:mt-20">
        <h2 className="text-2xl sm:text-3xl">My Orders</h2>
        {orders.data?.length === 0 && (
          <p className="mt-6 text-muted-foreground">You haven't placed any orders yet.</p>
        )}
        <div className="mt-6 divide-y border-y">
          {orders.data?.map((o) => (
            <div key={o.id} className="py-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="eyebrow text-xs">
                  #{o.id.slice(0, 8).toUpperCase()} · {new Date(o.created_at).toLocaleDateString()}
                </p>
                <span className="eyebrow text-xs uppercase px-2 py-0.5 border text-primary">
                  {o.status}
                </span>
              </div>
              <ul className="mt-3 text-sm text-muted-foreground space-y-1">
                {o.order_items.map((i) => (
                  <li key={i.id}>
                    {i.quantity} × {i.product_name}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-medium text-base sm:text-lg">{formatPrice(Number(o.total))}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
