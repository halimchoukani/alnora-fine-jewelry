<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Products, carts, orders and profiles live in Lovable Cloud tables accessed from the browser client under RLS; admin rights come from user_roles via has_role (first signup becomes admin).
- Checkout runs through the place_order() database function so prices, stock and cart clearing happen atomically on the server.
- Guest bags live in localStorage (src/lib/cart.tsx) and merge into the signed-in user's cart_items on sign-in.
