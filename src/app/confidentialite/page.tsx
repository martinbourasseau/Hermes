import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false, follow: true },
};

export default function Confidentialite() {
  return (
    <section className="legal section">
      <div className="wrap legal-inner">
        <p className="kicker">Données personnelles</p>
        <h1 className="lp-title">Politique de confidentialité</h1>
        <h2>Données collectées</h2>
        <p>
          Les seules données personnelles collectées sont celles que vous saisissez dans le formulaire de contact : nom,
          adresse e-mail, entreprise, adresse de votre site, type de prestation et message.
        </p>
        <h2>Finalité et base légale</h2>
        <p>
          Elles servent uniquement à répondre à votre demande, sur la base de votre consentement exprimé dans le
          formulaire. Elles ne sont ni revendues ni utilisées à des fins de prospection automatisée.
        </p>
        <h2>Transmission</h2>
        <p>
          Le message est transmis par e-mail via le service d&apos;envoi Resend, puis conservé dans la boîte de réception de
          l&apos;éditeur le temps nécessaire au traitement de la demande et au suivi de la relation.
        </p>
        <h2>Cookies</h2>
        <p>
          Ce site n&apos;utilise aucun cookie de mesure d&apos;audience ni de publicité. Une préférence technique peut être
          conservée dans votre navigateur pour la durée de la session (ne pas rejouer l&apos;animation d&apos;introduction) ;
          elle ne contient aucune donnée personnelle.
        </p>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en écrivant à{" "}
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. Vous pouvez également introduire une
          réclamation auprès de la CNIL.
        </p>
      </div>
    </section>
  );
}
