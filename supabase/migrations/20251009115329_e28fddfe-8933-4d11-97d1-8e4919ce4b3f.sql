-- Add comprehensive fields to exhibitors table
ALTER TABLE public.exhibitors
ADD COLUMN IF NOT EXISTS tagline TEXT,
ADD COLUMN IF NOT EXISTS founded_year INTEGER,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'India',
ADD COLUMN IF NOT EXISTS owner_name TEXT,
ADD COLUMN IF NOT EXISTS owner_title TEXT,
ADD COLUMN IF NOT EXISTS owner_bio TEXT,
ADD COLUMN IF NOT EXISTS owner_photo_url TEXT,
ADD COLUMN IF NOT EXISTS team_info TEXT,
ADD COLUMN IF NOT EXISTS products_services TEXT,
ADD COLUMN IF NOT EXISTS facebook_url TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS instagram_url TEXT,
ADD COLUMN IF NOT EXISTS twitter_url TEXT,
ADD COLUMN IF NOT EXISTS youtube_url TEXT,
ADD COLUMN IF NOT EXISTS gallery_images TEXT[],
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS certifications TEXT[],
ADD COLUMN IF NOT EXISTS awards TEXT[],
ADD COLUMN IF NOT EXISTS unique_selling_points TEXT[];

-- Create exhibitor_enquiries table for lead generation
CREATE TABLE IF NOT EXISTS public.exhibitor_enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  exhibitor_id UUID NOT NULL REFERENCES public.exhibitors(id) ON DELETE CASCADE,
  visitor_name TEXT NOT NULL,
  visitor_email TEXT NOT NULL,
  visitor_phone TEXT,
  visitor_company TEXT,
  message TEXT NOT NULL,
  interested_in TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'new',
  notes TEXT
);

-- Enable Row Level Security
ALTER TABLE public.exhibitor_enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for exhibitor_enquiries
CREATE POLICY "Anyone can submit enquiries"
ON public.exhibitor_enquiries
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all enquiries"
ON public.exhibitor_enquiries
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage enquiries"
ON public.exhibitor_enquiries
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_exhibitor_enquiries_exhibitor_id ON public.exhibitor_enquiries(exhibitor_id);
CREATE INDEX IF NOT EXISTS idx_exhibitor_enquiries_created_at ON public.exhibitor_enquiries(created_at DESC);