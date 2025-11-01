-- Add slug field to exhibitors table with unique constraint
ALTER TABLE public.exhibitors 
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_exhibitors_slug ON public.exhibitors(slug);

-- Add a function to generate slug from brand_name
CREATE OR REPLACE FUNCTION public.generate_slug(text_input TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(trim(text_input), '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$;