"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="nf section">
      <div className="wrap nf-inner">
        <p className="kicker">Erreur</p>
        <h1 className="lp-title">Un incident est survenu.</h1>
        <p className="lp-lead">La page n&apos;a pas pu s&apos;afficher correctement.</p>
        <ul className="nf-links">
          <li>
            <button type="button" className="btn btn-ghost" onClick={reset}>
              <span>Réessayer</span>
            </button>
          </li>
          <li>
            <Link href="/" className="link-arrow">Retour à l&apos;accueil</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
