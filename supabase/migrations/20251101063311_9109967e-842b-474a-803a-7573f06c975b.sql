-- Add missing fields to exhibitors table
ALTER TABLE public.exhibitors 
ADD COLUMN IF NOT EXISTS brand_name TEXT,
ADD COLUMN IF NOT EXISTS business_type TEXT,
ADD COLUMN IF NOT EXISTS catalog_url TEXT;