/**
 * Contenu des pages de destination.
 * Chaque page vise une intention de recherche distincte (voir README, « Architecture SEO »).
 * Aucune promesse de position ou de citation, aucune donnée inventée.
 */

export type Section = {
  id?: string;
  h2: string;
  paragraphs: string[];
  list?: string[];
};

export type Faq = { q: string; a: string };

export type LandingPage = {
  slug: string;
  path: string;
  /** Titre court pour le fil d'Ariane et les liens. */
  label: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  h1: string;
  lead: string;
  art: "seo" | "geo" | "audit" | "local" | "nantes" | "vendee" | "tpe";
  sections: Section[];
  /** Modules de prestations affichés sur la page (identifiants de services.ts). */
  services?: string[];
  faq: Faq[];
  related: string[];
  serviceType: string;
};

export const pages: LandingPage[] = [
  {
    slug: "seo",
    path: "/seo",
    label: "SEO",
    metaTitle: "Consultant SEO à Nantes — référencement naturel",
    metaDescription:
      "Audit, SEO technique, on-page, mots-clés, contenus, netlinking et suivi : un accompagnement SEO complet pour les entreprises de Nantes, de la Vendée et des Pays de la Loire.",
    kicker: "Expertise A · SEO",
    h1: "Le référencement naturel, travaillé en profondeur.",
    lead:
      "Le SEO améliore la présence de votre site dans les résultats des moteurs de recherche. Nous travaillons ses trois piliers — technique, éditorial, autorité — pour attirer des visiteurs qui cherchent réellement ce que vous proposez.",
    art: "seo",
    sections: [
      {
        h2: "Ce que le SEO change pour une entreprise",
        paragraphs: [
          "Quand un prospect tape une recherche, il exprime un besoin précis, au moment où il en a besoin. Être présent à cet instant, c'est recevoir des visites qualifiées sans payer chaque clic.",
          "Le référencement naturel est un travail de fond : ses effets se construisent sur plusieurs mois et dépendent de la concurrence de votre secteur. Personne ne peut garantir une première position sur Google. Notre rôle est de réunir les meilleures conditions pour viser les meilleures positions possibles, et de mesurer honnêtement l'évolution.",
        ],
      },
      {
        h2: "Les trois piliers",
        paragraphs: [
          "Un site bien classé réunit trois qualités. Si l'une manque, les deux autres plafonnent.",
        ],
        list: [
          "Technique — un site rapide, accessible, bien structuré et facile à explorer pour les moteurs.",
          "Éditorial et sémantique — des pages pertinentes, construites autour des recherches réelles de vos clients.",
          "Popularité et autorité — une présence crédible, renforcée par des liens et des mentions de qualité.",
        ],
      },
    ],
    services: [
      "audit-seo",
      "seo-technique",
      "seo-on-page",
      "mots-cles",
      "seo-local",
      "contenu-seo",
      "netlinking",
      "suivi-seo",
    ],
    faq: [
      {
        q: "Combien de temps faut-il pour voir des résultats en SEO ?",
        a: "Les corrections techniques peuvent produire des effets en quelques semaines, mais un positionnement durable se construit généralement sur plusieurs mois. Le délai dépend de l'état de départ du site, de la concurrence et du rythme de mise en œuvre. Nous fixons des indicateurs de suivi dès le départ pour mesurer la progression.",
      },
      {
        q: "Pouvez-vous garantir la première position sur Google ?",
        a: "Non, et personne ne le peut honnêtement : Google ne vend pas les positions naturelles et ses classements évoluent en permanence. Nous nous engageons sur une méthode, des actions concrètes et un suivi transparent.",
      },
      {
        q: "Travaillez-vous sur un site existant ou uniquement sur un nouveau site ?",
        a: "Les deux. Sur un site existant, nous commençons par un audit. Pour un nouveau site, nous intégrons le SEO dès la conception, ce qui évite de corriger plus tard — c'est la complémentarité avec Apollon, l'activité de création de sites du groupe.",
      },
    ],
    related: ["audit-seo", "seo-local", "geo", "referencement-naturel-nantes"],
    serviceType: "Référencement naturel (SEO)",
  },
  {
    slug: "geo",
    path: "/geo",
    label: "GEO",
    metaTitle: "GEO — être cité par ChatGPT, Gemini et Perplexity",
    metaDescription:
      "Generative Engine Optimization : audit de visibilité IA, optimisation des informations, autorité, contenus et suivi. Pour être mieux compris et pouvoir être cité par les moteurs génératifs.",
    kicker: "Expertise B · GEO",
    h1: "Être compris, et pouvoir être cité, par les moteurs génératifs.",
    lead:
      "Le GEO — Generative Engine Optimization — vise à améliorer les possibilités qu'une entreprise soit identifiée, citée et recommandée dans les réponses produites par ChatGPT, Gemini, Perplexity ou les réponses IA de Google.",
    art: "geo",
    sections: [
      {
        h2: "Pourquoi le GEO est une expertise à part entière",
        paragraphs: [
          "Un moteur de recherche classique affiche une liste de pages. Un moteur génératif rédige une réponse : il synthétise plusieurs sources, choisit les entreprises qu'il mentionne et cite parfois ses références. La question n'est plus seulement « quelle page est classée ? », mais « quelles informations sont reprises, et d'où viennent-elles ? ».",
          "En France, Google a activé ses Aperçus IA (AI Overviews) et son Mode IA à l'été 2026 : une partie des recherches commence désormais par une réponse générée, avant les liens classiques. Le GEO s'ajoute donc au SEO ; il ne le remplace pas, et il ne s'y résume pas.",
        ],
      },
      {
        h2: "SEO et GEO : la différence en une phrase",
        paragraphs: [
          "Le SEO améliore la présence de votre site dans les résultats de recherche. Le GEO améliore les possibilités que votre entreprise soit mentionnée et citée dans les réponses des moteurs génératifs.",
        ],
        list: [
          "Moteurs concernés : ChatGPT, Google AI Overviews et Mode IA, Gemini, Perplexity, Microsoft Copilot, Claude et les autres assistants qui s'appuient sur le web.",
          "Ce qui compte : la clarté et la cohérence des informations, la qualité des sources, des contenus précis et vérifiables.",
          "Ce que personne ne maîtrise : le choix final de l'assistant. Une citation n'est jamais garantie, et elle peut varier d'un jour, d'un moteur ou d'une formulation à l'autre.",
        ],
      },
    ],
    services: [
      "audit-visibilite-ia",
      "optimisation-generative",
      "autorite-sources",
      "contenu-geo",
      "suivi-geo",
    ],
    faq: [
      {
        q: "Le GEO remplace-t-il le SEO ?",
        a: "Non. Les moteurs génératifs s'appuient en grande partie sur des pages web bien explorées et bien structurées : un bon socle SEO reste indispensable. Le GEO ajoute un travail spécifique sur la clarté de l'identité, la structuration des informations, les sources et le suivi des réponses.",
      },
      {
        q: "Pouvez-vous garantir que ChatGPT recommandera mon entreprise ?",
        a: "Non. Aucun prestataire ne contrôle les réponses d'un assistant. Nous travaillons les conditions qui rendent une citation possible et pertinente, puis nous mesurons la présence de votre marque sur des requêtes définies ensemble.",
      },
      {
        q: "Comment mesure-t-on la visibilité dans les réponses IA ?",
        a: "En interrogeant régulièrement plusieurs assistants avec un panel de requêtes représentatives, puis en relevant les mentions de marque, les concurrents cités et les sources utilisées. Les résultats sont présentés comme une photographie à un moment donné, pas comme une donnée universelle.",
      },
    ],
    related: ["seo", "audit-seo", "seo-tpe-pme-artisans", "referencement-naturel-nantes"],
    serviceType: "Generative Engine Optimization (GEO)",
  },
  {
    slug: "audit-seo",
    path: "/audit-seo",
    label: "Audit SEO",
    metaTitle: "Audit SEO à Nantes — technique, contenus et IA",
    metaDescription:
      "Un audit SEO complet pour comprendre ce qui freine votre site : indexation, performances, structure, contenus, concurrence. Avec, en option, un audit de visibilité dans les réponses IA.",
    kicker: "Audit SEO & visibilité IA",
    h1: "L'audit SEO : comprendre avant d'optimiser.",
    lead:
      "Avant de corriger quoi que ce soit, il faut savoir où se trouvent les vrais freins. L'audit passe votre site en revue, couche par couche, et aboutit à un plan d'action priorisé.",
    art: "audit",
    sections: [
      {
        h2: "Ce que nous analysons",
        paragraphs: [
          "L'audit combine une exploration complète du site, l'analyse de vos données Google Search Console lorsque vous nous y donnez accès, et l'étude des sites qui se positionnent sur vos recherches cibles.",
        ],
        list: [
          "Exploration et indexation : pages découvertes, pages exclues, erreurs, redirections, doublons.",
          "Performances : Core Web Vitals (LCP, INP, CLS), poids des pages, expérience mobile.",
          "Architecture : profondeur des pages, maillage interne, URL, pages orphelines.",
          "Contenus : intentions couvertes, balises title et meta, structure des titres, contenus faibles ou en concurrence.",
          "Popularité : profil de liens entrants et signaux d'autorité.",
          "Concurrence : qui se positionne sur vos recherches, avec quels contenus.",
        ],
      },
      {
        h2: "Ce que vous recevez",
        paragraphs: [
          "Un rapport lisible, sans jargon inutile, qui distingue ce qui est mesuré de ce qui est estimé. Chaque recommandation est priorisée selon son impact attendu et l'effort qu'elle demande, pour que vous sachiez par où commencer — avec nous ou avec votre prestataire web.",
        ],
      },
      {
        h2: "Option : audit de visibilité dans les réponses IA",
        paragraphs: [
          "Nous testons un panel de requêtes sur plusieurs assistants (ChatGPT, Gemini, Perplexity, réponses IA de Google) pour voir si votre entreprise est mentionnée, comment elle est décrite et quelles sources sont citées. C'est une photographie à date, pas une mesure universelle.",
        ],
      },
    ],
    services: ["audit-seo", "audit-visibilite-ia"],
    faq: [
      {
        q: "De quels accès avez-vous besoin pour un audit SEO ?",
        a: "L'adresse du site suffit pour démarrer l'exploration. Un accès en lecture à Google Search Console et, si possible, à Google Analytics 4 permet d'appuyer l'analyse sur vos données réelles.",
      },
      {
        q: "L'audit inclut-il les corrections ?",
        a: "L'audit livre le diagnostic et le plan d'action. La mise en œuvre peut ensuite être réalisée par nos soins, par votre équipe ou par votre prestataire web : c'est vous qui choisissez.",
      },
    ],
    related: ["seo", "geo", "referencement-naturel-nantes", "seo-tpe-pme-artisans"],
    serviceType: "Audit SEO",
  },
  {
    slug: "seo-local",
    path: "/seo-local",
    label: "SEO local",
    metaTitle: "SEO local : Google Business Profile et Maps",
    metaDescription:
      "Être trouvé par les clients de votre zone : optimisation de la fiche Google Business Profile, cohérence des informations, avis clients et pages locales utiles. Nantes, Vendée, Pays de la Loire.",
    kicker: "SEO local",
    h1: "Devenir visible auprès des clients de votre zone.",
    lead:
      "Quand quelqu'un cherche un artisan, un cabinet ou un commerce « près de chez lui », Google combine votre fiche d'établissement, votre site et la cohérence de vos informations. Le SEO local travaille ces trois éléments ensemble.",
    art: "local",
    sections: [
      {
        h2: "Les leviers du référencement local",
        paragraphs: [
          "Le SEO local concerne toutes les entreprises qui servent une zone géographique, qu'elles reçoivent du public ou qu'elles se déplacent chez leurs clients.",
        ],
        list: [
          "Fiche Google Business Profile : catégories, services, zone desservie, description, photos, publications.",
          "Cohérence NAP : nom, adresse et téléphone identiques sur votre site, votre fiche et les annuaires sérieux.",
          "Avis clients : une démarche régulière et honnête pour en obtenir, et y répondre. Jamais de faux avis.",
          "Pages locales : uniquement lorsqu'elles apportent une information réelle et différente sur la zone servie.",
          "Signaux locaux : partenaires, presse et associations de votre territoire.",
        ],
      },
      {
        h2: "Des pages locales utiles, pas des copies",
        paragraphs: [
          "Multiplier des pages « ville + métier » presque identiques n'aide ni vos visiteurs ni votre référencement. Nous créons une page locale seulement lorsqu'elle répond à une intention distincte : zone d'intervention réelle, contraintes locales, exemples de prestations, informations pratiques.",
        ],
      },
    ],
    services: ["seo-local", "autorite-sources"],
    faq: [
      {
        q: "Faut-il une adresse physique pour apparaître sur Google Maps ?",
        a: "Une fiche Google Business Profile peut être créée pour une entreprise qui se déplace chez ses clients, en masquant l'adresse et en définissant une zone desservie. Les règles de Google doivent être respectées : nous vérifions votre situation avant toute création.",
      },
      {
        q: "Le SEO local est-il utile si je travaille aussi à distance ?",
        a: "Oui, si une partie de votre clientèle vient de votre région. Il complète alors un référencement plus large sur vos prestations.",
      },
    ],
    related: ["referencement-naturel-nantes", "referencement-naturel-vendee", "seo-tpe-pme-artisans", "seo"],
    serviceType: "Référencement local",
  },
  {
    slug: "referencement-naturel-nantes",
    path: "/referencement-naturel-nantes",
    label: "Nantes et Loire-Atlantique",
    metaTitle: "Référencement naturel à Nantes et Loire-Atlantique",
    metaDescription:
      "Consultant SEO et GEO indépendant pour les entreprises de Nantes et de Loire-Atlantique : audit, SEO technique, SEO local et visibilité dans les réponses IA. À distance ou sur rendez-vous.",
    kicker: "Nantes · Loire-Atlantique",
    h1: "Référencement naturel à Nantes et en Loire-Atlantique.",
    lead:
      "Hermès accompagne les entreprises nantaises et de Loire-Atlantique qui veulent être trouvées par leurs futurs clients — sur Google comme dans les réponses des assistants IA.",
    art: "nantes",
    sections: [
      {
        h2: "Un marché local très concurrentiel en ligne",
        paragraphs: [
          "Nantes concentre un tissu dense d'entreprises de services, d'agences, de commerces et d'artisans. Sur beaucoup de recherches, la première page est disputée : il ne suffit plus d'avoir un site, il faut un site techniquement propre, des pages qui répondent précisément aux questions des clients et une présence locale cohérente.",
          "Nous intervenons dans l'agglomération nantaise et dans le reste du département — de Saint-Nazaire et la presqu'île à Ancenis, du vignoble nantais au pays de Retz — à distance ou sur rendez-vous selon les besoins du projet. Hermès est une activité indépendante : nous ne prétendons pas disposer d'une agence physique.",
        ],
      },
      {
        h2: "Ce que nous travaillons pour les entreprises nantaises",
        paragraphs: [],
        list: [
          "Un audit pour savoir précisément où en est votre site et ce qui le freine.",
          "Le SEO technique et on-page de vos pages clés, en commençant par celles qui génèrent des demandes.",
          "Le SEO local : fiche Google Business Profile, cohérence des informations, avis.",
          "Des contenus qui répondent aux recherches réelles de vos clients en Loire-Atlantique.",
          "Le GEO, pour que les informations sur votre entreprise soient claires et reprises correctement par les assistants IA.",
        ],
      },
      {
        h2: "Pourquoi un accompagnement indépendant",
        paragraphs: [
          "Un interlocuteur unique, qui connaît votre site et votre marché, et qui associe SEO, conception web et automatisation grâce aux autres activités du Groupe BOURASSEAU. Pas de sous-traitance en cascade, pas de promesse de position.",
        ],
      },
    ],
    services: ["audit-seo", "seo-local", "audit-visibilite-ia"],
    faq: [
      {
        q: "Vous déplacez-vous à Nantes ?",
        a: "L'essentiel du travail se fait à distance, avec des points réguliers en visio. Des rendez-vous peuvent être organisés à Nantes et en Loire-Atlantique lorsque le projet le justifie.",
      },
      {
        q: "Travaillez-vous avec des TPE et des indépendants ?",
        a: "Oui. L'accompagnement est dimensionné selon votre activité : un audit et un plan d'action peuvent suffire pour démarrer, sans engagement long.",
      },
    ],
    related: ["referencement-naturel-vendee", "seo-local", "audit-seo", "seo-tpe-pme-artisans"],
    serviceType: "Référencement naturel",
  },
  {
    slug: "referencement-naturel-vendee",
    path: "/referencement-naturel-vendee",
    label: "Vendée",
    metaTitle: "Référencement naturel en Vendée — SEO & GEO",
    metaDescription:
      "SEO et GEO pour les entreprises de Vendée : La Roche-sur-Yon, Les Sables-d'Olonne, Montaigu-Vendée, Challans… Audit, SEO local, contenus et visibilité IA, à distance ou sur rendez-vous.",
    kicker: "Vendée",
    h1: "Référencement naturel pour les entreprises de Vendée.",
    lead:
      "Artisans, industriels, acteurs du tourisme, commerces et professions libérales : en Vendée, beaucoup d'entreprises ont une vraie expertise mais une visibilité en ligne encore limitée. C'est une opportunité.",
    art: "vendee",
    sections: [
      {
        h2: "Un territoire, des enjeux de recherche différents",
        paragraphs: [
          "Les recherches ne se ressemblent pas d'un bout à l'autre du département. Autour de La Roche-sur-Yon et de Montaigu-Vendée, les entreprises de services et l'industrie dominent ; sur le littoral — Les Sables-d'Olonne, Saint-Gilles-Croix-de-Vie, Saint-Jean-de-Monts — la saisonnalité et la clientèle touristique changent la donne ; dans le bocage et le sud Vendée, la proximité et le bouche-à-oreille se prolongent désormais sur Google.",
          "Notre approche part donc de vos clients réels : ce qu'ils cherchent, quand, et depuis où.",
        ],
      },
      {
        h2: "Ce que nous mettons en place",
        paragraphs: [],
        list: [
          "Une fiche Google Business Profile complète et à jour, avec une zone desservie exacte.",
          "Des pages de services claires, qui répondent aux questions de vos clients vendéens.",
          "Pour le tourisme : des contenus pensés pour la saisonnalité et les recherches des visiteurs.",
          "Un site rapide et lisible sur mobile, là où se font la plupart des recherches locales.",
          "Des informations d'entreprise cohérentes, pour être correctement repris par les assistants IA.",
        ],
      },
      {
        h2: "Un accompagnement à distance, au plus près",
        paragraphs: [
          "Hermès intervient pour les entreprises de toute la Vendée, principalement à distance, avec des rendez-vous possibles selon les projets. Nous ne prétendons pas avoir de bureau dans le département.",
        ],
      },
    ],
    services: ["seo-local", "contenu-seo", "optimisation-generative"],
    faq: [
      {
        q: "Mon activité est saisonnière : quand faut-il commencer le SEO ?",
        a: "Plusieurs mois avant la saison. Les contenus et les optimisations ont besoin de temps pour être explorés et pris en compte : on prépare l'été au printemps, voire en hiver.",
      },
      {
        q: "Je travaille surtout par bouche-à-oreille : le SEO a-t-il un intérêt ?",
        a: "Oui : une personne recommandée vérifie presque toujours votre entreprise en ligne avant d'appeler. Une fiche Google soignée et un site clair transforment cette recommandation en contact.",
      },
    ],
    related: ["referencement-naturel-nantes", "seo-local", "seo-tpe-pme-artisans", "geo"],
    serviceType: "Référencement naturel",
  },
  {
    slug: "seo-tpe-pme-artisans",
    path: "/seo-tpe-pme-artisans",
    label: "TPE, PME et artisans",
    metaTitle: "SEO pour TPE, PME, artisans et indépendants",
    metaDescription:
      "Référencement naturel et visibilité IA pour les TPE, PME, artisans et indépendants : un plan d'action réaliste, priorisé et adapté à vos moyens, sans jargon ni promesse intenable.",
    kicker: "TPE · PME · artisans · indépendants",
    h1: "Le SEO à la mesure des TPE, des PME et des artisans.",
    lead:
      "Vous n'avez ni le temps ni l'envie de devenir expert en référencement. Vous voulez que les bons clients vous trouvent. Notre travail : identifier les quelques actions qui comptent le plus pour votre activité, et les mettre en place.",
    art: "tpe",
    sections: [
      {
        h2: "Commencer par l'essentiel",
        paragraphs: [
          "Pour une petite structure, quelques actions bien choisies produisent souvent l'essentiel de l'effet : une fiche Google complète, des pages de services claires, un site rapide sur mobile et des informations cohérentes partout.",
        ],
        list: [
          "Un audit ciblé sur vos pages qui génèrent — ou devraient générer — des demandes.",
          "Un plan d'action priorisé, réaliste pour vos moyens humains et financiers.",
          "Une mise en œuvre par nos soins, ou un accompagnement pour la faire vous-même.",
          "Un suivi simple : quelques indicateurs compréhensibles, issus de vos propres outils.",
        ],
      },
      {
        h2: "Des métiers très différents, une même logique",
        paragraphs: [
          "Artisan du bâtiment, cabinet d'expertise, commerce, professionnel de santé, organisme de formation, entreprise industrielle : chaque métier a ses recherches spécifiques et ses contraintes. Nous partons toujours de la façon dont vos clients décrivent leur besoin.",
        ],
      },
    ],
    services: ["audit-seo", "seo-local", "contenu-seo"],
    faq: [
      {
        q: "Faut-il refaire mon site pour améliorer mon référencement ?",
        a: "Pas forcément. Beaucoup de sites peuvent être nettement améliorés sans refonte. Si le site freine réellement votre visibilité, nous vous le dirons — et Apollon, l'activité de création de sites du groupe, peut prendre le relais.",
      },
      {
        q: "Puis-je être accompagné sans engagement long ?",
        a: "Oui. Un audit avec plan d'action est une prestation à part entière. Un accompagnement régulier n'a de sens que s'il vous apporte de la valeur.",
      },
    ],
    related: ["seo-local", "audit-seo", "referencement-naturel-vendee", "referencement-naturel-nantes"],
    serviceType: "Référencement naturel pour TPE et PME",
  },
];

export const pageBySlug = (slug: string) => {
  const p = pages.find((x) => x.slug === slug);
  if (!p) throw new Error(`Page inconnue : ${slug}`);
  return p;
};
