# Super Admin Setup Guide

This guide explains how to set up and use the Super Admin role in the MIA Expo 2026 application.

## Overview

The Super Admin role has been implemented with the following characteristics:

- **Hard-locked email**: `harab.business@gmail.com`
- **Complete control**: Can manage all users, roles, and application modules
- **Exclusive user management**: Only Super Admin can manage, approve, remove, delete, update, assign, or reassign users
- **Protected**: Super Admin account cannot be deleted or modified by anyone else

## Initial Setup

### Step 1: Apply Database Migration

Run the migration to add the super_admin role to your database:

```bash
# If using Supabase CLI
supabase db push

# Or manually run the migration file
# supabase/migrations/20251009000000_add_super_admin_role.sql
```

### Step 2: Create Super Admin Account

1. Go to your application's sign-up page at `/auth`
2. Create an account using the email: `harab.business@gmail.com`
3. Use a strong password and complete the sign-up process

### Step 3: Assign Super Admin Role

After creating the account, you need to manually assign the super_admin role. You can do this in two ways:

#### Option A: Using Supabase SQL Editor

1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Run the following query:

```sql
SELECT public.assign_super_admin_to_email('harab.business@gmail.com');
```

#### Option B: Using Supabase Client

Create a temporary setup script or use the browser console:

```javascript
import { supabase } from './src/integrations/supabase/client';

async function setupSuperAdmin() {
  const { error } = await supabase.rpc('assign_super_admin_to_email', {
    _email: 'harab.business@gmail.com'
  });
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Super admin role assigned successfully!');
  }
}

setupSuperAdmin();
```

### Step 4: Verify Setup

1. Sign in with the super admin account
2. You should see a "Super Admin" badge in the admin portal header
3. A "Users" tab should appear as the first tab in the admin interface
4. You can now manage all users and their roles

## Features

### Super Admin Capabilities

1. **User Management**: 
   - View all registered users
   - Assign/modify user roles (admin, user, or no role)
   - Delete user accounts (except super admin and self)
   - View user details and creation dates

2. **Full Application Access**:
   - All admin permissions
   - Access to all modules: Exhibitors, Sponsors, Donors, Visitors, Speakers, Team, Testimonials, Programme, Floor Plan, Media Bites

3. **Protected Status**:
   - Cannot be deleted by anyone
   - Cannot have role modified by regular admins
   - Email is hard-locked and cannot be changed

### Role Hierarchy

```
Super Admin (harab.business@gmail.com)
  ├── Can manage all users
  ├── Can assign/remove admin roles
  ├── Has all admin permissions
  └── Cannot be modified or deleted
  
Admin
  ├── Can manage all application modules
  ├── Cannot manage users
  └── Can view all data
  
User
  └── Limited permissions (view-only for public content)
  
No Role
  └── Can only view public pages
```

## Security Features

### Database-Level Protection

1. **RLS Policies**: Row-Level Security ensures only super admin can manage user roles
2. **Triggers**: Database triggers prevent unauthorized role modifications
3. **Functions**: Security definer functions validate permissions

### Application-Level Protection

1. **Hard-locked Email**: Super admin email is constant in code (`SUPER_ADMIN_EMAIL`)
2. **UI Guards**: User management tab only visible to super admin
3. **Role Checks**: All user management operations verify super admin status

## Managing Users

### Assigning Roles

1. Navigate to the "Users" tab in the admin portal
2. Find the user you want to modify
3. Use the dropdown to select a new role:
   - **Admin**: Full access to manage all modules except users
   - **User**: Limited access to view public content
   - **No Role**: No admin access

4. Click to confirm the role change

### Deleting Users

1. Navigate to the "Users" tab
2. Click the trash icon next to the user you want to delete
3. Confirm the deletion in the dialog
4. Note: You cannot delete:
   - The super admin account
   - Your own account

## Best Practices

1. **Keep Super Admin Credentials Secure**: This account has complete control
2. **Limit Admin Roles**: Only assign admin roles to trusted users
3. **Regular Audits**: Periodically review user list and roles
4. **Strong Password**: Use a very strong password for the super admin account
5. **Backup Access**: Consider setting up 2FA for the super admin account via Supabase Auth

## Troubleshooting

### Super Admin Badge Not Showing

1. Sign out and sign back in
2. Verify the role was assigned correctly:
   ```sql
   SELECT * FROM user_roles WHERE user_id = (
     SELECT id FROM auth.users WHERE email = 'harab.business@gmail.com'
   );
   ```

### Cannot Manage Users

1. Ensure you're signed in with the exact email: `harab.business@gmail.com`
2. Check that the super_admin role is properly assigned
3. Clear browser cache and sign in again

### Migration Errors

If the migration fails:
1. Check if the enum value already exists
2. Verify you have proper database permissions
3. Run migrations in order

## Database Schema Changes

### New Enum Value
```sql
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'super_admin';
```

### New Functions
- `is_super_admin(_user_id UUID)`: Check if user is super admin
- `is_admin_or_super(_user_id UUID)`: Check if user has admin access
- `assign_super_admin_to_email(_email TEXT)`: Assign super admin role
- `check_super_admin_for_role_changes()`: Trigger to enforce permissions
- `protect_super_admin()`: Trigger to protect super admin role

### Updated RLS Policies
- User roles can only be managed by super admin
- Users can view their own roles
- Super admin has full access to all profiles

## Support

For issues or questions:
1. Check the migration logs
2. Review Supabase Auth logs
3. Verify RLS policies are correctly applied
4. Check browser console for errors

## File Structure

```
supabase/migrations/
  └── 20251009000000_add_super_admin_role.sql

src/
  ├── lib/
  │   └── auth-utils.ts (Super admin utility functions)
  ├── components/admin/
  │   └── UsersManager.tsx (User management interface)
  ├── pages/
  │   ├── Admin.tsx (Updated with user management tab)
  │   └── Auth.tsx (Updated sign-up messaging)
  └── integrations/supabase/
      └── types.ts (Updated with super_admin type)
```

## Migration Rollback (Emergency Only)

If you need to rollback the super admin feature:

⚠️ **WARNING**: This will remove all super admin functionality

```sql
-- Remove triggers
DROP TRIGGER IF EXISTS protect_super_admin_role ON public.user_roles;
DROP TRIGGER IF EXISTS enforce_super_admin_role_management ON public.user_roles;

-- Remove functions
DROP FUNCTION IF EXISTS public.protect_super_admin();
DROP FUNCTION IF EXISTS public.check_super_admin_for_role_changes();
DROP FUNCTION IF EXISTS public.assign_super_admin_to_email(_email TEXT);
DROP FUNCTION IF EXISTS public.is_admin_or_super(_user_id UUID);
DROP FUNCTION IF EXISTS public.is_super_admin(_user_id UUID);

-- Note: Cannot remove enum value once added, but can reassign roles
UPDATE user_roles SET role = 'admin' WHERE role = 'super_admin';
```

