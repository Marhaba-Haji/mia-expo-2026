-- Super Admin Setup Script
-- Run this script after creating the super admin account to assign the role
-- This should be run in the Supabase SQL Editor or via Supabase CLI

-- Step 1: Verify the super admin account exists
DO $$
DECLARE
  _user_exists BOOLEAN;
  _user_id UUID;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'harab.business@gmail.com'
  ) INTO _user_exists;
  
  IF NOT _user_exists THEN
    RAISE NOTICE 'ERROR: User with email harab.business@gmail.com does not exist.';
    RAISE NOTICE 'Please create this account first via the sign-up page.';
  ELSE
    SELECT id INTO _user_id FROM auth.users WHERE email = 'harab.business@gmail.com';
    RAISE NOTICE 'User found with ID: %', _user_id;
  END IF;
END $$;

-- Step 2: Assign super admin role
SELECT public.assign_super_admin_to_email('harab.business@gmail.com');

-- Step 3: Verify the assignment
DO $$
DECLARE
  _has_super_admin BOOLEAN;
  _user_id UUID;
BEGIN
  SELECT id INTO _user_id FROM auth.users WHERE email = 'harab.business@gmail.com';
  
  SELECT public.is_super_admin(_user_id) INTO _has_super_admin;
  
  IF _has_super_admin THEN
    RAISE NOTICE '✓ SUCCESS: Super admin role successfully assigned to harab.business@gmail.com';
  ELSE
    RAISE NOTICE '✗ ERROR: Failed to assign super admin role. Please check the logs.';
  END IF;
END $$;

-- Step 4: Display current user roles
SELECT 
  u.email,
  u.id as user_id,
  ur.role,
  ur.created_at as role_assigned_at
FROM auth.users u
LEFT JOIN user_roles ur ON ur.user_id = u.id
WHERE u.email = 'harab.business@gmail.com';

