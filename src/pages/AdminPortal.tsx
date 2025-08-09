import SEO from "@/components/seo/SEO";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setWebhookUrl, getWebhookUrl } from "@/lib/webhook";

export default function AdminPortal() {
  const [webhook, setWebhook] = useState("");
  const FIXED_SHEET_URL = "https://docs.google.com/spreadsheets/d/1TH5F3Wvv7IFenQmzjTSt0nQpO9fefoVlyM0SAHNhJzU/edit";

  useEffect(() => { setWebhook(getWebhookUrl()); }, []);

  const save = () => {
    setWebhookUrl(webhook);
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
            <Button onClick={save}>Save</Button>
            <p className="text-xs text-muted-foreground">Sheets are hardcoded to the MIA master spreadsheet below. Set a Webhook URL to enable writing registrations.</p>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-medium mb-2">Live Sheets Embed</h3>
            <iframe title="Google Sheet" src={FIXED_SHEET_URL} className="w-full h-[420px] rounded-md border" />
          </div>
        </div>
      </section>
    </main>
  );
}
