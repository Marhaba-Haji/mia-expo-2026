import SEO from "@/components/seo/SEO";
import { useState } from "react";
import QRCode from "react-qr-code";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { postToWebhook } from "@/lib/webhook";
import { toast } from "@/hooks/use-toast";

export default function VisitorInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticket, setTicket] = useState<string | null>(null);
  const [ticketData, setTicketData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = `MIA-${Date.now().toString(36).toUpperCase()}`;
    const payload = {
      t: "MIA_TICKET",
      id,
      name,
      email,
      event: "MIA Business Expo",
      organizer: "MIA",
      ts: new Date().toISOString(),
    };
    const json = JSON.stringify(payload);
    setTicket(json);
    setTicketData(payload);

    setLoading(true);
    try {
      await postToWebhook({ sheet: "VisitorRegistrations", ...payload });
      toast({ title: "Registered", description: "Your registration has been recorded. QR generated below." });
    } catch (err: any) {
      toast({
        title: "Saved locally",
        description: err?.message || "Unable to save to Google Sheets. You can still use the QR below.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <SEO title="Visitor Information • MIA Business Expo" description="Tickets, travel and accommodation details for attending the MIA Business Expo." canonical="/visitor-info" />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-6">Visitor Registration</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <article className="rounded-xl border bg-card p-6">
            <h3 className="font-medium mb-4">Register and Get Your Branded QR Ticket</h3>
            <form onSubmit={generate} className="space-y-3">
              <Input placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} required />
              <Input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              <Button type="submit" disabled={loading}>{loading ? "Generating…" : "Generate QR Ticket"}</Button>
              <p className="text-xs text-muted-foreground">Your information is used to issue your unique QR ticket for on-site check-in.</p>
            </form>
            {ticket && (
              <div className="mt-6 inline-block">
                <div className="rounded-xl border bg-background p-4 shadow-elegant">
                  <div className="text-center mb-3">
                    <p className="text-xs font-medium tracking-wide">MIA Business Expo</p>
                    <p className="text-[10px] text-muted-foreground">Organized by MIA</p>
                  </div>
                  <div className="relative">
                    <QRCode value={ticket} size={192} />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="h-10 w-10 rounded-md bg-hero-gradient border border-border shadow-glow flex items-center justify-center text-[10px] font-bold text-primary-foreground" aria-label="Event brand mark">
                        MIA
                      </div>
                    </div>
                  </div>
                  {ticketData && (
                    <p className="mt-3 text-center text-xs text-muted-foreground">Ticket ID: {ticketData.id}</p>
                  )}
                </div>
              </div>
            )}
          </article>
          <article className="rounded-xl border bg-card p-6">
            <h3 className="font-medium mb-2">Travel & Accommodation</h3>
            <p className="text-sm text-muted-foreground">Nearest airport: Indira Gandhi International. Partner hotels and travel desk details to be announced.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
