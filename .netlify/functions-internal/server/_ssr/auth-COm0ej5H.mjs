import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-COm0ej5H.js
var $$splitComponentImporter = () => import("./auth-RFUmv6Rm.mjs");
var Route = createFileRoute("/auth")({
	validateSearch: (s) => typeof s["redirect"] === "string" ? { redirect: s["redirect"] } : {},
	head: () => ({ meta: [
		{ title: "Sign in — ALNORA" },
		{
			name: "description",
			content: "Sign in or create your ALNORA account to save your bag and follow your orders."
		},
		{
			property: "og:title",
			content: "Sign in — ALNORA"
		},
		{
			property: "og:description",
			content: "Sign in or create your ALNORA account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
