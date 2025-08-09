import SEO from "@/components/seo/SEO";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { postToWebhook } from "@/lib/webhook";

export default function ExhibitorPortal() {
  const [pkg, setPkg] = useState('Startup')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await postToWebhook({ sheet: 'exhibitors', pkg, company, email, ts: new Date().toISOString() })
      toast({ title: 'Application Submitted', description: 'Our team will contact you shortly.' })
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' })
    } finally { setLoading(false) }
  }

  const pay = () => {
    toast({ title: 'Payment Integration Pending', description: 'Connect Supabase + Stripe/Razorpay to enable secure checkout.' })
  }

  return (
    <main>
      <SEO title="Exhibitor Portal • MIA Business Expo" description="Select your package, submit exhibitor details and proceed to secure payment." canonical="/exhibitor-portal" />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-6">Exhibitor Portal</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={submit} className="rounded-xl border bg-card p-6 space-y-4">
            <div>
              <h3 className="font-medium mb-2">Choose a Package</h3>
              <RadioGroup value={pkg} onValueChange={setPkg} className="grid grid-cols-1 gap-3">
                {['Startup','Standard','Premium'].map(p => (
                  <div key={p} className="flex items-center space-x-2">
                    <RadioGroupItem value={p} id={p} />
                    <Label htmlFor={p}>{p}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="grid gap-3">
              <Input placeholder="Company Name" value={company} onChange={(e)=>setCompany(e.target.value)} required />
              <Input placeholder="Business Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div className="flex gap-3">
              <Button type="submit" disabled={loading}>{loading ? 'Submitting…' : 'Submit Details'}</Button>
              <Button type="button" variant="hero" onClick={pay}>Proceed to Payment</Button>
            </div>
          </form>
          <aside className="rounded-xl border bg-card p-6">
            <h3 className="font-medium mb-2">Secure Login Coming Soon</h3>
            <p className="text-sm text-muted-foreground">We will enable password-protected access using Supabase Auth. Please use the form to apply and our team will share credentials.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
