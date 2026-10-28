import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Ck0AHjHn.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAuth } from "./auth-Cf9lKhpn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-Cz8O56mK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)(null);
var KEY = "alnora-cart-v2";
var readGuest = () => {
	try {
		return JSON.parse(localStorage.getItem(KEY) || "[]");
	} catch {
		return [];
	}
};
function CartProvider({ children }) {
	const { user, ready } = useAuth();
	const [lines, setLines] = (0, import_react.useState)([]);
	const uid = user?.id ?? null;
	const uidRef = (0, import_react.useRef)(uid);
	uidRef.current = uid;
	const reload = (0, import_react.useCallback)(async () => {
		if (!uidRef.current) {
			setLines(readGuest());
			return;
		}
		const { data } = await supabase.from("cart_items").select("product_id, quantity").order("created_at");
		setLines((data ?? []).map((r) => ({
			productId: r.product_id,
			qty: r.quantity
		})));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		(async () => {
			if (uid) {
				const guest = readGuest();
				if (guest.length) {
					const { data: existing } = await supabase.from("cart_items").select("product_id, quantity");
					const rows = guest.map((g) => ({
						user_id: uid,
						product_id: g.productId,
						quantity: g.qty + (existing?.find((e) => e.product_id === g.productId)?.quantity ?? 0)
					}));
					await supabase.from("cart_items").upsert(rows, { onConflict: "user_id,product_id" });
					localStorage.removeItem(KEY);
				}
			}
			await reload();
		})();
	}, [
		uid,
		ready,
		reload
	]);
	const persist = async (productId, qty) => {
		if (!uidRef.current) return;
		if (qty <= 0) await supabase.from("cart_items").delete().eq("product_id", productId);
		else await supabase.from("cart_items").upsert({
			user_id: uidRef.current,
			product_id: productId,
			quantity: qty
		}, { onConflict: "user_id,product_id" });
	};
	const update = (productId, fn) => {
		setLines((l) => {
			const cur = l.find((x) => x.productId === productId)?.qty ?? 0;
			const qty = fn(cur);
			const next = qty <= 0 ? l.filter((x) => x.productId !== productId) : cur ? l.map((x) => x.productId === productId ? {
				...x,
				qty
			} : x) : [...l, {
				productId,
				qty
			}];
			if (!uidRef.current) localStorage.setItem(KEY, JSON.stringify(next));
			persist(productId, qty);
			return next;
		});
	};
	const value = {
		lines,
		add: (id) => update(id, (q) => q + 1),
		remove: (id) => update(id, () => 0),
		setQty: (id, qty) => update(id, () => qty),
		reload,
		count: lines.reduce((s, x) => s + x.qty, 0)
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useCart() {
	const c = (0, import_react.useContext)(Ctx);
	if (!c) throw new Error("useCart must be used within CartProvider");
	return c;
}
//#endregion
export { useCart as n, CartProvider as t };
