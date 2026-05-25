const BASE = "https://spa-prestige-collection.com";
const ORG_NAME = "Spa & Prestige Collection";
const LOGO = `${BASE}/spa-prestige-logo.png`;

function absUrl(path = "") {
  if (!path) return BASE;
  if (path.startsWith("http")) return path;
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

function resolveImage(img) {
  if (!img) return null;
  if (typeof img !== "string") return null;
  if (img.startsWith("http")) return img;
  return `https://admin.spa-prestige-collection.com/storage/${img}`;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORG_NAME,
    url: BASE,
    inLanguage: "fr-FR",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE}/recherche/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: BASE,
    logo: LOGO,
    sameAs: [
      "https://www.facebook.com/spaPrestigeCollection",
      "https://www.instagram.com/spaPrestigeCollection",
      "https://www.linkedin.com/company/spa-prestige-collection",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "contact@spa-prestige-collection.com",
      areaServed: ["FR", "BE", "CH", "DE", "IT", "ES"],
    },
  };
}

export function localBusinessSchema(etab) {
  if (!etab) return null;
  const url = absUrl(`/spa/${etab.slug || etab.id}`);
  const image = resolveImage(
    etab.photo_principale || etab.image || (etab.images && etab.images[0])
  );

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SpaOrBeautyService"],
    name: etab.nom || etab.name,
    description: etab.description || etab.meta_description,
    url,
    ...(etab.telephone && { telephone: etab.telephone }),
    ...(image && { image }),
    address: {
      "@type": "PostalAddress",
      streetAddress: etab.adresse || "",
      addressLocality: etab.ville || "",
      postalCode: etab.code_postal || "",
      addressCountry: "FR",
    },
    ...(etab.note && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(etab.note),
        reviewCount: String(etab.nombre_avis || 1),
        bestRating: "5",
        worstRating: "1",
      },
    }),
  };
}

export function productSchema(produit, etab) {
  if (!produit) return null;
  const image = resolveImage(produit.image || produit.photo_principale);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produit.nom || produit.name,
    description: produit.description || produit.meta_description,
    ...(image && { image }),
    brand: {
      "@type": "Brand",
      name: etab?.nom || ORG_NAME,
    },
    offers: {
      "@type": "Offer",
      price: String(produit.prix || produit.price || "0"),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: absUrl(`/produit/${produit.slug}`),
      seller: {
        "@type": "Organization",
        name: etab?.nom || ORG_NAME,
      },
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absUrl(item.path),
    })),
  };
}

export function faqSchema(faqs) {
  if (!faqs || !faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question || faq.name,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.reponse || faq.answer || faq.text,
      },
    })),
  };
}

export function webPageSchema({ title, description, url, image, type = "WebPage" } = {}) {
  if (!title) return null;
  const resolvedImage = resolveImage(image);
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description,
    url: absUrl(url),
    inLanguage: "fr-FR",
    ...(resolvedImage && { image: resolvedImage }),
    isPartOf: {
      "@type": "WebSite",
      name: ORG_NAME,
      url: BASE,
    },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      logo: { "@type": "ImageObject", url: LOGO },
    },
  };
}

export function itemListSchema(items = [], { name } = {}) {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(name && { name }),
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absUrl(it.url),
    })),
  };
}

export function articleSchema(article, { type = "Article", url } = {}) {
  if (!article) return null;
  const rawImage =
    article.image ||
    article.photo ||
    (article.thumbnail_path ? `/storage/${article.thumbnail_path}` : null);
  const image = resolveImage(rawImage) || rawImage;
  const authorName = article.user?.name || article.author || ORG_NAME;
  const mainUrl = absUrl(url || `/actualites/${article.slug || ""}`);
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: article.titre || article.title,
    description:
      article.description || article.meta_description || article.excerpt,
    ...(image && { image }),
    author: { "@type": "Person", name: authorName },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      logo: { "@type": "ImageObject", url: LOGO },
    },
    datePublished: article.published_at || article.created_at,
    dateModified: article.updated_at || article.created_at,
    mainEntityOfPage: { "@type": "WebPage", "@id": mainUrl },
    ...(article.meta_keywords && { keywords: article.meta_keywords }),
  };
}
