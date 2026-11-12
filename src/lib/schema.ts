import { site } from "@/content/site";
import { siteUrl } from "@/lib/env";

/**
 * Données structurées schema.org.
 * Volontairement sobres : pas de LocalBusiness (aucune adresse d'établissement
 * publiée), pas d'avis, pas de note. Uniquement des informations vérifiables.
 */

const orgId = `${siteUrl}/#organisation`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: "Hermès — SEO & GEO",
    alternateName: "HERMÈS",
    url: `${siteUrl}/`,
    logo: `${siteUrl}/icon.svg`,
    image: `${siteUrl}/images/og-hermes.jpg`,
    description: site.description,
    email: site.contact.email,
    areaServed: site.areas.map((name) => ({ "@type": "AdministrativeArea", name })),
    knowsAbout: [
      "Référencement naturel",
      "SEO technique",
      "SEO local",
      "Generative Engine Optimization",
      "Visibilité dans les moteurs de recherche génératifs",
    ],
    parentOrganization: {
      "@type": "Organization",
      name: site.group.name,
      url: site.group.url,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#site`,
    url: `${siteUrl}/`,
    name: "Hermès — SEO & GEO",
    inLanguage: "fr-FR",
    publisher: { "@id": orgId },
  };
}

export function serviceSchema(opts: { name: string; serviceType: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: `${siteUrl}${opts.path}`,
    provider: { "@id": orgId },
    areaServed: site.areas.map((name) => ({ "@type": "AdministrativeArea", name })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path}`,
    })),
  };
}
