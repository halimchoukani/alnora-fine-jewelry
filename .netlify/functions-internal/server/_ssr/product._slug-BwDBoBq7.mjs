import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as productQuery, n as formatPrice, r as productImage } from "./products-uilopjg8.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useCart } from "./cart-Cz8O56mK.mjs";
import { t as Route } from "./product._slug-DO6Qi-Gb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-BwDBoBq7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { slug } = Route.useParams();
	const { data: p, isLoading } = useQuery(productQuery(slug));
	const { add, lines } = useCart();
	const [added, setAdded] = (0, import_react.useState)(false);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-card aspect-square max-w-xl mx-auto animate-pulse" })
	});
	if (!p) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-24 sm:py-32 text-center px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl sm:text-4xl",
			children: "Piece not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/shop",
			className: "btn-luxe mt-6 sm:mt-8 w-full sm:w-auto",
			children: "Back to shop"
		})]
	});
	const inBag = lines.find((l) => l.productId === p.id)?.qty ?? 0;
	const soldOut = p.stock <= inBag;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "eyebrow text-[10px] sm:text-xs text-muted-foreground hover:text-foreground transition-colors",
				children: "← Back to all jewelry"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 sm:gap-12 md:gap-16 md:grid-cols-2 items-start",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${p.name} — ALNORA` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-card aspect-square overflow-hidden max-w-xl w-full mx-auto shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: productImage(p),
						alt: p.name,
						width: 1024,
						height: 1024,
						className: "h-full w-full object-cover"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "eyebrow text-muted-foreground",
							children: [p.collection, " collection"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 sm:mt-4 text-3xl sm:text-4xl md:text-5xl leading-tight",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 sm:mt-4 text-xl sm:text-2xl font-light",
							children: formatPrice(p.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 sm:mt-8 text-sm sm:text-base text-muted-foreground leading-relaxed",
							children: p.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 pt-6 border-t border-border/60",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow mr-3 text-muted-foreground",
									children: "Material"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-normal",
									children: p.material
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: soldOut,
							className: "btn-luxe mt-8 sm:mt-10 w-full disabled:opacity-50",
							onClick: () => {
								add(p.id);
								setAdded(true);
							},
							children: p.stock === 0 ? "Sold out" : soldOut ? "All available pieces are in your bag" : added ? "Added to bag" : "Add to bag"
						}),
						added && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cart",
							className: "mt-4 block text-center eyebrow text-xs link-underline w-fit mx-auto p-1",
							children: "View bag"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { ProductPage as component };
