CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.claim_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN
    RETURN false;
  END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RETURN public.has_role(uid, 'admin');
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (uid, 'admin')
  ON CONFLICT DO NOTHING;
  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_admin() FROM public;
GRANT EXECUTE ON FUNCTION public.claim_admin() TO authenticated;

CREATE TABLE public.product_overrides (
  slug text PRIMARY KEY,
  price numeric(10,2),
  old_price numeric(10,2),
  stock boolean,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_overrides TO authenticated;
GRANT ALL ON public.product_overrides TO service_role;
ALTER TABLE public.product_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage product overrides"
ON public.product_overrides FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER product_overrides_updated_at
BEFORE UPDATE ON public.product_overrides
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Admins view product photos"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'product-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins upload product photos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'product-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update product photos"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'product-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete product photos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'product-photos' AND public.has_role(auth.uid(), 'admin'));