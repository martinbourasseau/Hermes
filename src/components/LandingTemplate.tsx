import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { pageBySlug, pages, type LandingPage } from "@/content/pages";
import { allServices } from "@/content/services";
import { ServiceCard } from "@/components/ServiceCard";
import { HermesMark } from "@/components/Mark";
import { Ribbon } from "@/components/Ribbon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export function landingMetadata(slug: string): Metadata {
  const p = pageBySlug(slug);
  return {
    title: { absolute: `${p.metaTitle} · Hermès` },
    description: p.metaDescription,
    alternates: { canonical: p.path },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url: p.path,
      type: "website",
      locale: "fr_FR",
      siteName: "Hermès — SEO & GEO",
      images: [{ url: "/images/og-hermes.jpg", width: 1200, height: 630, alt: "Hermès, SEO & GEO" }],
    },
    twitter: { card: "summary_large_image", title: p.metaTitle, description: p.metaDescription, images: ["/images/og-hermes.jpg"] },
  };
}

const TONE: Record<LandingPage["art"], "gold" | "blue"> = {
  seo: "gold",
  geo: "blue",
  audit: "gold",
  local: "gold",
  nantes: "gold",
  vendee: "gold",
  tpe: "gold",
};

/** Gabarit des pages de destination : hero, contenus, prestations, FAQ, maillage, appel à l'action. */
export function LandingTemplate({ slug }: { slug: string }) {
  const p = pageBySlug(slug);
  const services = (p.services ?? []).map((id) => allServices.find((s) => s.id === id)!).filter(Boolean);
  const related = p.related.map((s) => pages.find((x) => x.slug === s)!).filter(Boolean);
  const isGeo = p.art === "geo";

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: p.h1.replace(/\.$/, ""), serviceType: p.serviceType, description: p.metaDescription, path: p.path }),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: p.label, path: p.path },
          ]),
        ]}
      />
      <section className={`lp-hero${isGeo ? " lp-hero-night" : ""}`} aria-labelledby="lp-title">
        <div className="lp-hero-art" aria-hidden="true">
          <span className="lp-halo" />
          <HermesMark detailed className="lp-mark" />
          <Ribbon d="M-40 300 C 260 80, 520 420, 820 200 S 1220 40, 1480 160" tone={TONE[p.art]} start="top top" end="bottom top" />
        </div>
        <div className="wrap lp-hero-inner">
          <nav className="crumbs mono" aria-label="Fil d'Ariane">
            <ol>
              <li>
                <Link href="/">Accueil</Link>
              </li>
              <li aria-current="page">{p.label}</li>
            </ol>
          </nav>
          <p className={`kicker${isGeo ? " kicker-light" : ""}`}>{p.kicker}</p>
          <h1 id="lp-title" className="lp-title" data-split>
            {p.h1}
          </h1>
          <p className="lp-lead" data-reveal>
            {p.lead}
          </p>
          <div className="hero-ctas" data-reveal>
            <Link href={`/contact?besoin=${isGeo ? "geo" : p.slug === "audit-seo" ? "audit" : "seo"}`} className="btn btn-gold">
              <span>Parlons de votre visibilité</span>
            </Link>
            <a href="#prestations" className={`btn ${isGeo ? "btn-light-ghost" : "btn-ghost"}`}>
              <span>Voir les prestations</span>
            </a>
          </div>
        </div>
      </section>

      <div className="lp-content section">
        <div className="wrap lp-grid">
          <div className="lp-text">
            {p.sections.map((s, i) => (
              <section key={s.h2} className="lp-section" id={s.id} data-reveal style={{ "--i": i } as CSSProperties}>
                <h2>{s.h2}</h2>
                {s.paragraphs.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
                {s.list ? (
                  <ul className="lp-list">
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
          <aside className="lp-aside" aria-label="Pour aller plus loin">
            <div className="lp-aside-card">
              <p className="mono">Sur ce sujet</p>
              <ul>
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={r.path} className="link-arrow">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lp-aside-card lp-aside-cta">
              <p>Un audit pour savoir précisément où en est votre site.</p>
              <Link href="/contact?besoin=audit" className="link-arrow link-arrow-gold">
                Faire analyser mon site
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {services.length ? (
        <section className={`section lp-services${isGeo ? " section-night" : " section-ivory"}`} id="prestations" aria-labelledby="lp-svc" tabIndex={-1}>
          <div className="wrap">
            <p className={`kicker${isGeo ? " kicker-light" : ""}`}>Prestations</p>
            <h2 id="lp-svc" className="h-section" data-split>
              {isGeo ? "Cinq prestations GEO." : "Ce que nous mettons en place."}
            </h2>
            <div className={`bento${isGeo ? " bento-geo" : ""}`}>
              {services.map((s, i) => (
                <ServiceCard key={s.id} s={s} size={services.length === 1 || (services.length % 2 === 1 && i === 0) ? "l" : "m"} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section lp-faq" aria-labelledby="faq-title">
        <div className="wrap faq-wrap">
          <p className="kicker">Questions fréquentes</p>
          <h2 id="faq-title" className="h-section" data-split>
            Vos questions, nos réponses.
          </h2>
          <div className="faq">
            {p.faq.map((f) => (
              <details key={f.q} className="faq-item" data-reveal>
                <summary>
                  <span>{f.q}</span>
                  <span className="svc-plus" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="cta-band-title">
        <div className="wrap cta-band-inner" data-reveal>
          <HermesMark className="cta-band-mark" />
          <h2 id="cta-band-title">Votre prochaine opportunité commence par votre visibilité.</h2>
          <div className="cta-row">
            <Link href="/contact" className="btn btn-gold">
              <span>Discuter de mon projet</span>
            </Link>
            <Link href="/contact?besoin=audit" className="link-arrow">
              Faire analyser mon site
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
