import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Ck0AHjHn.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAuth, t as AuthProvider } from "./auth-Cf9lKhpn.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as categories } from "./products-uilopjg8.mjs";
import { W as redirect, _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRouteWithContext, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$8 } from "./auth-COm0ej5H.mjs";
import { n as useCart, t as CartProvider } from "./cart-Cz8O56mK.mjs";
import { t as Route$9 } from "./product._slug-DO6Qi-Gb.mjs";
import { t as Route$10 } from "./shop-BxNfkdIQ.mjs";
import { i as Menu, n as User, r as ShoppingBag, t as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CA-91elg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-UpKdgpCZ.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message: describeThrown(error),
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
function SiteLayout({ children }) {
	const { count } = useCart();
	const { user, isAdmin } = useAuth();
	const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-foreground text-background text-center eyebrow py-2 px-4 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em]",
				children: "Complimentary shipping & gift wrapping"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 bg-background/95 backdrop-blur border-b",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between md:grid md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center md:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
								open: mobileMenuOpen,
								onOpenChange: setMobileMenuOpen,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": "Open navigation menu",
										className: "p-2 -ml-2 text-foreground hover:text-primary transition-colors focus:outline-none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
											className: "h-5 w-5",
											strokeWidth: 1.5
										})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
									side: "left",
									className: "w-[85vw] max-w-sm flex flex-col justify-between p-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
										className: "text-left pb-6 border-b",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
											className: "font-display text-2xl tracking-[0.3em]",
											children: "ALNORA"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "eyebrow text-[10px] text-muted-foreground mt-1",
											children: "Fine Jewelry"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
										className: "flex flex-col gap-5 py-6",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/shop",
												onClick: () => setMobileMenuOpen(false),
												className: "text-lg font-display tracking-wider hover:text-primary transition-colors",
												children: "All Jewelry"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "pl-3 flex flex-col gap-3 border-l border-border/60",
												children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/shop",
													search: { category: c.id },
													onClick: () => setMobileMenuOpen(false),
													className: "eyebrow text-xs text-muted-foreground hover:text-foreground transition-colors",
													children: c.label
												}, c.id))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/maison",
												onClick: () => setMobileMenuOpen(false),
												className: "text-lg font-display tracking-wider hover:text-primary transition-colors",
												children: "The Maison"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "pt-4 border-t border-border/60 flex flex-col gap-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
														to: user ? "/account" : "/auth",
														onClick: () => setMobileMenuOpen(false),
														className: "flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
															className: "h-4 w-4",
															strokeWidth: 1.5
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: user ? "My Account" : "Sign in / Register" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
														to: "/cart",
														onClick: () => setMobileMenuOpen(false),
														className: "flex items-center justify-between text-sm font-medium hover:text-primary transition-colors",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-3",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
																className: "h-4 w-4",
																strokeWidth: 1.5
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shopping Bag" })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "eyebrow text-xs bg-card px-2 py-0.5 border",
															children: count
														})]
													}),
													isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/admin",
														onClick: () => setMobileMenuOpen(false),
														className: "eyebrow text-xs text-primary pt-2 font-medium",
														children: "Store Admin Panel"
													})
												]
											})
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-6 border-t text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "eyebrow text-[10px]",
											children: "Client Concierge"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1",
											children: "Free returns within 30 days & insured delivery worldwide."
										})]
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden md:flex gap-8 eyebrow",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									className: "hover:text-primary transition-colors",
									children: "Jewelry"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									search: { category: "rings" },
									className: "hover:text-primary transition-colors",
									children: "Rings"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/maison",
									className: "hover:text-primary transition-colors",
									children: "Maison"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-display text-2xl sm:text-3xl tracking-[0.25em] sm:tracking-[0.35em] text-center",
							children: "ALNORA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-4 sm:gap-6 eyebrow",
							children: [
								isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin",
									className: "hidden md:inline hover:text-primary transition-colors",
									children: "Admin"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: user ? "/account" : "/auth",
									className: "flex items-center gap-2 hover:text-primary transition-colors p-1",
									"aria-label": user ? "My account" : "Sign in",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
										className: "h-4 w-4",
										strokeWidth: 1.25
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden md:inline",
										children: user ? "Account" : "Sign in"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/cart",
									className: "flex items-center gap-1.5 sm:gap-2 hover:text-primary transition-colors p-1",
									"aria-label": "Shopping bag",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
										className: "h-4 w-4",
										strokeWidth: 1.25
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs sm:text-sm",
										children: [
											"(",
											count,
											")"
										]
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t mt-16 sm:mt-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl tracking-[0.3em]",
							children: "ALNORA"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground leading-relaxed",
							children: "Fine jewelry and accessories, crafted to be treasured."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mb-4",
							children: "Shop"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "text-muted-foreground hover:text-foreground transition-colors",
								children: "All jewelry"
							}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								search: { category: c.id },
								className: "text-muted-foreground hover:text-foreground transition-colors",
								children: c.label
							}, c.id))]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mb-4",
							children: "Maison"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/maison",
									className: "text-muted-foreground hover:text-foreground transition-colors",
									children: "Our story"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "18K Ethical Gold"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "Certified Stones"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mb-4",
							children: "Client care"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2.5 text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Free returns within 30 days" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Complimentary gift packaging" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Certificate of authenticity" })
							]
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border/40 py-6 px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center eyebrow text-[10px] sm:text-xs text-muted-foreground",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" ALNORA. All rights reserved."
						]
					})
				})]
			})
		]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "ALNORA — Fine Jewelry" },
			{
				name: "description",
				content: "ALNORA fine jewelry and accessories."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Jost:wght@300;400&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] }) })
	});
}
var $$splitComponentImporter$6 = () => import("./routes-jCoWc0IO.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "ALNORA — Fine Jewelry & Accessories" },
		{
			name: "description",
			content: "Discover ALNORA's fine jewelry: diamond rings, gold bracelets and emerald necklaces."
		},
		{
			property: "og:title",
			content: "ALNORA — Fine Jewelry & Accessories"
		},
		{
			property: "og:description",
			content: "Discover ALNORA's fine jewelry: diamond rings, gold bracelets and emerald necklaces."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./route-Di7iQBCH.mjs");
var Route$5 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async ({ location }) => {
		const { data } = await supabase.auth.getUser();
		if (!data.user) throw redirect({
			to: "/auth",
			search: { redirect: location.href }
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./cart-ddzl1LcS.mjs");
var Route$4 = createFileRoute("/cart")({
	head: () => ({ meta: [
		{ title: "Your Bag — ALNORA" },
		{
			name: "description",
			content: "Review the ALNORA pieces in your shopping bag."
		},
		{
			property: "og:title",
			content: "Your Bag — ALNORA"
		},
		{
			property: "og:description",
			content: "Review the ALNORA pieces in your shopping bag."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./maison--vXBBF2I.mjs");
var Route$3 = createFileRoute("/maison")({
	head: () => ({ meta: [
		{ title: "The Maison — ALNORA" },
		{
			name: "description",
			content: "The story and craftsmanship behind ALNORA fine jewelry."
		},
		{
			property: "og:title",
			content: "The Maison — ALNORA"
		},
		{
			property: "og:description",
			content: "The story and craftsmanship behind ALNORA fine jewelry."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./reset-password-CHyujfFH.mjs");
var Route$2 = createFileRoute("/reset-password")({
	head: () => ({ meta: [
		{ title: "Choose a new password — ALNORA" },
		{
			name: "description",
			content: "Set a new password for your ALNORA account."
		},
		{
			property: "og:title",
			content: "Choose a new password — ALNORA"
		},
		{
			property: "og:description",
			content: "Set a new password for your ALNORA account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./account-CpH-W4gO.mjs");
var Route$1 = createFileRoute("/_authenticated/account")({
	head: () => ({ meta: [
		{ title: "My Account — ALNORA" },
		{
			name: "description",
			content: "Manage your ALNORA profile, shipping address and orders."
		},
		{
			property: "og:title",
			content: "My Account — ALNORA"
		},
		{
			property: "og:description",
			content: "Manage your ALNORA profile and orders."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin-dCOSB1L4.mjs");
var Route = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [
		{ title: "Store Admin — ALNORA" },
		{
			name: "description",
			content: "Manage ALNORA products and orders."
		},
		{
			property: "og:title",
			content: "Store Admin — ALNORA"
		},
		{
			property: "og:description",
			content: "Manage ALNORA products and orders."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$7
});
var AuthenticatedRouteRoute = Route$5.update({
	id: "/_authenticated",
	getParentRoute: () => Route$7
});
var AuthRoute = Route$8.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$7
});
var CartRoute = Route$4.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$7
});
var MaisonRoute = Route$3.update({
	id: "/maison",
	path: "/maison",
	getParentRoute: () => Route$7
});
var ResetPasswordRoute = Route$2.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$7
});
var ShopRoute = Route$10.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$7
});
var AuthenticatedAccountRoute = Route$1.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminRoute = Route.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var ProductSlugRoute = Route$9.update({
	id: "/product/$slug",
	path: "/product/$slug",
	getParentRoute: () => Route$7
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAccountRoute,
	AuthenticatedAdminRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	CartRoute,
	MaisonRoute,
	ResetPasswordRoute,
	ShopRoute,
	ProductSlugRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
