import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Ck0AHjHn.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Cf9lKhpn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)({
	user: null,
	isAdmin: false,
	ready: false
});
function AuthProvider({ children }) {
	const [state, setState] = (0, import_react.useState)({
		user: null,
		isAdmin: false,
		ready: false
	});
	(0, import_react.useEffect)(() => {
		const load = async (user) => {
			let isAdmin = false;
			if (user) {
				const { data } = await supabase.rpc("has_role", {
					_user_id: user.id,
					_role: "admin"
				});
				isAdmin = !!data;
			}
			setState({
				user,
				isAdmin,
				ready: true
			});
		};
		const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "TOKEN_REFRESHED") return;
			setTimeout(() => load(session?.user ?? null), 0);
		});
		supabase.auth.getSession().then(({ data }) => load(data.session?.user ?? null));
		return () => sub.subscription.unsubscribe();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: state,
		children
	});
}
var useAuth = () => (0, import_react.useContext)(Ctx);
//#endregion
export { useAuth as n, AuthProvider as t };
