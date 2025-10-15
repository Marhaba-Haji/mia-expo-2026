# Super Admin Quick Reference Card

## 🔐 Super Admin Email (Hard-Locked)
```
harab.business@gmail.com
```

## ⚡ Quick Setup (3 Steps)

### 1. Apply Migration
```bash
supabase db push
```

### 2. Create Account
- Go to `/auth`
- Sign up with: `harab.business@gmail.com`
- Use a strong password

### 3. Assign Role
Run in Supabase SQL Editor:
```sql
SELECT public.assign_super_admin_to_email('harab.business@gmail.com');
```

## ✅ Verify Setup
```sql
-- Run this in SQL Editor
SELECT * FROM user_roles 
WHERE user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'harab.business@gmail.com'
);

-- Should return: role = 'super_admin'
```

## 🎯 What Super Admin Can Do
- ✅ Manage all users (view, edit, delete)
- ✅ Assign/remove any roles
- ✅ Access all application modules
- ✅ View all user information
- ✅ Complete application control

## 🚫 What Super Admin Cannot Do
- ❌ Be deleted by anyone
- ❌ Have role modified by anyone
- ❌ Delete own account

## 🛡️ Protection Features
- **Hard-locked email**: Cannot be changed
- **RLS policies**: Database-level security
- **Triggers**: Enforce permissions
- **UI guards**: Restrict access in interface

## 📊 User Management

### Assign Role
1. Sign in as super admin
2. Click "Users" tab
3. Select user
4. Choose role from dropdown
5. Done!

### Delete User
1. Click trash icon
2. Confirm deletion
3. Cannot delete:
   - Super admin
   - Self

## 🔍 Troubleshooting

### Badge Not Showing?
```bash
# Sign out and back in
# Clear cache
```

### Cannot See Users Tab?
```bash
# Check you're using: harab.business@gmail.com
# Verify role in database
```

### Role Assignment Fails?
```bash
# Check Supabase logs
# Verify migration applied
# Run verification script
```

## 📁 Key Files

### Database
- `supabase/migrations/20251009000000_add_super_admin_role.sql`
- `scripts/setup-super-admin.sql`
- `scripts/verify-super-admin.sql`

### Application
- `src/lib/auth-utils.ts`
- `src/components/admin/UsersManager.tsx`
- `src/pages/Admin.tsx`

### Documentation
- `SUPER_ADMIN_SETUP.md` - Setup guide
- `docs/SUPER_ADMIN_README.md` - Technical docs
- `docs/SUPER_ADMIN_ARCHITECTURE.md` - Architecture
- `IMPLEMENTATION_SUMMARY.md` - Implementation details

## 🔧 SQL Commands

### Check Super Admin Status
```sql
SELECT public.is_super_admin(
  (SELECT id FROM auth.users WHERE email = 'harab.business@gmail.com')
);
```

### List All Users and Roles
```sql
SELECT 
  u.email,
  STRING_AGG(ur.role::text, ', ') as roles
FROM auth.users u
LEFT JOIN user_roles ur ON ur.user_id = u.id
GROUP BY u.email;
```

### Assign Role Manually
```sql
-- Delete existing roles
DELETE FROM user_roles WHERE user_id = 'USER_ID_HERE';

-- Insert new role
INSERT INTO user_roles (user_id, role)
VALUES ('USER_ID_HERE', 'admin');
```

## 🔒 Security Best Practices

1. **Strong Password**: Use 16+ characters
2. **Enable 2FA**: Set up in Supabase Auth
3. **Regular Audits**: Review users monthly
4. **Limit Admins**: Only assign when necessary
5. **Monitor Logs**: Check for suspicious activity
6. **Backup Database**: Regular backups

## 📞 Support

### Check First
1. This quick reference
2. `SUPER_ADMIN_SETUP.md`
3. Verification script output
4. Browser console errors

### Debug Steps
1. Check Supabase logs
2. Verify RLS policies active
3. Check migration applied
4. Test with verification script

## 📋 Role Comparison

| Feature | Super Admin | Admin | User |
|---------|-------------|-------|------|
| Manage Users | ✅ | ❌ | ❌ |
| Manage Exhibitors | ✅ | ✅ | ❌ |
| Manage Sponsors | ✅ | ✅ | ❌ |
| Manage Content | ✅ | ✅ | ❌ |
| View Public | ✅ | ✅ | ✅ |

## 🚀 Deployment

1. Push changes to repository
2. Apply migration: `supabase db push`
3. Create super admin account
4. Run setup script
5. Verify setup
6. Test functionality
7. Monitor logs

## 🎉 Success Indicators

- [ ] "Super Admin" badge visible
- [ ] "Users" tab appears first
- [ ] Can view all users
- [ ] Can assign roles
- [ ] Can delete users (except super admin)
- [ ] Regular admins don't see Users tab

---

**Version**: 1.0  
**Last Updated**: October 9, 2025  
**Super Admin Email**: harab.business@gmail.com



