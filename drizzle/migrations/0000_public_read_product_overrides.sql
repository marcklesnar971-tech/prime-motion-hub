GRANT SELECT ON public.product_overrides TO anon;

CREATE POLICY "Public can read product overrides"
ON public.product_overrides
FOR SELECT
TO anon, authenticated
USING (true);