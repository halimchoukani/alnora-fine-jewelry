import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Ck0AHjHn.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAuth } from "./auth-Cf9lKhpn.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as productsQuery, n as formatPrice, r as productImage } from "./products-uilopjg8.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useCart } from "./cart-Cz8O56mK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-ddzl1LcS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const { lines, setQty, remove, reload } = useCart();
	const { user } = useAuth();
	const { data: products } = useQuery(productsQuery);
	const qc = useQueryClient();
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [doneId, setDoneId] = (0, import_react.useState)(null);
	const items = lines.map((l) => ({
		...l,
		p: products?.find((x) => x.id === l.productId)
	})).filter((x) => x.p);
	const total = items.reduce((s, x) => s + x.p.price * x.qty, 0);
	const checkout = async () => {
		if (!user) {
			navigate({
				to: "/auth",
				search: { redirect: "/cart" }
			});
			return;
		}
		setBusy(true);
		const { data, error } = await supabase.rpc("place_order");
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		await reload();
		qc.invalidateQueries({ queryKey: ["products"] });
		setDoneId(data);
	};
	if (doneId) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-16 sm:py-32 text-center px-4 sm:px-6 max-w-xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-5xl",
				children: "Thank you"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed",
				children: [
					"Your order has been placed. Order reference ",
					doneId.slice(0, 8).toUpperCase(),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/account",
					className: "btn-luxe w-full sm:w-auto",
					children: "View my orders"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					className: "btn-outline-luxe w-full sm:w-auto",
					children: "Continue shopping"
				})]
			})
		]
	});
	if (!products && lines.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-24 sm:py-32 text-center text-muted-foreground px-4",
		children: "Loading your bag…"
	});
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-20 sm:py-32 text-center px-4 max-w-md mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-5xl",
				children: "Your bag is empty"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: "Discover pieces crafted in 18K gold and precious stones."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "btn-luxe mt-8 sm:mt-10 w-full sm:w-auto",
				children: "Discover jewelry"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-5xl text-center",
				children: "Your Bag"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 sm:mt-14 divide-y border-y",
				children: items.map(({ p, qty }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-6 flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 sm:contents",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: productImage(p),
							alt: p.name,
							loading: "lazy",
							width: 1024,
							height: 1024,
							className: "h-20 w-20 sm:h-28 sm:w-28 flex-shrink-0 object-cover bg-card shadow-xs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow text-[10px] sm:text-xs text-muted-foreground",
									children: p.collection
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/product/$slug",
									params: { slug: p.slug },
									className: "font-display text-lg sm:text-2xl hover:text-primary transition-colors block truncate",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground mt-0.5 sm:hidden",
									children: [formatPrice(p.price), " each"]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between sm:contents w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 sm:gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": "Decrease quantity",
									onClick: () => setQty(p.id, qty - 1),
									className: "h-8 w-8 sm:h-7 sm:w-7 flex items-center justify-center border hover:bg-card transition-colors touch-manipulation",
									children: "−"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-6 text-center",
									children: qty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": "Increase quantity",
									disabled: qty >= p.stock,
									onClick: () => setQty(p.id, qty + 1),
									className: "h-8 w-8 sm:h-7 sm:w-7 flex items-center justify-center border hover:bg-card transition-colors disabled:opacity-40 touch-manipulation",
									children: "+"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => remove(p.id),
									className: "eyebrow text-[10px] sm:text-xs text-muted-foreground hover:text-destructive ml-4 sm:ml-6 p-1 transition-colors",
									children: "Remove"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base sm:text-lg font-medium sm:font-normal whitespace-nowrap",
							children: formatPrice(p.price * qty)
						})]
					})]
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 sm:mt-10 flex flex-col items-stretch sm:items-end gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between sm:justify-end items-center gap-6 py-2 border-b sm:border-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow text-muted-foreground",
							children: "Subtotal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl sm:text-2xl font-light",
							children: formatPrice(total)
						})]
					}),
					user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs sm:text-sm text-muted-foreground text-left sm:text-right leading-relaxed",
						children: [
							"Ships to the address in",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/account",
								className: "link-underline",
								children: "your account"
							}),
							". No payment is taken online."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-luxe w-full sm:w-auto",
						disabled: busy,
						onClick: checkout,
						children: user ? busy ? "Placing order…" : "Place order" : "Sign in to check out"
					})
				]
			})
		]
	});
}
//#endregion
export { CartPage as component };
