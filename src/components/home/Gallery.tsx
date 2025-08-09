import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function Gallery() {
  const items = Array.from({ length: 6 }).map((_, i) => i);
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <h2 className="font-brand text-3xl mb-6">Past Highlights</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {items.map((i) => (
              <CarouselItem key={i} className="basis-full md:basis-1/3">
                <div className="h-48 rounded-xl border bg-soft-gradient shadow-elegant" aria-label={`Gallery item ${i+1}`} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
