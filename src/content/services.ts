export type Expertise = "seo" | "geo";

export type Service = {
  num: string;
  id: string;
  expertise: Expertise;
  name: string;
  title: string;
  description: string;
  items: string[];
  /** Page qui détaille la prestation (maillage interne). */
  href: string;
  /** Mention affichée sur les animations qui montrent des données. */
  demo?: string;
};

export const seoServices: Service[] = [
  {
    num: "01",
    id: "audit-seo",
    expertise: "seo",
    name: "Audit SEO",
    title: "Comprendre avant d'optimiser.",
    description:
      "Une analyse technique et stratégique de votre site pour identifier ce qui freine sa visibilité, et les opportunités qu'il n'exploite pas encore.",
    items: [
      "Audit complet du site",
      "Indexation et exploration",
      "Architecture et profondeur des pages",
      "Analyse concurrentielle",
      "Erreurs techniques",
      "Performances et Core Web Vitals",
      "Opportunités de référencement",
    ],
    href: "/audit-seo",
  },
  {
    num: "02",
    id: "seo-technique",
    expertise: "seo",
    name: "SEO technique",
    title: "Une fondation solide pour votre visibilité.",
    description:
      "Un site rapide, accessible et correctement compris par les moteurs : la base sans laquelle les contenus ne peuvent pas donner leur plein potentiel.",
    items: [
      "Core Web Vitals et vitesse",
      "HTML sémantique",
      "Indexation",
      "Sitemap XML et robots.txt",
      "Données structurées",
      "Redirections et erreurs 404",
      "Canonicalisation",
      "Expérience mobile",
    ],
    href: "/seo#seo-technique",
  },
  {
    num: "03",
    id: "seo-on-page",
    expertise: "seo",
    name: "SEO on-page",
    title: "Chaque page a un rôle à jouer.",
    description:
      "Chaque page répond à une intention de recherche précise : titres, structure, contenus, images et liens internes sont travaillés dans ce sens.",
    items: [
      "Balises title",
      "Meta descriptions",
      "Structure H1, H2, H3",
      "Optimisation des contenus",
      "Maillage interne",
      "Images",
      "URL",
      "Intentions de recherche",
    ],
    href: "/seo#seo-on-page",
  },
  {
    num: "04",
    id: "mots-cles",
    expertise: "seo",
    name: "Recherche de mots-clés",
    title: "Être présent là où vos clients vous cherchent.",
    description:
      "Identifier les recherches qui comptent vraiment pour votre activité, les regrouper par intention, et en faire une stratégie éditoriale.",
    items: [
      "Étude des intentions",
      "Recherche sémantique",
      "Analyse concurrentielle",
      "Opportunités de positionnement",
      "Regroupements de mots-clés",
      "Stratégie éditoriale",
    ],
    href: "/seo#mots-cles",
  },
  {
    num: "05",
    id: "seo-local",
    expertise: "seo",
    name: "SEO local",
    title: "Devenir visible près de chez vous.",
    description:
      "Apparaître quand on vous cherche à Nantes, en Vendée ou dans votre zone : fiche Google, Google Maps, pages locales utiles et informations cohérentes.",
    items: [
      "Google Business Profile",
      "Référencement géographique",
      "Pages locales",
      "Google Maps",
      "Avis clients",
      "Cohérence des informations NAP",
      "Visibilité régionale",
    ],
    href: "/seo-local",
  },
  {
    num: "06",
    id: "contenu-seo",
    expertise: "seo",
    name: "Contenu SEO",
    title: "Du contenu qui attire et convainc.",
    description:
      "Des pages et des articles qui répondent réellement aux questions de vos clients, organisés en clusters pour renforcer votre position sur un sujet.",
    items: [
      "Création de pages",
      "Articles",
      "Optimisation éditoriale",
      "Clusters sémantiques",
      "Actualisation de contenus",
      "Réponse aux intentions de recherche",
    ],
    href: "/seo#contenu-seo",
  },
  {
    num: "07",
    id: "netlinking",
    expertise: "seo",
    name: "Netlinking et autorité",
    title: "Renforcer votre crédibilité sur le web.",
    description:
      "Des liens entrants pertinents, obtenus par des relations éditoriales, plutôt que des achats en masse qui exposent votre site.",
    items: [
      "Audit des backlinks",
      "Analyse de popularité",
      "Acquisition de liens qualitatifs",
      "Relations éditoriales",
      "Surveillance du profil de liens",
    ],
    href: "/seo#netlinking",
  },
  {
    num: "08",
    id: "suivi-seo",
    expertise: "seo",
    name: "Suivi et performance",
    title: "Mesurer. Comprendre. Progresser.",
    description:
      "Des indicateurs lisibles, issus de vos propres outils, pour savoir ce qui fonctionne et décider des prochaines priorités.",
    items: [
      "Google Search Console",
      "Google Analytics 4",
      "Suivi des positions",
      "Trafic organique",
      "Conversions",
      "Reporting",
      "Amélioration continue",
    ],
    href: "/seo#suivi-seo",
    demo: "Données illustratives",
  },
];

export const geoServices: Service[] = [
  {
    num: "09",
    id: "audit-visibilite-ia",
    expertise: "geo",
    name: "Audit de visibilité IA",
    title: "Êtes-vous visible dans les réponses des intelligences artificielles ?",
    description:
      "Des tests structurés sur plusieurs assistants pour savoir si votre entreprise est citée, comment elle est décrite, et quelles sources sont utilisées à sa place.",
    items: [
      "Analyse de la présence de la marque",
      "Analyse des requêtes pertinentes",
      "Tests sur plusieurs assistants",
      "Concurrents mentionnés",
      "Analyse des sources citées",
      "Lacunes informationnelles",
    ],
    href: "/geo#audit-visibilite-ia",
    demo: "Démonstration — aucun audit réel",
  },
  {
    num: "10",
    id: "optimisation-generative",
    expertise: "geo",
    name: "Optimisation pour les moteurs génératifs",
    title: "Devenir une source compréhensible et pertinente.",
    description:
      "Clarifier qui vous êtes, ce que vous faites et où, avec des informations structurées, précises et vérifiables que les moteurs peuvent reprendre sans ambiguïté.",
    items: [
      "Clarification de l'identité de l'entreprise",
      "Structuration des informations",
      "Contenus précis et documentés",
      "Cohérence éditoriale",
      "Pages qui répondent aux questions",
      "Informations vérifiables et actualisées",
    ],
    href: "/geo#optimisation-generative",
  },
  {
    num: "11",
    id: "autorite-sources",
    expertise: "geo",
    name: "Autorité et sources",
    title: "Renforcer les signaux de confiance.",
    description:
      "Les moteurs génératifs s'appuient sur des sources. Nous travaillons la cohérence de votre marque et votre présence là où elle est légitime — pas la multiplication de mentions artificielles.",
    items: [
      "Cohérence des informations de marque",
      "Présence éditoriale",
      "Sources fiables",
      "Citations et mentions",
      "Réputation numérique",
      "Informations d'entreprise cohérentes",
      "Relations entre entités",
    ],
    href: "/geo#autorite-sources",
  },
  {
    num: "12",
    id: "contenu-geo",
    expertise: "geo",
    name: "Stratégie de contenu GEO",
    title: "Créer des contenus qui apportent de vraies réponses.",
    description:
      "Des contenus qui répondent précisément aux questions posées aux assistants : définitions, guides, comparatifs documentés et données factuelles.",
    items: [
      "Questions fréquentes",
      "Contenus experts",
      "Pages de services structurées",
      "Guides pratiques",
      "Définitions précises",
      "Comparatifs documentés",
      "Données factuelles",
    ],
    href: "/geo#contenu-geo",
  },
  {
    num: "13",
    id: "suivi-geo",
    expertise: "geo",
    name: "Suivi de visibilité GEO",
    title: "Mesurer votre présence dans les réponses IA.",
    description:
      "Un suivi régulier de requêtes définies ensemble, moteur par moteur. Les réponses varient selon le moteur, la formulation, le contexte et la période : nous le mesurons sans le présenter comme une vérité universelle.",
    items: [
      "Suivi de requêtes",
      "Mentions de marque",
      "Citations",
      "Sources utilisées",
      "Comparaison concurrentielle",
      "Analyse des évolutions",
      "Recommandations",
    ],
    href: "/geo#suivi-geo",
    demo: "Démonstration — valeurs fictives",
  },
];

export const allServices = [...seoServices, ...geoServices];
