import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Check if user is admin
    const { data: roleData, error: roleError } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError || !roleData) {
      throw new Error('Access denied: Admin only');
    }

    const { query } = await req.json();

    if (!query || typeof query !== 'string') {
      throw new Error('Invalid query');
    }

    console.log('Executing SQL query:', query.substring(0, 100) + '...');

    // Determine if query is a SELECT or a data modification query
    const trimmedQuery = query.trim().toUpperCase();
    const isSelectQuery = trimmedQuery.startsWith('SELECT') || 
                          trimmedQuery.startsWith('WITH') ||
                          trimmedQuery.startsWith('SHOW') ||
                          trimmedQuery.startsWith('EXPLAIN');

    let result;
    
    if (isSelectQuery) {
      // For SELECT queries, return the data
      const { data, error } = await supabaseClient.rpc('execute_sql', { sql_query: query });
      
      if (error) {
        console.error('Query error:', error);
        throw new Error(error.message || 'Query execution failed');
      }
      
      result = data;
    } else {
      // For INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, etc.
      const { data, error } = await supabaseClient.rpc('execute_sql_write', { sql_query: query });
      
      if (error) {
        console.error('Query error:', error);
        throw new Error(error.message || 'Query execution failed');
      }
      
      result = { success: true, message: 'Query executed successfully', data };
    }

    console.log('Query executed successfully');

    return new Response(
      JSON.stringify({ data: result, error: null }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ data: null, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
