-- Add super_admin to app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'super_admin';

-- Drop existing RLS policies on user_roles table
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- Create new RLS policies that restrict user role management to super_admin only
CREATE POLICY "Super admins can manage all roles" ON public.user_roles 
  FOR ALL 
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Users can view their own roles" ON public.user_roles 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create a function to safely assign super admin role
CREATE OR REPLACE FUNCTION public.assign_super_admin_to_email(_email TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id UUID;
BEGIN
  -- Find user by email
  SELECT id INTO _user_id FROM auth.users WHERE email = _email;
  
  IF _user_id IS NOT NULL THEN
    -- Remove any existing roles for this user
    DELETE FROM public.user_roles WHERE user_id = _user_id;
    
    -- Assign super_admin role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_user_id, 'super_admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RAISE NOTICE 'Super admin role assigned to user: %', _email;
  ELSE
    RAISE NOTICE 'User with email % not found', _email;
  END IF;
END;
$$;

-- Update the has_role function to add super admin check
CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = 'super_admin'
  )
$$;

-- Create a trigger function to prevent non-super-admins from modifying user roles
CREATE OR REPLACE FUNCTION public.check_super_admin_for_role_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only super admins can manage roles (except during initial user creation via trigger)
  IF NOT public.is_super_admin(auth.uid()) AND auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'Only super administrators can manage user roles';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Add trigger to enforce super admin only role management
DROP TRIGGER IF EXISTS enforce_super_admin_role_management ON public.user_roles;
CREATE TRIGGER enforce_super_admin_role_management
  BEFORE INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.check_super_admin_for_role_changes();

-- Function to prevent users from deleting or modifying super admin
CREATE OR REPLACE FUNCTION public.protect_super_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If trying to delete or modify a super_admin role, ensure the current user is also a super admin
  IF (TG_OP = 'DELETE' AND OLD.role = 'super_admin') OR 
     (TG_OP = 'UPDATE' AND OLD.role = 'super_admin') THEN
    IF NOT public.is_super_admin(auth.uid()) THEN
      RAISE EXCEPTION 'Super admin roles cannot be modified or deleted except by another super admin';
    END IF;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_super_admin_role ON public.user_roles;
CREATE TRIGGER protect_super_admin_role
  BEFORE UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_super_admin();

-- Add RLS policies for profiles that allow super admin to manage all users
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

CREATE POLICY "Admins can view all profiles" ON public.profiles 
  FOR SELECT 
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'super_admin')
  );

CREATE POLICY "Super admins can update all profiles" ON public.profiles 
  FOR UPDATE 
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can delete profiles" ON public.profiles 
  FOR DELETE 
  USING (public.has_role(auth.uid(), 'super_admin'));

-- Update existing admin policies to also include super_admin
-- This ensures super_admin has all admin permissions plus more

-- Function to check if user is admin or super_admin
CREATE OR REPLACE FUNCTION public.is_admin_or_super(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'super_admin')
  )
$$;

-- Note: The assignment of super_admin to harab.business@gmail.com will need to be done
-- after the user account is created. This can be done manually or via a separate script.
-- For now, we'll add a comment on how to do it:

-- To assign super admin role to harab.business@gmail.com, run:
-- SELECT public.assign_super_admin_to_email('harab.business@gmail.com');


