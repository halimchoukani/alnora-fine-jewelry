import { t as categories } from "./products-uilopjg8.mjs";
import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-BxNfkdIQ.js
var $$splitComponentImporter = () => import("./shop-BkKek3Gq.mjs");
var Route = createFileRoute("/shop")({
	validateSearch: (s) => {
		const c = s["category"];
		return categories.some((x) => x.id === c) ? { category: c } : {};
	},
	head: () => ({ meta: [
		{ title: "Jewelry Collection — ALNORA" },
		{
			name: "description",
			content: "Browse ALNORA rings, bracelets and necklaces in 18K gold, diamonds and emeralds."
		},
		{
			property: "og:title",
			content: "Jewelry Collection — ALNORA"
		},
		{
			property: "og:description",
			content: "Browse ALNORA rings, bracelets and necklaces in 18K gold, diamonds and emeralds."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
