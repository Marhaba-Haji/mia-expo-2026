-- Create a function to execute write SQL queries (INSERT, UPDATE, DELETE, etc.)
CREATE OR REPLACE FUNCTION public.execute_sql_write(sql_query text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result_count integer;
BEGIN
  -- Execute the query
  EXECUTE sql_query;
  
  -- Get the number of rows affected
  GET DIAGNOSTICS result_count = ROW_COUNT;
  
  -- Return a status message
  RETURN jsonb_build_object(
    'affected_rows', result_count,
    'status', 'success'
  );
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Query error: %', SQLERRM;
END;
$$;