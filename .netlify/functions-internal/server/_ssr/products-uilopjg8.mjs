import { t as supabase } from "./client-Ck0AHjHn.mjs";
import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-uilopjg8.js
var ring_default = "/assets/ring-GfLbXqJp.jpg";
var bracelet_default = "/assets/bracelet-CsQphhaA.jpg";
var necklace_default = "/assets/necklace-DmDayblR.jpg";
var assets = {
	ring: ring_default,
	bracelet: bracelet_default,
	necklace: necklace_default
};
var categoryAsset = {
	rings: ring_default,
	bracelets: bracelet_default,
	necklaces: necklace_default
};
var productImage = (p) => {
	if (p.image_url.startsWith("asset:")) return assets[p.image_url.slice(6)] ?? categoryAsset[p.category];
	return p.image_url || categoryAsset[p.category];
};
var categories = [
	{
		id: "rings",
		label: "Rings",
		image: ring_default
	},
	{
		id: "bracelets",
		label: "Bracelets",
		image: bracelet_default
	},
	{
		id: "necklaces",
		label: "Necklaces",
		image: necklace_default
	}
];
var toProduct = (r) => ({
	...r,
	price: Number(r["price"])
});
var productsQuery = queryOptions({
	queryKey: ["products"],
	queryFn: async () => {
		const { data, error } = await supabase.from("products").select("*").order("created_at");
		if (error) throw error;
		return (data ?? []).map(toProduct);
	}
});
var productQuery = (slug) => queryOptions({
	queryKey: ["product", slug],
	queryFn: async () => {
		const { data, error } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
		if (error) throw error;
		return data ? toProduct(data) : null;
	}
});
var formatPrice = (n) => new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0
}).format(n);
//#endregion
export { productsQuery as a, productQuery as i, formatPrice as n, productImage as r, categories as t };
