CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  address_line text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  postal_code text NOT NULL DEFAULT '',
  country text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name) VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  collection text NOT NULL DEFAULT '',
  category text NOT NULL CHECK (category IN ('rings','bracelets','necklaces')),
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  image_url text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  material text NOT NULL DEFAULT '',
  stock integer NOT NULL DEFAULT 10 CHECK (stock >= 0),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active products" ON public.products FOR SELECT TO anon, authenticated USING (is_active OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update products" ON public.products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete products" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.products (slug, name, collection, category, price, image_url, material, description) VALUES
('solstice-solitaire','Solstice Solitaire Ring','Solstice','rings',4800,'asset:ring','18K yellow gold, 1.2ct diamond','A single brilliant diamond held aloft by four delicate claws — the purest expression of light.'),
('constellation-bangle','Constellation Bangle','Constellation','bracelets',3650,'asset:bracelet','18K yellow gold, diamonds','Seven bezel-set diamonds orbit a polished gold band, inspired by the night sky.'),
('verdant-pendant','Verdant Emerald Pendant','Verdant','necklaces',5200,'asset:necklace','18K yellow gold, emerald, diamonds','A pear-cut emerald crowned by a diamond leaf, suspended on a fine gold chain.'),
('solstice-band','Solstice Eternity Band','Solstice','rings',2900,'asset:ring','18K yellow gold, diamonds','A refined band that catches light from every angle.'),
('constellation-cuff','Constellation Cuff','Constellation','bracelets',4100,'asset:bracelet','18K yellow gold','A sculpted cuff with a hidden clasp and timeless silhouette.'),
('verdant-drop','Verdant Drop Necklace','Verdant','necklaces',6800,'asset:necklace','18K yellow gold, emerald','An heirloom piece, crafted to be passed from one generation to the next.');

CREATE TABLE public.cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity integer NOT NULL CHECK (quantity > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cart_items TO authenticated;
GRANT ALL ON public.cart_items TO service_role;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own cart all" ON public.cart_items FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','shipped','delivered','cancelled')),
  total numeric(10,2) NOT NULL,
  full_name text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  address_line text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  postal_code text NOT NULL DEFAULT '',
  country text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own or admin read orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update orders" ON public.orders FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  unit_price numeric(10,2) NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0)
);
GRANT SELECT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read items of visible orders" ON public.order_items FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR public.has_role(auth.uid(), 'admin')))
);

CREATE OR REPLACE FUNCTION public.place_order()
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _uid uuid := auth.uid();
  _order uuid;
  _total numeric(10,2);
  _p public.profiles;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'Not signed in'; END IF;
  IF NOT EXISTS (SELECT 1 FROM cart_items WHERE user_id = _uid) THEN RAISE EXCEPTION 'Your bag is empty'; END IF;
  IF EXISTS (SELECT 1 FROM cart_items c JOIN products p ON p.id = c.product_id WHERE c.user_id = _uid AND (NOT p.is_active OR p.stock < c.quantity)) THEN
    RAISE EXCEPTION 'Some pieces are no longer available in that quantity';
  END IF;
  SELECT * INTO _p FROM profiles WHERE id = _uid;
  SELECT SUM(p.price * c.quantity) INTO _total FROM cart_items c JOIN products p ON p.id = c.product_id WHERE c.user_id = _uid;
  INSERT INTO orders (user_id, total, full_name, phone, address_line, city, postal_code, country)
  VALUES (_uid, _total, COALESCE(_p.full_name,''), COALESCE(_p.phone,''), COALESCE(_p.address_line,''), COALESCE(_p.city,''), COALESCE(_p.postal_code,''), COALESCE(_p.country,''))
  RETURNING id INTO _order;
  INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity)
  SELECT _order, p.id, p.name, p.price, c.quantity FROM cart_items c JOIN products p ON p.id = c.product_id WHERE c.user_id = _uid;
  UPDATE products p SET stock = p.stock - c.quantity FROM cart_items c WHERE c.product_id = p.id AND c.user_id = _uid;
  DELETE FROM cart_items WHERE user_id = _uid;
  RETURN _order;
END $$;
REVOKE EXECUTE ON FUNCTION public.place_order() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.place_order() TO authenticated;