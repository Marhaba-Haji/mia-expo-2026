import SEO from "@/components/seo/SEO";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const data = [
  { name: 'Noor Foods', sector: 'F&B', country: 'IN' },
  { name: 'Khalsa Machinery', sector: 'Manufacturing', country: 'IN' },
  { name: 'St. Mary Healthcare', sector: 'Healthcare', country: 'IN' },
  { name: 'Zaveri Organics', sector: 'Agri', country: 'IN' },
]

export default function Directory() {
  const [q, setQ] = useState('')
  const [sector, setSector] = useState('All')

  const list = useMemo(() => data.filter(d =>
    (sector==='All' || d.sector===sector) && d.name.toLowerCase().includes(q.toLowerCase())
  ), [q, sector])

  return (
    <main>
      <SEO title="Exhibitor Directory • MIA Business Expo" description="Search exhibitors by name and sector. Discover innovative products and services." canonical="/directory" />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-6">Exhibitor Directory</h1>
        <div className="flex flex-wrap gap-3 mb-6">
          <Input placeholder="Search by name" value={q} onChange={(e)=>setQ(e.target.value)} className="w-full md:w-64" />
          <Select value={sector} onValueChange={setSector}>
            <SelectTrigger className="w-full md:w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              {['All','F&B','Manufacturing','Healthcare','Agri'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {list.map(x => (
            <article key={x.name} className="rounded-lg border bg-card p-4">
              <h3 className="font-medium">{x.name}</h3>
              <p className="text-sm text-muted-foreground">{x.sector} • {x.country}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
