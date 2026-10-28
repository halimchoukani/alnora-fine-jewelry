import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as productsQuery, t as categories } from "./products-uilopjg8.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as hero_default } from "./hero-D0vi95YH.mjs";
import { n as ProductGridSkeleton, t as ProductCard } from "./ProductCard-C_UV1w6V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-jCoWc0IO.js
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const { data: products } = useQuery(productsQuery);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative h-[80vh] sm:h-[85vh] min-h-[480px] sm:min-h-[560px] overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero_default,
				alt: "Woman wearing ALNORA diamond jewelry",
				width: 1920,
				height: 1088,
				className: "absolute inset-0 h-full w-full object-cover object-center"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-full mx-auto max-w-7xl px-4 sm:px-6 flex items-end pb-8 sm:pb-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full sm:max-w-md bg-background/90 backdrop-blur-sm p-6 sm:p-10 shadow-sm border border-border/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-primary",
							children: "New High Jewelry"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl leading-tight",
							children: "The Art of Light"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed",
							children: "Pieces shaped by hand, made to illuminate every moment."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "btn-luxe mt-6 sm:mt-8 w-full sm:w-auto",
							children: "Discover"
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-10 sm:mb-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-muted-foreground",
					children: "Explore"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 sm:mt-3 text-3xl sm:text-4xl",
					children: "Shop by Category"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3",
				children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/shop",
					search: { category: c.id },
					className: "group block text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/5] overflow-hidden bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.image,
							alt: c.label,
							loading: "lazy",
							width: 1024,
							height: 1024,
							className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 sm:mt-5 eyebrow link-underline inline-block",
						children: c.label
					})]
				}, c.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-card py-14 sm:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-10 sm:mb-14",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-muted-foreground",
							children: "Iconic creations"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 sm:mt-3 text-3xl sm:text-4xl",
							children: "The Signatures"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
						children: products ? products.filter((p) => p.is_active).slice(0, 3).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridSkeleton, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mt-10 sm:mt-14",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "btn-outline-luxe w-full sm:w-auto",
							children: "View all"
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-28 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-primary",
					children: "The Maison"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl leading-snug",
					children: "\"Every jewel holds a story — ours begins with yours.\""
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/maison",
					className: "mt-6 sm:mt-8 inline-block eyebrow link-underline",
					children: "Our story"
				})
			]
		})
	] });
}
//#endregion
export { Index as component };
