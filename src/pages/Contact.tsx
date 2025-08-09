import SEO from "@/components/seo/SEO";
import SimpleForm from "@/components/forms/SimpleForm";

export default function Contact() {
  return (
    <main>
      <SEO title="Contact • MIA Business Expo" description="Get in touch with the Expo team for queries, partnerships and media." canonical="/contact" />
      <section className="container py-12">
        <h1 className="font-brand text-4xl mb-6">Contact Us</h1>
        <div className="rounded-xl border bg-card p-6 max-w-xl">
          <SimpleForm title="Send a Message" sheetName="contact" />
        </div>
      </section>
    </main>
  );
}
