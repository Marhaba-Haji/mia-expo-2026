import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Play, Trash2, Copy, Download } from "lucide-react";

export function SQLEditor() {
  const [sqlQuery, setSqlQuery] = useState("");
  const [queryHistory, setQueryHistory] = useState<string[]>([]);
  const [sqlResult, setSqlResult] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const executeSql = async () => {
    if (!sqlQuery.trim()) {
      toast.error("Please enter a SQL query");
      return;
    }

    setIsExecuting(true);
    setSqlResult(null);
    setExecutionTime(null);
    const startTime = performance.now();

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Not authenticated");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/execute-sql`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: sqlQuery }),
      });

      const result = await response.json();
      const endTime = performance.now();
      setExecutionTime(endTime - startTime);

      if (result.error) {
        toast.error("Query failed", { description: result.error });
        setSqlResult({ error: result.error, type: 'error' });
      } else {
        const rowCount = Array.isArray(result.data) ? result.data.length : 0;
        toast.success(`Query executed successfully`, { 
          description: `${rowCount} row${rowCount !== 1 ? 's' : ''} returned in ${(endTime - startTime).toFixed(2)}ms`
        });
        setSqlResult({ data: result.data, type: 'success', rowCount });
        
        // Add to history
        setQueryHistory(prev => [sqlQuery, ...prev.slice(0, 9)]);
      }
    } catch (error: any) {
      const endTime = performance.now();
      setExecutionTime(endTime - startTime);
      toast.error("Failed to execute query", { description: error.message });
      setSqlResult({ error: error.message, type: 'error' });
    } finally {
      setIsExecuting(false);
    }
  };

  const clearEditor = () => {
    setSqlQuery("");
    setSqlResult(null);
    setExecutionTime(null);
  };

  const loadFromHistory = (query: string) => {
    setSqlQuery(query);
    toast.info("Query loaded from history");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const exportResults = () => {
    if (!sqlResult?.data) return;
    
    const dataStr = JSON.stringify(sqlResult.data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `query-results-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Results exported");
  };

  const renderResults = () => {
    if (!sqlResult) return null;

    if (sqlResult.type === 'error') {
      return (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm text-destructive whitespace-pre-wrap">{sqlResult.error}</pre>
          </CardContent>
        </Card>
      );
    }

    if (!sqlResult.data || sqlResult.data.length === 0) {
      return (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Query executed successfully. No rows returned.</p>
          </CardContent>
        </Card>
      );
    }

    const columns = Object.keys(sqlResult.data[0]);

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Results</CardTitle>
              <CardDescription>
                {sqlResult.rowCount} row{sqlResult.rowCount !== 1 ? 's' : ''} 
                {executionTime && ` • ${executionTime.toFixed(2)}ms`}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => copyToClipboard(JSON.stringify(sqlResult.data, null, 2))}>
                <Copy className="h-4 w-4 mr-1" />
                Copy JSON
              </Button>
              <Button size="sm" variant="outline" onClick={exportResults}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table" className="w-full">
            <TabsList>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="json">JSON View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="table" className="max-h-[500px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((col) => (
                      <TableHead key={col} className="font-bold">{col}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sqlResult.data.map((row: any, idx: number) => (
                    <TableRow key={idx}>
                      {columns.map((col) => (
                        <TableCell key={col} className="max-w-md truncate">
                          {row[col] === null ? (
                            <span className="text-muted-foreground italic">NULL</span>
                          ) : typeof row[col] === 'object' ? (
                            JSON.stringify(row[col])
                          ) : (
                            String(row[col])
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="json" className="max-h-[500px] overflow-auto">
              <pre className="bg-muted p-4 rounded-md text-xs">
                {JSON.stringify(sqlResult.data, null, 2)}
              </pre>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>SQL Query Editor</CardTitle>
          <CardDescription>
            Execute SQL queries directly on your database. Use with caution as queries run with elevated privileges.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="SELECT * FROM exhibitors LIMIT 10;"
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="font-mono text-sm min-h-[200px]"
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  executeSql();
                }
              }}
            />
            <p className="text-xs text-muted-foreground">
              Press Ctrl+Enter (Cmd+Enter on Mac) to execute
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={executeSql} disabled={isExecuting}>
              <Play className="h-4 w-4 mr-2" />
              {isExecuting ? "Executing..." : "Execute Query"}
            </Button>
            <Button variant="outline" onClick={clearEditor}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {queryHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Query History</CardTitle>
            <CardDescription>Recently executed queries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {queryHistory.map((query, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-muted rounded-md cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => loadFromHistory(query)}
                >
                  <pre className="text-xs truncate">{query}</pre>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {renderResults()}
    </div>
  );
}
