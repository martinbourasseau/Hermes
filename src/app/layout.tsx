import type { Metadata, Viewport } from "next";
import "./globals.css";
import { manrope, mono, unbounded } from "./fonts";
import { site } from "@/content/site";
import { isIndexable, siteUrl } from "@/lib/env";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const title = "Consultant SEO & GEO à Nantes et en Vendée · Hermès";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s · Hermès" },
  description: site.description,
  applicationName: "Hermès",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: "Hermès — SEO & GEO",
    title,
    description: site.description,
    images: [{ url: "/images/og-hermes.jpg", width: 1200, height: 630, alt: "Hermès, SEO & GEO — une activité du Groupe BOURASSEAU" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/images/og-hermes.jpg"],
  },
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F6F1E7",
  colorScheme: "light",
};

/**
 * Pose la classe `js` avant le premier affichage (sauf si l'utilisateur
 * a demandé moins d'animations). Filet de sécurité : si le moteur ne
 * démarre pas en 3 s, la classe est retirée et tout s'affiche.
 */
const boot = `(function(r){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;r.classList.add('js');try{if(location.pathname==='/'&&!sessionStorage.getItem('hermes-intro'))r.classList.add('intro-pending')}catch(e){}setTimeout(function(){if(!r.classList.contains('motion-ready'))r.classList.remove('js')},3000);setTimeout(function(){if(!r.classList.contains('intro-playing')&&!r.classList.contains('intro-done')){r.classList.remove('intro-pending')}},4500)})(document.documentElement)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${unbounded.variable} ${manrope.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
