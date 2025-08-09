import { useState } from 'react'

export type Booth = { id: string; status: 'available'|'reserved'|'sold'; exhibitor?: string }

const initial: Booth[] = Array.from({ length: 48 }).map((_, i) => ({ id: `B${i+1}`, status: Math.random() > 0.8 ? 'sold' : (Math.random()>0.6?'reserved':'available') }))

export default function FloorPlanMap() {
  const [booths] = useState<Booth[]>(initial)

  const statusCls = (s: Booth['status']) =>
    s === 'available' ? 'bg-secondary border-dashed' : s === 'reserved' ? 'bg-accent/20' : 'bg-primary/20'

  const statusLabel = (s: Booth['status']) => s[0].toUpperCase() + s.slice(1)

  return (
    <div>
      <div className="mb-4 flex gap-3 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-secondary inline-block border"/> Available</span>
        <span className="inline-flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-accent/30 inline-block border"/> Reserved</span>
        <span className="inline-flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-primary/30 inline-block border"/> Sold</span>
      </div>
      <div className="grid grid-cols-6 gap-3">
        {booths.map(b => (
          <div key={b.id} className={`aspect-square rounded-md border ${statusCls(b.status)} flex items-center justify-center text-xs`}
               aria-label={`Booth ${b.id} ${statusLabel(b.status)}`}>
            {b.id}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">For live availability, integration with backend is required.</p>
    </div>
  )
}
