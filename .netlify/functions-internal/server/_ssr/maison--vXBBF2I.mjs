import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as hero_default } from "./hero-D0vi95YH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/maison--vXBBF2I.js
var import_jsx_runtime = require_jsx_runtime();
function Maison() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-20 grid gap-8 sm:gap-12 md:gap-16 md:grid-cols-2 items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden bg-card shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero_default,
				alt: "ALNORA jewelry",
				loading: "lazy",
				width: 1920,
				height: 1088,
				className: "aspect-[4/5] object-cover w-full"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow text-primary",
				children: "The Maison"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl leading-tight",
				children: "Crafted to be treasured"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 sm:mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed",
				children: "ALNORA was born from a love of light and gold. Each piece is designed with intention and finished by hand, using ethically sourced stones and 18K gold."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed",
				children: "From everyday accessories to heirloom creations, our jewels are made to mark the moments that matter."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "btn-outline-luxe mt-8 sm:mt-10 w-full sm:w-auto",
				children: "Explore the collection"
			})
		] })]
	});
}
//#endregion
export { Maison as component };
