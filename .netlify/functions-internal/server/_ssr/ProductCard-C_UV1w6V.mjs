import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as formatPrice, r as productImage } from "./products-uilopjg8.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-C_UV1w6V.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/product/$slug",
		params: { slug: p.slug },
		className: "group block focus:outline-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-card overflow-hidden aspect-square shadow-2xs",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: productImage(p),
				alt: p.name,
				loading: "lazy",
				width: 1024,
				height: 1024,
				className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pt-3 sm:pt-5 text-center px-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-[10px] sm:text-xs text-muted-foreground",
					children: p.collection
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1.5 sm:mt-2 text-lg sm:text-xl font-display",
					children: p.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs sm:text-sm font-light",
					children: formatPrice(p.price)
				})
			]
		})]
	});
}
function ProductGridSkeleton({ n = 3 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: Array.from({ length: n }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-card aspect-square animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-5 h-4 bg-card mx-auto w-1/2" })] }, i)) });
}
//#endregion
export { ProductGridSkeleton as n, ProductCard as t };
