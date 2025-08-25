import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Campus Hustle - Mary Stuart Hall Marketplace',
  description = 'Connect with talented entrepreneurs at Mary Stuart Hall, Makerere University. Find amazing services from hair braiding to tech solutions, all within your hall community.',
  keywords = 'Mary Stuart Hall, Makerere University, student entrepreneurs, campus marketplace, hair braiding, tech services, academic support, MSH',
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website'
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Campus Hustle Team" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Campus Hustle" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@campushustle" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#9333ea" />
      <meta name="application-name" content="Campus Hustle" />
      <meta name="msapplication-TileColor" content="#9333ea" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Campus Hustle",
          "description": description,
          "url": url,
          "logo": {
            "@type": "ImageObject",
            "url": `${url}/logo.png`
          },
          "sameAs": [
            "https://instagram.com/campushustle",
            "https://twitter.com/campushustle"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+256-700-000-000",
            "contactType": "customer service"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
