import { supabase } from '@/integrations/supabase/client';

/**
 * Super Admin Email - Hard-locked email address for the super admin
 * This email has complete control over the entire application
 */
export const SUPER_ADMIN_EMAIL = 'harab.business@gmail.com';

/**
 * Check if the current user is a super admin
 */
export async function isSuperAdmin(userId: string): Promise<boolean> {
  try {
    // Try RPC function first
    const { data: rpcData, error: rpcError } = await supabase.rpc('is_super_admin', {
      _user_id: userId
    });

    // If RPC function doesn't exist, fall back to direct query
    if (rpcError && rpcError.code === 'PGRST202') {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'super_admin')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking super admin status:', error);
        return false;
      }

      return !!data;
    }

    if (rpcError) {
      console.error('Error checking super admin status:', rpcError);
      return false;
    }

    return rpcData || false;
  } catch (error) {
    console.error('Exception checking super admin status:', error);
    return false;
  }
}

/**
 * Check if the current user is an admin or super admin
 */
export async function isAdminOrSuper(userId: string): Promise<boolean> {
  try {
    // Try RPC function first
    const { data: rpcData, error: rpcError } = await supabase.rpc('is_admin_or_super', {
      _user_id: userId
    });

    // If RPC function doesn't exist, fall back to direct query
    if (rpcError && rpcError.code === 'PGRST202') {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .in('role', ['admin', 'super_admin']);

      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }

      return data && data.length > 0;
    }

    if (rpcError) {
      console.error('Error checking admin status:', rpcError);
      return false;
    }

    return rpcData || false;
  } catch (error) {
    console.error('Exception checking admin status:', error);
    return false;
  }
}

/**
 * Check if a user has a specific role
 */
export async function hasRole(
  userId: string, 
  role: 'admin' | 'user' | 'super_admin'
): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc('has_role', {
      _user_id: userId,
      _role: role
    });

    if (error) {
      console.error('Error checking role:', error);
      return false;
    }

    return data || false;
  } catch (error) {
    console.error('Exception checking role:', error);
    return false;
  }
}

/**
 * Get all roles for a user
 */
export async function getUserRoles(userId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user roles:', error);
      return [];
    }

    return data?.map(r => r.role) || [];
  } catch (error) {
    console.error('Exception fetching user roles:', error);
    return [];
  }
}

/**
 * Check if the user's email is the super admin email
 */
export function isSuperAdminEmail(email: string | undefined): boolean {
  return email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
}

/**
 * Get user profile with email
 */
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Exception fetching user profile:', error);
    return null;
  }
}

/**
 * Assign super admin role to the designated email
 * This should only be called once during initial setup
 */
export async function assignSuperAdminRole(email: string) {
  try {
    const { error } = await supabase.rpc('assign_super_admin_to_email', {
      _email: email
    });

    if (error) {
      console.error('Error assigning super admin role:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Exception assigning super admin role:', error);
    return { success: false, error: String(error) };
  }
}

