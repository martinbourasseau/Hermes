/**
 * Informations de référence du site.
 * Règle : rien n'est inventé. Ce qui n'est pas confirmé reste à `null`
 * et le site s'adapte (la ligne n'est simplement pas affichée).
 */
export const site = {
  name: "Hermès",
  wordmark: "HERMÈS",
  tagline: "SEO & GEO",
  locale: "fr_FR",
  description:
    "Hermès accompagne les entreprises de Nantes, de la Vendée et des Pays de la Loire en SEO et en GEO : audit, SEO technique, SEO local, contenus et visibilité dans les réponses des moteurs IA.",
  manifesto: "Être visible est un début. Devenir incontournable est une stratégie.",
  contact: {
    email: "martin.bourasseau4@gmail.com",
  },
  /** Zone d'intervention : activité indépendante, sans bureau physique annoncé. */
  areas: ["Nantes", "Loire-Atlantique", "Vendée", "Pays de la Loire"],
  group: {
    name: "Groupe BOURASSEAU",
    url: "https://www.groupebourasseau.com",
  },
  /**
   * Sites du groupe. Les adresses d'Athéna et d'Apollon sont les adresses
   * Vercel actuelles (domaines définitifs non connus) : à remplacer ici
   * dès qu'ils existent.
   */
  links: {
    synatrap: "https://synatrap.com",
    athena: "https://athena-eta-peach.vercel.app" as string | null,
    apollon: "https://apollon-chi.vercel.app" as string | null,
  },
  /** Mentions légales : à compléter avant publication. */
  legal: {
    publisher: null as string | null,
    status: null as string | null,
    siren: null as string | null,
    address: null as string | null,
    publicationDirector: null as string | null,
    host: null as string | null,
  },
};

export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/seo", label: "SEO" },
  { href: "/geo", label: "GEO" },
  { href: "/audit-seo", label: "Audit" },
  { href: "/seo-local", label: "SEO local" },
  { href: "/#methode", label: "Méthode" },
];
