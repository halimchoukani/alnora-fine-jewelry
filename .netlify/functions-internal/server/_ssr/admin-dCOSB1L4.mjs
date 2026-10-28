import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Ck0AHjHn.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAuth } from "./auth-Cf9lKhpn.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as productsQuery, n as formatPrice, r as productImage, t as categories } from "./products-uilopjg8.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-dCOSB1L4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var field = "w-full border bg-background px-3 py-2 text-base sm:text-sm outline-none focus:border-primary min-h-[44px]";
var statuses = [
	"pending",
	"processing",
	"shipped",
	"delivered",
	"cancelled"
];
var slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
function Admin() {
	const { isAdmin, ready } = useAuth();
	const [tab, setTab] = (0, import_react.useState)("products");
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-24 sm:py-32 text-center text-muted-foreground",
		children: "Loading…"
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-24 sm:py-32 text-center px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl sm:text-4xl",
			children: "Admins only"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "btn-luxe mt-6 sm:mt-8 w-full sm:w-auto",
			children: "Back home"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-5xl text-center",
				children: "Store Admin"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 sm:mt-8 flex justify-center gap-6 sm:gap-8 border-b pb-4",
				children: ["products", "orders"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(t),
					className: `eyebrow py-1.5 px-3 transition-colors capitalize ${tab === t ? "link-underline text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`,
					children: t
				}, t))
			}),
			tab === "products" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Products, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orders, {})
		]
	});
}
function Products() {
	const qc = useQueryClient();
	const { data } = useQuery(productsQuery);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const remove = async (p) => {
		if (!confirm(`Delete ${p.name}?`)) return;
		const { error } = await supabase.from("products").delete().eq("id", p.id);
		if (error) toast.error(error.message);
		else {
			toast.success("Deleted");
			qc.invalidateQueries({ queryKey: ["products"] });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 sm:mt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "eyebrow text-muted-foreground text-xs",
					children: [data?.length ?? 0, " pieces in catalog"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn-luxe w-full sm:w-auto",
					onClick: () => setEditing("new"),
					children: "Add product"
				})]
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductForm, {
				product: editing === "new" ? null : editing,
				onDone: () => setEditing(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 divide-y border-y",
				children: data?.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 sm:gap-4 flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: productImage(p),
							alt: "",
							className: "h-16 w-16 flex-shrink-0 object-cover bg-card shadow-xs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-lg sm:text-xl truncate",
								children: [
									p.name,
									" ",
									!p.is_active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "eyebrow text-[10px] text-muted-foreground ml-2 border px-1.5 py-0.5",
										children: "hidden"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs sm:text-sm text-muted-foreground mt-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "capitalize",
										children: p.category
									}),
									" · ",
									formatPrice(p.price),
									" · ",
									p.stock,
									" in stock"
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 self-end sm:self-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "eyebrow text-xs link-underline p-1.5 hover:text-primary transition-colors",
							onClick: () => setEditing(p),
							children: "Edit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "eyebrow text-xs text-destructive p-1.5 hover:opacity-80 transition-opacity",
							onClick: () => remove(p),
							children: "Delete"
						})]
					})]
				}, p.id))
			})
		]
	});
}
function ProductForm({ product, onDone }) {
	const qc = useQueryClient();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const submit = async (e) => {
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
			is_active: f.get("is_active") === "on"
		};
		setBusy(true);
		const { error } = product ? await supabase.from("products").update(row).eq("id", product.id) : await supabase.from("products").insert(row);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "mt-6 grid gap-4 border p-4 sm:p-6 sm:grid-cols-2 bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "sm:col-span-2 text-xl sm:text-2xl font-display",
				children: product ? `Edit ${product.name}` : "New product"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow text-xs",
				children: "Name"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				name: "name",
				required: true,
				defaultValue: product?.name,
				className: `${field} mt-1`
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow text-xs",
				children: "Collection"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				name: "collection",
				defaultValue: product?.collection,
				className: `${field} mt-1`
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow text-xs",
				children: "Category"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				name: "category",
				defaultValue: product?.category ?? "rings",
				className: `${field} mt-1`,
				children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: c.id,
					children: c.label
				}, c.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow text-xs",
				children: "Price (USD)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				name: "price",
				type: "number",
				min: 0,
				step: "0.01",
				required: true,
				defaultValue: product?.price,
				className: `${field} mt-1`
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow text-xs",
				children: "Stock"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				name: "stock",
				type: "number",
				min: 0,
				required: true,
				defaultValue: product?.stock ?? 10,
				className: `${field} mt-1`
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow text-xs",
				children: "Image link (optional)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				name: "image_url",
				placeholder: "https://…",
				defaultValue: product?.image_url,
				className: `${field} mt-1`
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow text-xs",
					children: "Material"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "material",
					defaultValue: product?.material,
					className: `${field} mt-1`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow text-xs",
					children: "Description"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					name: "description",
					rows: 3,
					defaultValue: product?.description,
					className: `${field} mt-1`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm sm:col-span-2 py-1 cursor-pointer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					name: "is_active",
					defaultChecked: product?.is_active ?? true,
					className: "h-4 w-4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Visible in shop" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2 flex flex-col sm:flex-row gap-3 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: busy,
					className: "btn-luxe w-full sm:w-auto",
					children: busy ? "Saving…" : "Save"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onDone,
					className: "btn-outline-luxe w-full sm:w-auto",
					children: "Cancel"
				})]
			})
		]
	});
}
function Orders() {
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["admin-orders"],
		queryFn: async () => (await supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false })).data ?? []
	});
	const setStatus = async (id, status) => {
		const { error } = await supabase.from("orders").update({ status }).eq("id", id);
		if (error) toast.error(error.message);
		else {
			toast.success("Order updated");
			qc.invalidateQueries({ queryKey: ["admin-orders"] });
		}
	};
	if (data?.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-10 text-center text-muted-foreground",
		children: "No orders yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-8 sm:mt-10 divide-y border-y",
		children: data?.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "py-6 flex flex-col md:grid md:grid-cols-3 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow text-xs",
						children: ["#", o.id.slice(0, 8).toUpperCase()]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: new Date(o.created_at).toLocaleString()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-medium text-base sm:text-lg",
						children: formatPrice(Number(o.total))
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium",
							children: [
								o.full_name || "—",
								" ",
								o.phone && `· ${o.phone}`
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-xs mt-0.5",
							children: [
								o.address_line,
								o.city,
								o.postal_code,
								o.country
							].filter(Boolean).join(", ") || "No address given"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 text-xs text-muted-foreground space-y-0.5",
							children: o.order_items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								i.quantity,
								" × ",
								i.product_name
							] }, i.id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:justify-self-end flex flex-col justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs eyebrow text-muted-foreground mb-1 md:hidden",
						children: "Update Status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: o.status,
						onChange: (e) => setStatus(o.id, e.target.value),
						className: `${field} w-full md:w-auto uppercase text-xs`,
						children: statuses.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: s
						}, s))
					})]
				})
			]
		}, o.id))
	});
}
//#endregion
export { Admin as component };
