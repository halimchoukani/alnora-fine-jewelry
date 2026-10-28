import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Ck0AHjHn.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAuth } from "./auth-Cf9lKhpn.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as formatPrice } from "./products-uilopjg8.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-CpH-W4gO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var field = "w-full border bg-background px-4 py-3 text-base sm:text-sm outline-none focus:border-primary min-h-[44px]";
var fields = [
	["full_name", "Full name"],
	["phone", "Phone"],
	["address_line", "Address"],
	["city", "City"],
	["postal_code", "Postal code"],
	["country", "Country"]
];
function Account() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const navigate = useNavigate();
	const [saving, setSaving] = (0, import_react.useState)(false);
	const profile = useQuery({
		queryKey: ["profile", user?.id],
		enabled: !!user,
		queryFn: async () => (await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()).data
	});
	const orders = useQuery({
		queryKey: ["my-orders", user?.id],
		enabled: !!user,
		queryFn: async () => (await supabase.from("orders").select("*, order_items(*)").eq("user_id", user.id).order("created_at", { ascending: false })).data ?? []
	});
	const save = async (e) => {
		e.preventDefault();
		const f = new FormData(e.currentTarget);
		const row = Object.fromEntries(fields.map(([k]) => [k, String(f.get(k) ?? "").trim()]));
		setSaving(true);
		const { error } = await supabase.from("profiles").upsert({
			id: user.id,
			...row,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		});
		setSaving(false);
		if (error) toast.error(error.message);
		else {
			toast.success("Profile saved");
			qc.invalidateQueries({ queryKey: ["profile"] });
		}
	};
	const signOut = async () => {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 sm:pb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-muted-foreground text-xs",
					children: user?.email
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 sm:mt-2 text-3xl sm:text-5xl",
					children: "My Account"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: signOut,
					className: "eyebrow link-underline text-xs text-muted-foreground hover:text-foreground w-fit py-1",
					children: "Sign out"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 sm:mt-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl sm:text-3xl",
						children: "Profile & Shipping"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-1",
						children: "Used automatically for shipping when placing orders."
					}),
					profile.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-muted-foreground",
						children: "Loading…"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: save,
						className: "mt-6 grid gap-4 sm:grid-cols-2",
						children: [fields.map(([k, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: k === "address_line" ? "sm:col-span-2" : "",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow text-xs text-muted-foreground",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: k,
								defaultValue: profile.data?.[k] ?? "",
								className: `${field} mt-1.5`
							})]
						}, k)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-2 pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: saving,
								className: "btn-luxe w-full sm:w-auto",
								children: saving ? "Saving…" : "Save profile"
							})
						})]
					}, profile.data?.updated_at)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14 sm:mt-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl sm:text-3xl",
						children: "My Orders"
					}),
					orders.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-muted-foreground",
						children: "You haven't placed any orders yet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 divide-y border-y",
						children: orders.data?.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "eyebrow text-xs",
										children: [
											"#",
											o.id.slice(0, 8).toUpperCase(),
											" · ",
											new Date(o.created_at).toLocaleDateString()
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "eyebrow text-xs uppercase px-2 py-0.5 border text-primary",
										children: o.status
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 text-sm text-muted-foreground space-y-1",
									children: o.order_items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										i.quantity,
										" × ",
										i.product_name
									] }, i.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-medium text-base sm:text-lg",
									children: formatPrice(Number(o.total))
								})
							]
						}, o.id))
					})
				]
			})
		]
	});
}
//#endregion
export { Account as component };
