-- Super Admin Verification Script
-- Run this to verify the super admin setup is correct

-- Check if super admin user exists
SELECT 
  'Super Admin Account' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM auth.users WHERE email = 'harab.business@gmail.com')
    THEN '✓ PASS'
    ELSE '✗ FAIL'
  END as status,
  CASE 
    WHEN EXISTS (SELECT 1 FROM auth.users WHERE email = 'harab.business@gmail.com')
    THEN 'Account exists'
    ELSE 'Account not found - please create it'
  END as message;

-- Check if super admin role is assigned
SELECT 
  'Super Admin Role' as check_type,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN auth.users u ON ur.user_id = u.id
      WHERE u.email = 'harab.business@gmail.com' AND ur.role = 'super_admin'
    )
    THEN '✓ PASS'
    ELSE '✗ FAIL'
  END as status,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN auth.users u ON ur.user_id = u.id
      WHERE u.email = 'harab.business@gmail.com' AND ur.role = 'super_admin'
    )
    THEN 'Super admin role is assigned'
    ELSE 'Super admin role not assigned - run setup script'
  END as message;

-- Check if RLS policies exist
SELECT 
  'RLS Policies' as check_type,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'user_roles' 
      AND policyname = 'Super admins can manage all roles'
    )
    THEN '✓ PASS'
    ELSE '✗ FAIL'
  END as status,
  'RLS policies for user management' as message;

-- Check if super admin functions exist
SELECT 
  'Database Functions' as check_type,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM pg_proc 
      WHERE proname IN ('is_super_admin', 'is_admin_or_super', 'assign_super_admin_to_email')
    )
    THEN '✓ PASS'
    ELSE '✗ FAIL'
  END as status,
  'Required functions for super admin' as message;

-- Display all users and their roles
SELECT 
  u.email,
  u.created_at as account_created,
  COALESCE(
    STRING_AGG(ur.role::text, ', '),
    'No roles assigned'
  ) as roles
FROM auth.users u
LEFT JOIN user_roles ur ON ur.user_id = u.id
GROUP BY u.id, u.email, u.created_at
ORDER BY u.created_at DESC;


