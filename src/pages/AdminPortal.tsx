import SEO from "@/components/seo/SEO";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setWebhookUrl, getWebhookUrl } from "@/lib/webhook";
import { toast } from "sonner";

export default function AdminPortal() {
  const [webhook, setWebhook] = useState("");
  const [sheetUrl, setSheetUrl] = useState(localStorage.getItem('mia_sheet_url') || '');

  useEffect(() => { setWebhook(getWebhookUrl()); }, []);

  const save = () => {
    setWebhookUrl(webhook);
    localStorage.setItem('mia_sheet_url', sheetUrl);
    toast.success("Settings saved");
  };

  return (
    <main>
      <SEO title="Admin Portal • MIA Business Expo" description="Configure Google Sheets and webhooks to view data in real-time and export from Sheets." canonical="/admin" />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-6">Admin Portal</h1>
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
      </section>
    </main>
  );
}
