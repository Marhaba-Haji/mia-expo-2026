-- Create a function to execute SQL queries (admin only)
CREATE OR REPLACE FUNCTION public.execute_sql(sql_query text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  -- Execute the query and return results as JSONB
  EXECUTE format('SELECT jsonb_agg(row_to_json(t)) FROM (%s) t', sql_query) INTO result;
  RETURN COALESCE(result, '[]'::jsonb);
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Query error: %', SQLERRM;
END;
$$;