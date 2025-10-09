import SEO from "@/components/seo/SEO";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setWebhookUrl, getWebhookUrl } from "@/lib/webhook";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function AdminPortal() {
  const [webhook, setWebhook] = useState("");
  const [sheetUrl, setSheetUrl] = useState(localStorage.getItem('mia_sheet_url') || '');
  const [sqlQuery, setSqlQuery] = useState("");
  const [sqlResult, setSqlResult] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => { setWebhook(getWebhookUrl()); }, []);

  const save = () => {
    setWebhookUrl(webhook);
    localStorage.setItem('mia_sheet_url', sheetUrl);
    toast.success("Settings saved");
  };

  const executeSql = async () => {
    if (!sqlQuery.trim()) {
      toast.error("Please enter a SQL query");
      return;
    }

    setIsExecuting(true);
    setSqlResult(null);

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

      if (result.error) {
        toast.error(result.error);
        setSqlResult({ error: result.error });
      } else {
        toast.success("Query executed successfully");
        setSqlResult(result.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to execute query");
      setSqlResult({ error: error.message });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <main>
      <SEO title="Admin Portal • MIA Business Expo" description="Configure Google Sheets and webhooks to view data in real-time and export from Sheets." canonical="/admin" />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-6">Admin Portal</h1>
        
        <Tabs defaultValue="integrations" className="w-full">
          <TabsList>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="sql">SQL Editor</TabsTrigger>
          </TabsList>

          <TabsContent value="integrations" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border bg-card p-6 space-y-3">
                <h3 className="font-medium">Integration Settings</h3>
                <Input placeholder="Webhook URL (Zapier / Apps Script)" value={webhook} onChange={(e)=>setWebhook(e.target.value)} />
                <Input placeholder="Google Sheet public URL (for embed)" value={sheetUrl} onChange={(e)=>setSheetUrl(e.target.value)} />
                <Button onClick={save}>Save</Button>
                <p className="text-xs text-muted-foreground">Tip: Use a Google Apps Script Web App or Zapier Catch Hook to push form data into dedicated Google Sheets.</p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-medium mb-2">Live Sheets Embed</h3>
                {sheetUrl ? (
                  <iframe title="Google Sheet" src={sheetUrl} className="w-full h-[420px] rounded-md border" />
                ) : (
                  <p className="text-sm text-muted-foreground">Paste a public Google Sheet URL to embed data.</p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sql" className="mt-6">
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div>
                <h3 className="font-medium mb-2">SQL Query Editor</h3>
                <p className="text-xs text-muted-foreground mb-4">Execute SQL queries directly on your database. Use with caution.</p>
              </div>
              
              <Textarea
                placeholder="SELECT * FROM exhibitors LIMIT 10;"
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                className="font-mono text-sm min-h-[200px]"
              />
              
              <Button onClick={executeSql} disabled={isExecuting}>
                {isExecuting ? "Executing..." : "Execute Query"}
              </Button>

              {sqlResult && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Result:</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] text-xs">
                    {JSON.stringify(sqlResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
