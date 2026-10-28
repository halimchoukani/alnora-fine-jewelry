import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Ck0AHjHn.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-CHyujfFH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPassword() {
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		const { error } = await supabase.auth.updateUser({ password: String(new FormData(e.currentTarget).get("password")) });
		setBusy(false);
		if (error) toast.error(error.message);
		else {
			toast.success("Password updated");
			navigate({ to: "/account" });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 sm:px-6 py-12 sm:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl sm:text-4xl md:text-5xl text-center",
			children: "New password"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "mt-8 sm:mt-12 space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				name: "password",
				type: "password",
				required: true,
				minLength: 6,
				placeholder: "New password",
				className: "w-full border bg-background px-4 py-3 text-base sm:text-sm outline-none focus:border-primary min-h-[44px]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				disabled: busy,
				className: "btn-luxe w-full",
				children: "Save password"
			})]
		})]
	});
}
//#endregion
export { ResetPassword as component };
