import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as productsQuery, t as categories } from "./products-uilopjg8.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./shop-BxNfkdIQ.mjs";
import { n as ProductGridSkeleton, t as ProductCard } from "./ProductCard-C_UV1w6V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-BkKek3Gq.js
var import_jsx_runtime = require_jsx_runtime();
function Shop() {
	const { category } = Route.useSearch();
	const { data } = useQuery(productsQuery);
	const active = data?.filter((p) => p.is_active);
	const list = active && category ? active.filter((p) => p.category === category) : active;
	const tab = (active) => `eyebrow py-1.5 px-2 transition-colors ${active ? "link-underline text-foreground" : "text-muted-foreground hover:text-foreground"}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-center text-3xl sm:text-4xl md:text-5xl",
				children: category ? categories.find((c) => c.id === category)?.label : "All Jewelry"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 sm:mt-10 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					className: tab(!category),
					children: "All"
				}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					search: { category: c.id },
					className: tab(category === c.id),
					children: c.label
				}, c.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 sm:mt-16 grid gap-6 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
				children: [list ? list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridSkeleton, { n: 6 }), list && !list.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "col-span-full text-center text-muted-foreground py-12",
					children: "No pieces here yet."
				})]
			})
		]
	});
}
//#endregion
export { Shop as component };
