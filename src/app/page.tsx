import Link from "next/link";
import type { CSSProperties } from "react";
import { Intro } from "@/components/home/Intro";
import { HeroStage } from "@/components/home/HeroStage";
import { SeoFilm } from "@/components/home/SeoFilm";
import { Compare } from "@/components/home/Compare";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Method } from "@/components/home/Method";
import { LocalMap } from "@/components/home/LocalMap";
import { Ribbon } from "@/components/Ribbon";
import { ServiceCard } from "@/components/ServiceCard";
import { ContactForm } from "@/components/ContactForm";
import { HermesMark } from "@/components/Mark";
import { JsonLd } from "@/components/JsonLd";
import { geoServices, seoServices } from "@/content/services";
import { site } from "@/content/site";
import { isFormConfigured } from "@/lib/env";
import { serviceSchema } from "@/lib/schema";

const PILLARS = [
  {
    k: "Technique",
    t: "Un site rapide, accessible, bien structuré et compréhensible par les moteurs de recherche.",
    art: "layers",
  },
  {
    k: "Éditorial & sémantique",
    t: "Des pages pertinentes, des mots-clés adaptés et des contenus qui répondent réellement aux recherches de vos clients.",
    art: "lines",
  },
  {
    k: "Popularité & autorité",
    t: "Une présence crédible, un maillage pertinent et des liens de qualité qui renforcent la confiance accordée à votre site.",
    art: "nodes",
  },
];

function PillarArt({ kind }: { kind: string }) {
  if (kind === "layers")
    return (
      <svg viewBox="0 0 120 90" className="pl-art pl-layers" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <path key={i} d="M60 20 L100 38 L60 56 L20 38 Z" style={{ "--i": i } as CSSProperties} />
        ))}
      </svg>
    );
  if (kind === "lines")
    return (
      <svg viewBox="0 0 120 90" className="pl-art pl-lines" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="20" y={18 + i * 12} width={[70, 56, 80, 48, 64][i]} height={i === 0 ? 7 : 4} rx="2" style={{ "--i": i } as CSSProperties} />
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 120 90" className="pl-art pl-nodes" aria-hidden="true">
      {[
        [20, 20],
        [100, 18],
        [104, 72],
        [16, 70],
      ].map(([x, y], i) => (
        <g key={i} style={{ "--i": i } as CSSProperties}>
          <path d={`M${x} ${y} L60 45`} pathLength={1} />
          <circle cx={x} cy={y} r="5" />
        </g>
      ))}
      <circle cx="60" cy="45" r="11" className="pl-hub" />
    </svg>
  );
}

export default function Home() {
  const configured = isFormConfigured();
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Accompagnement SEO & GEO",
          serviceType: "Référencement naturel et Generative Engine Optimization",
          description: site.description,
          path: "/",
        })}
      />
      <Intro />

      {/* 01 — HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-bg" aria-hidden="true">
          <span className="hero-sun" />
        </div>
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker mono" data-hero-in style={{ "--i": 0 } as CSSProperties}>
              HERMÈS · SEO &amp; GEO
            </p>
            <h1 id="hero-title" className="hero-title" data-hero-in style={{ "--i": 1 } as CSSProperties}>
              Votre visibilité mérite une stratégie.
            </h1>
            <p className="hero-sub" data-hero-in style={{ "--i": 2 } as CSSProperties}>
              SEO &amp; GEO — Référencement naturel et visibilité dans les moteurs de recherche nouvelle génération.
            </p>
            <div className="hero-ctas" data-hero-in style={{ "--i": 3 } as CSSProperties}>
              <Link href="/contact" className="btn btn-gold">
                <span>Parlons de votre visibilité</span>
              </Link>
              <a href="#expertise" className="btn btn-ghost">
                <span>Découvrir notre expertise</span>
              </a>
            </div>
            <p className="hero-zone mono" data-hero-in style={{ "--i": 4 } as CSSProperties}>
              Nantes · Loire-Atlantique · Vendée · Pays de la Loire
            </p>
          </div>
          <HeroStage />
        </div>
        <p className="hero-scroll mono" aria-hidden="true">
          <span />
          Défiler
        </p>
      </section>

      <div className="ribbon-band" aria-hidden="true">
        <Ribbon d="M-20 80 C 260 260, 520 -40, 760 140 S 1180 300, 1460 60" tone="gold" />
      </div>

      {/* 02 — FILM DU SEO */}
      <SeoFilm />

      {/* 03 — SEO & GEO EXPLIQUÉS */}
      <section className="explain section" aria-labelledby="explain-title">
        <div className="wrap">
          <p className="kicker">L&apos;essentiel</p>
          <h2 id="explain-title" className="h-display" data-split>
            Le SEO, c&apos;est être visible au bon moment.
          </h2>
          <div className="explain-grid">
            <p className="lead" data-reveal>
              Le référencement naturel permet à votre site d&apos;apparaître dans les résultats des moteurs de recherche
              lorsque vos futurs clients recherchent vos services. Nous travaillons votre site pour améliorer sa visibilité,
              attirer un trafic qualifié et développer votre activité durablement.
            </p>
            <div className="explain-duo" data-reveal>
              <div className="duo duo-seo">
                <p className="mono">SEO</p>
                <p>Améliorer la présence de votre site dans les résultats de recherche.</p>
              </div>
              <div className="duo duo-geo">
                <p className="mono">GEO</p>
                <p>Améliorer les possibilités d&apos;être mentionné et cité dans les réponses des moteurs génératifs.</p>
              </div>
            </div>
          </div>
          <ol className="pillars">
            {PILLARS.map((p, i) => (
              <li key={p.k} className="pillar" data-inview data-reveal style={{ "--i": i } as CSSProperties}>
                <PillarArt kind={p.art} />
                <span className="pillar-n mono">0{i + 1}</span>
                <h3>{p.k}</h3>
                <p>{p.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — PRESTATIONS SEO */}
      <section className="services section" id="expertise" aria-labelledby="seo-title" tabIndex={-1}>
        <div className="wrap">
          <div className="services-head">
            <div>
              <p className="kicker">Expertise A · SEO</p>
              <h2 id="seo-title" className="h-section" data-split>
                Huit leviers pour être trouvé sur Google.
              </h2>
            </div>
            <p className="lead" data-reveal>
              Chaque prestation peut être menée seule ou s&apos;intégrer dans un accompagnement global. Toutes partent du
              même principe : comprendre avant d&apos;agir, et mesurer ce qui change.
            </p>
          </div>
          <div className="bento">
            {seoServices.map((s, i) => (
              <ServiceCard key={s.id} s={s} size={i === 0 || i === 7 ? "l" : "m"} />
            ))}
          </div>
          <p className="services-more" data-reveal>
            <Link href="/seo" className="link-arrow">
              Toute l&apos;expertise SEO
            </Link>
          </p>
        </div>
      </section>

      {/* 05 — GEO : RUPTURE BLEU NUIT */}
      <section className="geo section section-night" id="geo" aria-labelledby="geo-title" tabIndex={-1}>
        <div className="geo-sky" aria-hidden="true">
          <Ribbon d="M-40 420 C 300 180, 560 520, 860 260 S 1260 40, 1480 200" tone="blue" strands={4} start="top 90%" end="bottom 20%" />
          <span className="geo-stars" />
        </div>
        <div className="wrap">
          <div className="services-head">
            <div>
              <p className="kicker kicker-light">Expertise B · GEO</p>
              <h2 id="geo-title" className="h-section" data-split>
                Être cité là où les réponses s&apos;écrivent.
              </h2>
            </div>
            <div data-reveal>
              <p className="lead">
                Le GEO — Generative Engine Optimization — vise à améliorer les possibilités qu&apos;une entreprise soit
                comprise, identifiée, citée et recommandée par ChatGPT, Gemini, Perplexity ou les réponses IA de Google.
              </p>
              <p className="geo-warning">
                Aucune citation n&apos;est garantie : les réponses varient selon le moteur, la question, le contexte et le
                moment. Nous travaillons les conditions qui rendent une citation possible, puis nous la mesurons.
              </p>
            </div>
          </div>
          <div className="bento bento-geo">
            {geoServices.map((s, i) => (
              <ServiceCard key={s.id} s={s} size={i === 0 ? "l" : "m"} />
            ))}
          </div>
          <p className="services-more" data-reveal>
            <Link href="/geo" className="link-arrow link-arrow-light">
              Toute l&apos;expertise GEO
            </Link>
          </p>
        </div>
      </section>

      {/* 06 — SEO + GEO */}
      <Compare />

      {/* 07 — AVANT / APRÈS */}
      <BeforeAfter />

      {/* 08 — MÉTHODE */}
      <Method />

      {/* 09 — LOCAL */}
      <LocalMap />

      {/* 10 — APOLLON */}
      <section className="apollon section" aria-labelledby="apollon-title">
        <div className="wrap apollon-grid">
          <div className="apollon-visual" data-inview aria-hidden="true">
            <div className="ap-screen">
              <div className="ap-layer ap-wire">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="ap-layer ap-design">
                <span className="ap-h" />
                <span className="ap-p" />
                <span className="ap-b" />
                <span className="ap-img" />
              </div>
              <div className="ap-layer ap-perf">
                <span className="ap-gauge" />
                <span className="ap-gauge" />
                <span className="ap-gauge" />
              </div>
            </div>
            <ul className="ap-steps mono">
              <li>Conception</li>
              <li>Design</li>
              <li>Performance</li>
            </ul>
          </div>
          <div>
            <p className="kicker">Avec Apollon</p>
            <h2 id="apollon-title" className="h-section" data-split>
              Un site web, plus qu&apos;une vitrine.
            </h2>
            <p className="lead" data-reveal>
              Un site performant ne se contente pas d&apos;être beau. Il doit aussi être visible, rapide et conçu pour
              convertir. Le SEO donne ses meilleurs résultats lorsqu&apos;il est pensé dès la conception.
            </p>
            <ul className="chips" data-reveal>
              <li>Conception web</li>
              <li>Architecture technique</li>
              <li>Expérience utilisateur</li>
              <li>Référencement naturel</li>
              <li>Conversion</li>
            </ul>
            <p data-reveal>
              Apollon, l&apos;activité de création de sites du Groupe BOURASSEAU, conçoit le site ; Hermès s&apos;assure
              qu&apos;il soit trouvé. Pour un nouveau site comme pour une refonte.
            </p>
            <div className="cta-row" data-reveal>
              {site.links.apollon ? (
                <a href={site.links.apollon} className="btn btn-ghost" target="_blank" rel="noopener">
                  <span>Découvrir Apollon</span>
                </a>
              ) : null}
              <Link href="/contact?besoin=site" className="link-arrow link-arrow-gold">
                Discuter de mon projet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11 — SYNATRAP */}
      <section className="synatrap section section-night-soft" aria-labelledby="syn-title">
        <div className="wrap syn-grid">
          <div>
            <p className="kicker kicker-light">SEO × intelligence artificielle</p>
            <h2 id="syn-title" className="h-section h-long" data-split>
              Attirez les bonnes personnes grâce au SEO. Optimisez ensuite vos opérations grâce à l&apos;IA.
            </h2>
            <p className="lead" data-reveal>
              SYNATRAP est la plateforme du groupe spécialisée dans les agents IA et l&apos;automatisation intelligente. Les
              deux activités sont distinctes et complémentaires : Hermès développe votre visibilité, SYNATRAP vous aide à
              automatiser et fluidifier certaines opérations une fois les demandes arrivées.
            </p>
            <a href={site.links.synatrap} className="btn btn-light" target="_blank" rel="noopener" data-reveal>
              <span>Découvrir SYNATRAP</span>
            </a>
          </div>
          <div className="syn-flow" data-inview data-inview-loop aria-hidden="true">
            <div className="syn-col">
              <span className="syn-k mono">Visibilité</span>
              <span className="syn-node">SEO</span>
              <span className="syn-node">GEO</span>
            </div>
            <div className="syn-pipe">
              {Array.from({ length: 6 }, (_, i) => (
                <i key={i} style={{ "--i": i } as CSSProperties} />
              ))}
            </div>
            <div className="syn-col">
              <span className="syn-k mono">Demandes</span>
              <span className="syn-node syn-node-gold">Contacts</span>
            </div>
            <div className="syn-pipe syn-pipe-2">
              {Array.from({ length: 6 }, (_, i) => (
                <i key={i} style={{ "--i": i } as CSSProperties} />
              ))}
            </div>
            <div className="syn-col">
              <span className="syn-k mono">Opérations</span>
              <span className="syn-node">Agents IA</span>
              <span className="syn-node">Workflows</span>
            </div>
          </div>
        </div>
      </section>

      {/* 12 — LE GROUPE */}
      <section className="group section" aria-labelledby="group-title">
        <div className="wrap">
          <p className="kicker">Le Groupe BOURASSEAU</p>
          <h2 id="group-title" className="h-section" data-split>
            Une expertise, une divinité, un univers.
          </h2>
          <p className="lead" data-reveal>
            HERMÈS est une activité du Groupe BOURASSEAU, qui réunit plusieurs expertises numériques complémentaires, chacune
            avec son propre site et son propre univers.
          </p>
          <ul className="group-grid">
            <li className="g-card g-hermes is-current" data-reveal style={{ "--i": 0 } as CSSProperties}>
              <span className="g-k mono">Vous êtes ici</span>
              <h3>Hermès</h3>
              <p>SEO, GEO et visibilité dans les moteurs de recherche.</p>
            </li>
            {site.links.apollon ? (
              <li className="g-card g-apollon" data-reveal style={{ "--i": 1 } as CSSProperties}>
                <span className="g-k mono">Création web</span>
                <h3>Apollon</h3>
                <p>Conception et création de sites web.</p>
                <a href={site.links.apollon} target="_blank" rel="noopener" className="link-arrow">
                  Visiter Apollon
                </a>
              </li>
            ) : null}
            {site.links.athena ? (
              <li className="g-card g-athena" data-reveal style={{ "--i": 2 } as CSSProperties}>
                <span className="g-k mono">Agents IA</span>
                <h3>Athéna</h3>
                <p>Agents IA et automatisation intelligente sur mesure.</p>
                <a href={site.links.athena} target="_blank" rel="noopener" className="link-arrow">
                  Visiter Athéna
                </a>
              </li>
            ) : null}
            <li className="g-card g-synatrap" data-reveal style={{ "--i": 3 } as CSSProperties}>
              <span className="g-k mono">Plateforme</span>
              <h3>SYNATRAP</h3>
              <p>La plateforme d&apos;agents IA du groupe.</p>
              <a href={site.links.synatrap} target="_blank" rel="noopener" className="link-arrow">
                Visiter SYNATRAP
              </a>
            </li>
          </ul>
          <p className="group-back" data-reveal>
            <a href={site.group.url} target="_blank" rel="noopener" className="link-arrow">
              Revenir au site du Groupe BOURASSEAU
            </a>
          </p>
        </div>
      </section>

      {/* 13 — FINAL + CONTACT */}
      <section className="final" id="contact" aria-labelledby="final-title" tabIndex={-1}>
        <div className="final-stage" data-inview aria-hidden="true">
          <span className="final-halo" />
          <HermesMark detailed className="final-mark" />
          <Ribbon d="M-40 380 C 260 120, 560 520, 860 240 S 1240 60, 1480 180" tone="light" start="top 80%" end="center 40%" />
        </div>
        <div className="wrap final-inner">
          <p className="final-manifesto mono" data-reveal>
            {site.manifesto}
          </p>
          <h2 id="final-title" className="h-display" data-split>
            Votre prochaine opportunité commence par votre visibilité.
          </h2>
          <p className="lead" data-reveal>
            Donnons à votre site les moyens d&apos;être trouvé — et à votre entreprise ceux d&apos;être citée.
          </p>
          <div className="final-form" data-reveal>
            <div className="final-form-head">
              <h3>Parlons de votre projet</h3>
              <p>Réponse personnalisée, sans engagement. Indiquez votre site si vous en avez un : nous le regarderons avant de vous répondre.</p>
            </div>
            <ContactForm configured={configured} />
          </div>
          <p className="final-sign" data-reveal>
            <span className="final-word">HERMÈS</span>
            <span>SEO &amp; Référencement naturel · GEO &amp; visibilité IA</span>
            <span>
              Une activité du{" "}
              <a href={site.group.url} target="_blank" rel="noopener">
                Groupe BOURASSEAU
              </a>
              .
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
