-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Trigger function for creating profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Exhibitors table
CREATE TABLE public.exhibitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  booth_number TEXT,
  package_type TEXT,
  website TEXT,
  description TEXT,
  logo_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.exhibitors ENABLE ROW LEVEL SECURITY;

-- Sponsors table
CREATE TABLE public.sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  sponsorship_tier TEXT,
  logo_url TEXT,
  website TEXT,
  description TEXT,
  amount DECIMAL(10,2),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

-- Donors table
CREATE TABLE public.donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  amount DECIMAL(10,2),
  donation_type TEXT,
  message TEXT,
  anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;

-- Visitors table
CREATE TABLE public.visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  job_title TEXT,
  country TEXT,
  interests TEXT[],
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  checked_in BOOLEAN DEFAULT false,
  check_in_time TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Speakers table
CREATE TABLE public.speakers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  bio TEXT,
  photo_url TEXT,
  email TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  expertise TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.speakers ENABLE ROW LEVEL SECURITY;

-- Team members table
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  position TEXT,
  department TEXT,
  bio TEXT,
  photo_url TEXT,
  email TEXT,
  phone TEXT,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  author_title TEXT,
  author_company TEXT,
  content TEXT NOT NULL,
  photo_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT false,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Programme schedule table
CREATE TABLE public.programme_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  session_type TEXT,
  speaker_ids UUID[],
  track TEXT,
  capacity INTEGER,
  registration_required BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.programme_schedule ENABLE ROW LEVEL SECURITY;

-- Floor plan table
CREATE TABLE public.floor_plan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booth_number TEXT NOT NULL UNIQUE,
  exhibitor_id UUID REFERENCES public.exhibitors(id) ON DELETE SET NULL,
  position_x INTEGER,
  position_y INTEGER,
  width INTEGER,
  height INTEGER,
  status TEXT DEFAULT 'available',
  price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.floor_plan ENABLE ROW LEVEL SECURITY;

-- Media bites table
CREATE TABLE public.media_bites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  media_type TEXT,
  media_url TEXT,
  thumbnail_url TEXT,
  author TEXT,
  published_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  featured BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.media_bites ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admin full access, public read-only where appropriate

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Exhibitors policies
CREATE POLICY "Anyone can view exhibitors" ON public.exhibitors FOR SELECT USING (true);
CREATE POLICY "Admins can manage exhibitors" ON public.exhibitors FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Sponsors policies
CREATE POLICY "Anyone can view sponsors" ON public.sponsors FOR SELECT USING (true);
CREATE POLICY "Admins can manage sponsors" ON public.sponsors FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Donors policies
CREATE POLICY "Admins can view all donors" ON public.donors FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage donors" ON public.donors FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Visitors policies
CREATE POLICY "Admins can view visitors" ON public.visitors FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage visitors" ON public.visitors FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Speakers policies
CREATE POLICY "Anyone can view speakers" ON public.speakers FOR SELECT USING (true);
CREATE POLICY "Admins can manage speakers" ON public.speakers FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Team members policies
CREATE POLICY "Anyone can view team members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Admins can manage team members" ON public.team_members FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials policies
CREATE POLICY "Anyone can view approved testimonials" ON public.testimonials FOR SELECT USING (approved = true);
CREATE POLICY "Admins can view all testimonials" ON public.testimonials FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Programme schedule policies
CREATE POLICY "Anyone can view programme" ON public.programme_schedule FOR SELECT USING (true);
CREATE POLICY "Admins can manage programme" ON public.programme_schedule FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Floor plan policies
CREATE POLICY "Anyone can view floor plan" ON public.floor_plan FOR SELECT USING (true);
CREATE POLICY "Admins can manage floor plan" ON public.floor_plan FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Media bites policies
CREATE POLICY "Anyone can view media bites" ON public.media_bites FOR SELECT USING (true);
CREATE POLICY "Admins can manage media bites" ON public.media_bites FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Update timestamp triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_exhibitors_updated_at BEFORE UPDATE ON public.exhibitors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sponsors_updated_at BEFORE UPDATE ON public.sponsors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_speakers_updated_at BEFORE UPDATE ON public.speakers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_programme_schedule_updated_at BEFORE UPDATE ON public.programme_schedule FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_floor_plan_updated_at BEFORE UPDATE ON public.floor_plan FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_media_bites_updated_at BEFORE UPDATE ON public.media_bites FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();