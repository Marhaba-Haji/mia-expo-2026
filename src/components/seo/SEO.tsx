import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: object;
};

export default function SEO({ title, description, canonical = '/', jsonLd }: SEOProps) {
  const jsonLdStr = jsonLd ? JSON.stringify(jsonLd) : undefined;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {jsonLdStr && (
        <script type="application/ld+json">{jsonLdStr}</script>
      )}
    </Helmet>
  );
}
