import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { postToWebhook } from '@/lib/webhook'
import { toast } from '@/hooks/use-toast'

interface Props { title: string; sheetName: string; }

export default function SimpleForm({ title, sheetName }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [hp, setHp] = useState('') // honeypot
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (hp) return
    setLoading(true)
    try {
      await postToWebhook({ sheet: sheetName, name, email, message, ts: new Date().toISOString() })
      toast({ title: 'Submitted', description: 'We have received your request.' })
      setName(''); setEmail(''); setMessage('')
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' })
    } finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <h3 className="font-medium">{title}</h3>
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <input tabIndex={-1} autoComplete="off" className="hidden" value={hp} onChange={(e)=>setHp(e.target.value)} />
      <Button type="submit" disabled={loading}>{loading ? 'Submitting…' : 'Submit'}</Button>
    </form>
  )
}
