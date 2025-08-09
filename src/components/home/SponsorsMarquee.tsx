export default function SponsorsMarquee() {
  const logos = ['HBL', 'Tata', 'ZamZam Foods', 'Alif Tech', 'Unity Bank', 'Lotus Ventures', 'Ethos Health'];
  return (
    <section className="py-10 border-t bg-secondary/50">
      <div className="container overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap animate-marquee">
          {[...logos, ...logos].map((l, idx) => (
            <span key={idx} className="px-4 py-2 rounded-md border bg-background shadow-sm text-sm text-muted-foreground">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
