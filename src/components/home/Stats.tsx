export default function Stats() {
  const stats = [
    { label: 'Exhibitors', value: '600+' },
    { label: 'Trade Visitors', value: '35,000+' },
    { label: 'Countries', value: '20+' },
    { label: 'B2B Meetings', value: '4,500+' },
  ];
  return (
    <section className="py-12 md:py-16">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border bg-card p-6 text-center shadow-elegant">
            <div className="text-3xl font-semibold text-primary">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
