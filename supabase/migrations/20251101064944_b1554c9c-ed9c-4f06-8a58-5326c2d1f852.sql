-- Fix search_path for generate_slug function
CREATE OR REPLACE FUNCTION public.generate_slug(text_input TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(trim(text_input), '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$;