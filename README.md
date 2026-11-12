# Hermès — SEO & GEO

Site indépendant de l'activité **SEO & GEO** du Groupe BOURASSEAU.
Direction artistique : **Le Messager** — crème dominant, bleu nuit en rupture, or doux ;
Hermès (détouré depuis l'illustration fournie) comme fil narratif, ses rubans devenus traînées de lumière.
Aucun code partagé avec le site du groupe, Athéna, Apollon ou SYNATRAP.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3005
npm run build && npm start
npm run typecheck && npm run lint
```

Node 22, Next.js 16 (App Router), React 19, GSAP + ScrollTrigger + MotionPath, Lenis. Aucune autre dépendance.

## Règle de contenu

Rien n'est inventé : pas d'avis, de logos clients, de résultats ni de bureau physique.
Les visualisations de données sont étiquetées « illustratives » ou « démonstration ».
Aucune promesse de position Google ni de citation par une IA.

| Fichier | Contenu |
| --- | --- |
| `src/content/site.ts` | Contact, liens du groupe (Athéna/Apollon : adresses Vercel provisoires à remplacer), mentions légales (`null` = à compléter) |
| `src/content/services.ts` | Les 13 prestations (8 SEO, 5 GEO) |
| `src/content/pages.ts` | Les 7 pages de destination (titres, descriptions, sections, FAQ, maillage) |

## Architecture SEO

| URL | Intention visée |
| --- | --- |
| `/` | consultant SEO & GEO Nantes / Vendée (marque + offre globale) |
| `/seo` | consultant SEO Nantes, référencement naturel |
| `/geo` | GEO, visibilité ChatGPT / Gemini / Perplexity / AI Overviews |
| `/audit-seo` | audit SEO Nantes (+ audit de visibilité IA) |
| `/seo-local` | SEO local, Google Business Profile, Google Maps |
| `/referencement-naturel-nantes` | Nantes et Loire-Atlantique |
| `/referencement-naturel-vendee` | Vendée (La Roche-sur-Yon, littoral, bocage) |
| `/seo-tpe-pme-artisans` | SEO pour TPE, PME, artisans, indépendants |
| `/contact`, `/mentions-legales`, `/confidentialite` | — |

Pas de page Pays de la Loire distincte (couverte par l'accueil) ni de pages « ville » répétitives.
Données structurées : `Organization` (avec `parentOrganization`), `WebSite`, `Service`, `BreadcrumbList`.
Pas de `LocalBusiness` : aucune adresse d'établissement n'est publiée.

## Formulaire de contact

Route `/api/contact`, même logique qu'Athéna : validation serveur, champ piège, limite de 4 envois/heure/IP,
envoi via l'API Resend. La confirmation n'apparaît que si Resend a accepté l'e-mail.

Variables à définir sur Vercel (voir `.env.example`) :
`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (domaine vérifié dans Resend).
Sans elles : le formulaire est affiché désactivé, l'API répond 503 et l'adresse e-mail reste proposée.
Les pages sont statiques : **redéployer** après avoir ajouté les variables.

## Indexation

Previews et local : `noindex` + `robots.txt` bloquant. Seul l'environnement de production Vercel est indexable
(ou `NEXT_PUBLIC_ALLOW_INDEXING=true`). Définir `NEXT_PUBLIC_SITE_URL` avec le domaine définitif.

## Animations

- Introduction cinématique en Canvas 2D temps réel (`src/components/home/Intro.tsx`), une fois par session,
  interruptible, absente avec `prefers-reduced-motion`, allégée sur mobile et appareils peu puissants.
- Hero : ciel d'origine (couche A), Hermès détouré corps + bras/caducée animé (couche B),
  silhouette vectorielle pour l'intro, le logo et les transitions (couche C, `src/lib/hermes-paths.ts`).
- Film du SEO épinglé (GSAP ScrollTrigger), rubans tracés au défilement, 13 animations SVG de prestations,
  comparaison SEO/GEO, avant/après, méthode (MotionPath), carte locale.
- Les initialisations non critiques sont différées (`onIdle`) pour limiter les longues tâches.

## Images

`public/images/` : couches dérivées de l'illustration d'Hermès fournie par le propriétaire du projet
(détourage, retouche des trous et des bords, ciel reconstitué). La source fait 640 × 578 px :
remplacer par une version haute définition si elle existe. **Droits d'utilisation de l'illustration à confirmer**
(monogramme d'artiste présent sur l'original).

## Avant publication

- Mentions légales : éditeur, statut, SIREN, adresse, directeur de la publication, hébergeur.
- Variables Resend et domaine définitif.
- URLs définitives d'Athéna et d'Apollon dans `src/content/site.ts`.
- Lien Hermès du site du groupe à pointer vers le domaine définitif (ne pas modifier sans accord).

## Déploiement

Projet Vercel dédié à créer. Aucune mise en production sans validation explicite du propriétaire.
