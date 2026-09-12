CREATE POLICY "Anyone can read product photos"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'product-photos');