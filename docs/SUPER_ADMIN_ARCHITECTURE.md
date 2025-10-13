# Super Admin System - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MIA EXPO 2026 APPLICATION                    │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                            USER ROLES                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌───────────────────────────────────────────────────────────┐     │
│  │  SUPER ADMIN (harab.business@gmail.com) 🔐                 │     │
│  │  ─────────────────────────────────────────────────        │     │
│  │  • Manage ALL users (create, update, delete roles)        │     │
│  │  • Access ALL modules                                      │     │
│  │  • Cannot be deleted or modified                           │     │
│  │  • Hard-locked email                                       │     │
│  └───────────────────────────────────────────────────────────┘     │
│                              │                                       │
│                              │ can manage                            │
│                              ▼                                       │
│  ┌───────────────────────────────────────────────────────────┐     │
│  │  ADMIN                                                      │     │
│  │  ─────                                                      │     │
│  │  • Manage exhibitors, sponsors, donors, visitors           │     │
│  │  • Manage speakers, team, testimonials                     │     │
│  │  • Manage programme, floor plan, media                     │     │
│  │  • CANNOT manage users or roles                            │     │
│  └───────────────────────────────────────────────────────────┘     │
│                              │                                       │
│                              │ can manage                            │
│                              ▼                                       │
│  ┌───────────────────────────────────────────────────────────┐     │
│  │  USER                                                       │     │
│  │  ────                                                       │     │
│  │  • View public content                                      │     │
│  │  • Limited permissions                                      │     │
│  └───────────────────────────────────────────────────────────┘     │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         SECURITY LAYERS                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Layer 1: APPLICATION LAYER                                          │
│  ┌───────────────────────────────────────────────────────────┐     │
│  │  • UI Guards (UsersManager only for super admin)           │     │
│  │  • Route Protection (Admin.tsx checks roles)               │     │
│  │  • Hard-coded SUPER_ADMIN_EMAIL constant                   │     │
│  │  • Client-side validation                                  │     │
│  └───────────────────────────────────────────────────────────┘     │
│                              │                                       │
│                              ▼                                       │
│  Layer 2: API LAYER                                                  │
│  ┌───────────────────────────────────────────────────────────┐     │
│  │  • auth-utils.ts functions                                 │     │
│  │    - isSuperAdmin()                                        │     │
│  │    - isAdminOrSuper()                                      │     │
│  │    - hasRole()                                             │     │
│  │  • Supabase RPC calls                                      │     │
│  └───────────────────────────────────────────────────────────┘     │
│                              │                                       │
│                              ▼                                       │
│  Layer 3: DATABASE LAYER                                             │
│  ┌───────────────────────────────────────────────────────────┐     │
│  │  RLS POLICIES                                              │     │
│  │  • "Super admins can manage all roles"                     │     │
│  │  • "Users can view their own roles"                        │     │
│  │  • "Super admins can update all profiles"                  │     │
│  │                                                             │     │
│  │  TRIGGERS                                                   │     │
│  │  • check_super_admin_for_role_changes()                    │     │
│  │  • protect_super_admin()                                   │     │
│  │                                                             │     │
│  │  FUNCTIONS                                                  │     │
│  │  • is_super_admin(_user_id)                                │     │
│  │  • is_admin_or_super(_user_id)                             │     │
│  │  • assign_super_admin_to_email(_email)                     │     │
│  └───────────────────────────────────────────────────────────┘     │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         DATA FLOW                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  USER SIGN IN                                                        │
│  ───────────                                                         │
│  1. User enters credentials                                          │
│  2. Supabase Auth validates                                          │
│  3. App checks roles via RPC (is_super_admin, is_admin_or_super)   │
│  4. UI renders based on role                                         │
│  5. Super Admin sees "Users" tab                                     │
│  6. Regular Admin sees only content tabs                             │
│                                                                       │
│  ROLE ASSIGNMENT (Super Admin Only)                                  │
│  ──────────────────────────────                                     │
│  1. Super Admin selects user                                         │
│  2. Selects new role from dropdown                                   │
│  3. UsersManager calls Supabase                                      │
│  4. RLS policies check caller is super admin                         │
│  5. Triggers validate operation                                      │
│  6. Role updated in user_roles table                                 │
│  7. UI refreshes with new role                                       │
│                                                                       │
│  USER DELETION (Super Admin Only)                                    │
│  ─────────────────────────────                                      │
│  1. Super Admin clicks delete                                        │
│  2. Confirms in dialog                                               │
│  3. System checks:                                                   │
│     • Not super admin? ✓                                             │
│     • Not self? ✓                                                    │
│  4. Deletes roles from user_roles                                    │
│  5. Deletes profile from profiles                                    │
│  6. Success notification                                             │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      PROTECTION MECHANISMS                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  SUPER ADMIN PROTECTION                                              │
│  ┌─────────────────────────────────────────────────────────┐       │
│  │  1. Hard-coded email: SUPER_ADMIN_EMAIL constant         │       │
│  │  2. Cannot delete: Protected by UI + trigger             │       │
│  │  3. Cannot modify role: Protected by trigger             │       │
│  │  4. RLS enforces only super admin manages roles          │       │
│  └─────────────────────────────────────────────────────────┘       │
│                                                                       │
│  REGULAR ADMIN RESTRICTIONS                                          │
│  ┌─────────────────────────────────────────────────────────┐       │
│  │  1. No access to user_roles table                        │       │
│  │  2. Cannot see UsersManager component                    │       │
│  │  3. No "Users" tab in admin portal                       │       │
│  │  4. RLS blocks user management queries                   │       │
│  └─────────────────────────────────────────────────────────┘       │
│                                                                       │
│  SELF-PROTECTION                                                     │
│  ┌─────────────────────────────────────────────────────────┐       │
│  │  1. Cannot delete own account (UI check)                 │       │
│  │  2. Super admin cannot delete self                       │       │
│  │  3. Admin cannot delete self                             │       │
│  └─────────────────────────────────────────────────────────┘       │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         FILE STRUCTURE                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  DATABASE                                                            │
│  ├── supabase/migrations/                                            │
│  │   └── 20251009000000_add_super_admin_role.sql                   │
│  └── scripts/                                                        │
│      ├── setup-super-admin.sql                                       │
│      └── verify-super-admin.sql                                      │
│                                                                       │
│  APPLICATION                                                         │
│  ├── src/lib/                                                        │
│  │   └── auth-utils.ts (SUPER_ADMIN_EMAIL + helper functions)      │
│  ├── src/components/admin/                                           │
│  │   └── UsersManager.tsx (user management UI)                     │
│  ├── src/pages/                                                      │
│  │   ├── Admin.tsx (admin portal with Users tab)                   │
│  │   └── Auth.tsx (sign up/in)                                     │
│  └── src/integrations/supabase/                                      │
│      └── types.ts (TypeScript types)                                │
│                                                                       │
│  DOCUMENTATION                                                       │
│  ├── README.md (main readme with super admin section)                │
│  ├── SUPER_ADMIN_SETUP.md (setup guide)                             │
│  ├── IMPLEMENTATION_SUMMARY.md (implementation details)              │
│  └── docs/                                                           │
│      ├── SUPER_ADMIN_README.md (technical docs)                     │
│      └── SUPER_ADMIN_ARCHITECTURE.md (this file)                    │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                       DECISION FLOW CHART                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│                      User Signs In                                   │
│                           │                                          │
│                           ▼                                          │
│                  Check User Roles                                    │
│                           │                                          │
│              ┌────────────┼────────────┐                            │
│              ▼            ▼            ▼                             │
│        Super Admin     Admin        User/None                        │
│              │            │            │                             │
│              ▼            ▼            ▼                             │
│     ┌───────────────┐ ┌────────┐ ┌──────────┐                      │
│     │ Show:         │ │ Show:  │ │ Show:    │                      │
│     │ • Users tab   │ │ • All  │ │ • Public │                      │
│     │ • All modules │ │   other│ │   pages  │                      │
│     │ • Super badge │ │   tabs │ │   only   │                      │
│     └───────────────┘ └────────┘ └──────────┘                      │
│              │                                                       │
│              ▼                                                       │
│       Manage Users?                                                  │
│              │                                                       │
│              ▼                                                       │
│       Yes (Super Admin)                                              │
│              │                                                       │
│      ┌───────┴───────┐                                              │
│      ▼               ▼                                               │
│  Assign Role    Delete User                                          │
│      │               │                                               │
│      ▼               ▼                                               │
│  RLS Check     Protection Check                                      │
│      │               │                                               │
│      ▼               ▼                                               │
│  Success?      Not Super Admin?                                      │
│      │               │                                               │
│      ▼               ▼                                               │
│  Update DB      Allow Delete                                         │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                     DEPLOYMENT CHECKLIST                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  □ 1. Apply database migration                                       │
│  □ 2. Create super admin account (harab.business@gmail.com)         │
│  □ 3. Run setup script to assign role                                │
│  □ 4. Run verification script                                        │
│  □ 5. Test super admin login                                         │
│  □ 6. Verify "Users" tab appears                                     │
│  □ 7. Test user role assignment                                      │
│  □ 8. Test user deletion (non-super-admin)                           │
│  □ 9. Create test admin account                                      │
│  □ 10. Verify admin cannot see Users tab                             │
│  □ 11. Test all protection mechanisms                                │
│  □ 12. Review security logs                                          │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘


