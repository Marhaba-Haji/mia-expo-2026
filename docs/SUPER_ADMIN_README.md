# Super Admin Role - Technical Documentation

## Overview

The MIA Expo 2026 application now includes a Super Admin role with complete control over the entire application, including exclusive user management capabilities.

## Key Features

### 1. Hard-Locked Super Admin Account
- **Email**: `harab.business@gmail.com`
- This email is hard-coded and cannot be changed
- Account cannot be deleted or modified by anyone (including other admins)

### 2. Exclusive User Management
- **Only** the super admin can manage users
- Regular admins **cannot**:
  - View other users
  - Assign/remove roles
  - Delete user accounts
  - Modify user permissions
  - Approve/reject users

### 3. Complete Application Control
- Super admin has all permissions of regular admins PLUS user management
- Access to all modules: Exhibitors, Sponsors, Donors, Visitors, Speakers, Team, Testimonials, Programme, Floor Plan, Media Bites

## Architecture

### Database Layer

#### Enum Type
```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'user', 'super_admin');
```

#### Key Tables
1. **user_roles**: Links users to their roles
   - `id`: UUID primary key
   - `user_id`: References auth.users
   - `role`: Enum (admin, user, super_admin)
   - `created_at`: Timestamp

2. **profiles**: User profile information
   - `id`: UUID (references auth.users)
   - `email`: User's email
   - `full_name`: Optional full name
   - `created_at`: Timestamp

#### Security Functions

1. **is_super_admin(_user_id UUID)**
   - Returns: `BOOLEAN`
   - Checks if a user has super_admin role
   - Security definer function

2. **is_admin_or_super(_user_id UUID)**
   - Returns: `BOOLEAN`
   - Checks if user has admin OR super_admin role
   - Used for general admin access

3. **assign_super_admin_to_email(_email TEXT)**
   - Returns: `VOID`
   - Safely assigns super admin role to an email
   - Removes any existing roles first

4. **check_super_admin_for_role_changes()**
   - Trigger function
   - Prevents non-super-admins from modifying user roles
   - Executed on INSERT/UPDATE/DELETE of user_roles

5. **protect_super_admin()**
   - Trigger function
   - Prevents modification/deletion of super_admin roles
   - Ensures super admin cannot be downgraded

#### Row Level Security (RLS) Policies

**user_roles table:**
```sql
-- Only super admins can manage roles
CREATE POLICY "Super admins can manage all roles" ON public.user_roles 
  FOR ALL 
  USING (public.has_role(auth.uid(), 'super_admin'));

-- Users can view their own roles
CREATE POLICY "Users can view their own roles" ON public.user_roles 
  FOR SELECT 
  USING (auth.uid() = user_id);
```

**profiles table:**
```sql
-- Users can view own profile
CREATE POLICY "Users can view their own profile" ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- Users can update own profile
CREATE POLICY "Users can update their own profile" ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Admins and super admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles 
  FOR SELECT 
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'super_admin')
  );

-- Only super admins can update/delete profiles
CREATE POLICY "Super admins can update all profiles" ON public.profiles 
  FOR UPDATE 
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can delete profiles" ON public.profiles 
  FOR DELETE 
  USING (public.has_role(auth.uid(), 'super_admin'));
```

### Application Layer

#### Utility Functions (`src/lib/auth-utils.ts`)

```typescript
// Hard-locked super admin email constant
export const SUPER_ADMIN_EMAIL = 'harab.business@gmail.com';

// Check if user is super admin
export async function isSuperAdmin(userId: string): Promise<boolean>

// Check if user is admin or super admin
export async function isAdminOrSuper(userId: string): Promise<boolean>

// Check if user has specific role
export async function hasRole(
  userId: string, 
  role: 'admin' | 'user' | 'super_admin'
): Promise<boolean>

// Get all roles for a user
export async function getUserRoles(userId: string): Promise<string[]>

// Check if email matches super admin email
export function isSuperAdminEmail(email: string | undefined): boolean

// Get user profile with email
export async function getUserProfile(userId: string)

// Assign super admin role (setup only)
export async function assignSuperAdminRole(email: string)
```

#### Components

**UsersManager Component** (`src/components/admin/UsersManager.tsx`)
- User management interface
- Only visible to super admin
- Features:
  - List all users with emails and roles
  - Assign/modify user roles via dropdown
  - Delete users (with restrictions)
  - Protected operations:
    - Cannot modify super admin
    - Cannot delete super admin
    - Cannot delete self
  - Visual indicators:
    - Shield icon for super admin
    - Color-coded role badges

**Updated Admin Portal** (`src/pages/Admin.tsx`)
- Checks for super admin status on load
- Shows "Super Admin" badge in header
- Adds "Users" tab (first tab) for super admins only
- Regular admins don't see user management tab

**Updated Auth Page** (`src/pages/Auth.tsx`)
- Informs new users that roles must be assigned by super admin
- Prevents automatic role assignment on sign-up
- Clear messaging about waiting for role assignment

## Security Model

### Multi-Layer Protection

1. **Database Level**
   - RLS policies prevent unauthorized access
   - Triggers enforce role management rules
   - Security definer functions with explicit search path

2. **Application Level**
   - UI guards hide user management from non-super-admins
   - API calls validate permissions before operations
   - Hard-coded email constant for super admin

3. **Business Logic Level**
   - Cannot delete super admin account
   - Cannot modify super admin role
   - Cannot delete own account
   - Role changes logged and validated

### Attack Prevention

| Attack Vector | Protection |
|--------------|------------|
| Direct database access | RLS policies block non-super-admins |
| API manipulation | Server-side validation with RPC functions |
| UI tampering | Client-side checks + server validation |
| Role escalation | Triggers prevent unauthorized role changes |
| Super admin deletion | Protected by trigger + application logic |
| Self-deletion | Application prevents deleting own account |

## Setup Process

### Step 1: Apply Migration
```bash
supabase db push
```

### Step 2: Create Account
1. Navigate to `/auth`
2. Sign up with `harab.business@gmail.com`

### Step 3: Assign Role
Run in Supabase SQL Editor:
```sql
SELECT public.assign_super_admin_to_email('harab.business@gmail.com');
```

Or use the setup script:
```bash
# scripts/setup-super-admin.sql
```

### Step 4: Verify
Run verification script:
```bash
# scripts/verify-super-admin.sql
```

## Usage Guide

### For Super Admin

#### Managing Users
1. Sign in to admin portal
2. Click "Users" tab (first tab)
3. View all registered users
4. Assign roles using dropdown:
   - **Super Admin**: Complete control (protected, cannot reassign)
   - **Admin**: Manage all modules except users
   - **User**: Limited access
   - **No Role**: Public access only
5. Delete users with trash icon (except super admin and self)

#### Best Practices
- Regularly audit user list
- Limit admin role assignments
- Keep super admin credentials very secure
- Document all role changes
- Use strong passwords

### For Regular Admins

- No access to user management
- Full access to all other modules
- Cannot view or modify user roles
- Focus on content and data management

### For New Users

- Sign up creates account with no role
- Wait for super admin to assign role
- Cannot access admin portal until role assigned
- Email notification when role assigned (if configured)

## Troubleshooting

### Issue: Super Admin Badge Not Showing
**Solution:**
1. Sign out and back in
2. Clear browser cache
3. Check role assignment:
```sql
SELECT * FROM user_roles 
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'harab.business@gmail.com');
```

### Issue: Cannot See Users Tab
**Cause:** Not signed in as super admin

**Solution:**
1. Verify email is exactly `harab.business@gmail.com`
2. Check role assignment
3. Sign out and back in

### Issue: Role Assignment Fails
**Cause:** Insufficient permissions or database error

**Solution:**
1. Check Supabase logs
2. Verify RLS policies are active
3. Ensure migration ran successfully
4. Try running verification script

### Issue: Migration Fails
**Cause:** Existing data or schema conflicts

**Solution:**
1. Check if enum value already exists
2. Verify no conflicting policies
3. Review migration order
4. Check for previous failed migrations

## Testing Checklist

- [ ] Super admin account created
- [ ] Super admin role assigned
- [ ] Super admin badge shows in UI
- [ ] Users tab visible to super admin
- [ ] Users tab hidden from regular admins
- [ ] Can view all users
- [ ] Can assign admin role
- [ ] Can assign user role
- [ ] Can remove roles
- [ ] Cannot modify super admin role
- [ ] Cannot delete super admin account
- [ ] Cannot delete own account
- [ ] Regular admin cannot see users tab
- [ ] New sign-ups have no role by default
- [ ] RLS policies working correctly

## API Reference

### RPC Functions

#### is_super_admin
```typescript
await supabase.rpc('is_super_admin', { _user_id: userId })
// Returns: boolean
```

#### is_admin_or_super
```typescript
await supabase.rpc('is_admin_or_super', { _user_id: userId })
// Returns: boolean
```

#### has_role
```typescript
await supabase.rpc('has_role', { 
  _user_id: userId, 
  _role: 'admin' | 'user' | 'super_admin' 
})
// Returns: boolean
```

#### assign_super_admin_to_email
```typescript
await supabase.rpc('assign_super_admin_to_email', { 
  _email: 'harab.business@gmail.com' 
})
// Returns: void
```

### Table Operations

#### Get User Roles
```typescript
const { data, error } = await supabase
  .from('user_roles')
  .select('role')
  .eq('user_id', userId);
```

#### Get All Users (Super Admin Only)
```typescript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .order('created_at', { ascending: false });
```

## File Structure

```
mia-expo-2026/
├── supabase/
│   └── migrations/
│       └── 20251009000000_add_super_admin_role.sql
├── scripts/
│   ├── setup-super-admin.sql
│   └── verify-super-admin.sql
├── src/
│   ├── lib/
│   │   └── auth-utils.ts
│   ├── components/
│   │   └── admin/
│   │       └── UsersManager.tsx
│   ├── pages/
│   │   ├── Admin.tsx
│   │   └── Auth.tsx
│   └── integrations/
│       └── supabase/
│           ├── types.ts (updated)
│           └── client.ts
├── docs/
│   └── SUPER_ADMIN_README.md
└── SUPER_ADMIN_SETUP.md
```

## Security Considerations

### DO's
✅ Keep super admin password very secure  
✅ Enable 2FA for super admin account  
✅ Regular security audits  
✅ Monitor user role changes  
✅ Backup database regularly  
✅ Review access logs  

### DON'Ts
❌ Share super admin credentials  
❌ Assign super admin to multiple accounts  
❌ Disable RLS policies  
❌ Modify super admin email in code  
❌ Skip migration testing  
❌ Grant admin roles carelessly  

## Future Enhancements

Potential improvements:
- [ ] Audit log for role changes
- [ ] Email notifications on role assignment
- [ ] 2FA requirement for super admin
- [ ] Role assignment approval workflow
- [ ] Bulk user operations
- [ ] User activity tracking
- [ ] Password policy enforcement
- [ ] Session management
- [ ] IP whitelisting for super admin

## Support & Maintenance

For issues or questions:
1. Check this documentation
2. Review migration logs
3. Check Supabase dashboard
4. Verify RLS policies
5. Test with verification script
6. Review browser console

## License & Ownership

This super admin system is part of the MIA Expo 2026 application and is proprietary to the Muslim Industrialists Association.


