import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Ck0AHjHn.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAuth } from "./auth-Cf9lKhpn.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./auth-COm0ej5H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-RFUmv6Rm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var safePath = (p) => typeof p === "string" && p.startsWith("/") && !p.startsWith("//") ? p : "/account";
var field = "w-full border bg-background px-4 py-3 text-base sm:text-sm outline-none focus:border-primary min-h-[44px]";
function AuthPage() {
	const { redirect } = Route.useSearch();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (user) navigate({
			to: safePath(redirect),
			replace: true
		});
	}, [
		user,
		redirect,
		navigate
	]);
	const submit = async (e) => {
		e.preventDefault();
		const f = new FormData(e.currentTarget);
		const email = String(f.get("email"));
		const password = String(f.get("password") ?? "");
		setBusy(true);
		if (mode === "signin") {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) toast.error(error.message);
		} else if (mode === "signup") {
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: window.location.origin,
					data: { full_name: String(f.get("name")) }
				}
			});
			if (error) toast.error(error.message);
			else setSent("Check your email to confirm your account, then sign in.");
		} else {
			const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
			if (error) toast.error(error.message);
			else setSent("We've sent you a link to reset your password.");
		}
		setBusy(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 sm:px-6 py-12 sm:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl md:text-5xl text-center",
				children: mode === "signup" ? "Create account" : mode === "forgot" ? "Reset password" : "Sign in"
			}),
			sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 sm:mt-10 text-center text-muted-foreground leading-relaxed",
				children: sent
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-8 sm:mt-12 space-y-4",
				children: [
					mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "name",
						required: true,
						placeholder: "Full name",
						className: field
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "email",
						type: "email",
						required: true,
						placeholder: "Email",
						className: field
					}),
					mode !== "forgot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "password",
						type: "password",
						required: true,
						minLength: 6,
						placeholder: "Password",
						className: field
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: busy,
						className: "btn-luxe w-full mt-2",
						children: busy ? "Please wait…" : mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Sign in"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col items-center gap-3 eyebrow text-[10px] sm:text-xs text-muted-foreground",
				children: [
					mode !== "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setMode("signin");
							setSent(null);
						},
						className: "hover:text-foreground py-1 touch-manipulation transition-colors",
						children: "Already have an account? Sign in"
					}),
					mode !== "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setMode("signup");
							setSent(null);
						},
						className: "hover:text-foreground py-1 touch-manipulation transition-colors",
						children: "New to ALNORA? Create account"
					}),
					mode === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode("forgot"),
						className: "hover:text-foreground py-1 touch-manipulation transition-colors",
						children: "Forgot password?"
					})
				]
			})
		]
	});
}
//#endregion
export { AuthPage as component };
