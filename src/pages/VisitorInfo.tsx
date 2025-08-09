import SEO from "@/components/seo/SEO";
import { useState } from "react";
import QRCode from "react-qr-code";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VisitorInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticket, setTicket] = useState<string | null>(null);

  const generate = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { t: 'MIA_TICKET', name, email, ts: new Date().toISOString() };
    setTicket(JSON.stringify(payload));
  };

  return (
    <main>
      <SEO title="Visitor Information • MIA Business Expo" description="Tickets, travel and accommodation details for attending the MIA Business Expo." canonical="/visitor-info" />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-6">Visitor Information</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <article className="rounded-xl border bg-card p-6">
            <h3 className="font-medium mb-4">Get Your Ticket (QR)</h3>
            <form onSubmit={generate} className="space-y-3">
              <Input placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} required />
              <Input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              <Button type="submit">Generate QR Ticket</Button>
            </form>
            {ticket && (
              <div className="mt-6 p-4 rounded-lg border bg-background inline-block">
                <QRCode value={ticket} size={160} />
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
