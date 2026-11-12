import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { HermesMark } from "@/components/Mark";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { isFormConfigured } from "@/lib/env";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact — parlons de votre visibilité",
  description:
    "Une question sur le SEO ou le GEO de votre site ? Décrivez votre projet : audit, SEO technique, SEO local, visibilité IA ou création de site. Nantes, Vendée, Pays de la Loire.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact — Hermès, SEO & GEO", url: "/contact", images: [{ url: "/images/og-hermes.jpg", width: 1200, height: 630 }] },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <section className="contact-page section" aria-labelledby="contact-title">
        <div className="contact-art" aria-hidden="true">
          <span className="lp-halo" />
          <HermesMark detailed className="lp-mark" />
        </div>
        <div className="wrap contact-grid">
          <div className="contact-copy">
            <nav className="crumbs mono" aria-label="Fil d'Ariane">
              <ol>
                <li>
                  <Link href="/">Accueil</Link>
                </li>
                <li aria-current="page">Contact</li>
              </ol>
            </nav>
            <p className="kicker">Contact</p>
            <h1 id="contact-title" className="lp-title" data-split>
              Parlons de votre visibilité.
            </h1>
            <p className="lp-lead" data-reveal>
              Décrivez votre activité et ce que vous attendez de votre site. Nous regardons votre situation avant de vous
              répondre, pour vous proposer une suite concrète — même si elle se limite à quelques conseils.
            </p>
            <ul className="contact-facts" data-reveal>
              <li>
                <span className="mono">E-mail</span>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </li>
              <li>
                <span className="mono">Zone</span>
                <span>Nantes, Loire-Atlantique, Vendée, Pays de la Loire — à distance ou sur rendez-vous</span>
              </li>
              <li>
                <span className="mono">Statut</span>
                <span>Activité indépendante du Groupe BOURASSEAU</span>
              </li>
            </ul>
          </div>
          <div className="contact-form-wrap" data-reveal>
            <ContactForm configured={isFormConfigured()} />
          </div>
        </div>
      </section>
    </>
  );
}
