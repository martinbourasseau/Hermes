"use client";

import { useState } from "react";

const AXES = [
  { k: "Structure", before: "Titres absents ou dupliqués", after: "Hiérarchie H1 → H3 claire" },
  { k: "Performance", before: "Images lourdes, chargement lent", after: "Ressources optimisées" },
  { k: "Contenu", before: "Textes génériques", after: "Réponses aux recherches réelles" },
  { k: "Mobile", before: "Mise en page cassée", after: "Lecture fluide sur mobile" },
  { k: "Indexation", before: "Pages bloquées ou en double", after: "Pages utiles indexées" },
  { k: "Maillage", before: "Pages isolées", after: "Pages reliées entre elles" },
];

function MockSite({ variant }: { variant: "before" | "after" }) {
  return (
    <div className={`ba-site ba-${variant}`} aria-hidden="true">
      <div className="ba-nav">
        <span className="ba-logo" />
        <span className="ba-links">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="ba-hero">
        <span className="ba-h1" />
        <span className="ba-p" />
        <span className="ba-p ba-p-s" />
        <span className="ba-btn" />
      </div>
      <div className="ba-cards">
        <span />
        <span />
        <span />
      </div>
      <div className="ba-links-net">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

/** Avant / après : curseur de comparaison (souris, tactile, clavier). */
export function BeforeAfter() {
  const [pos, setPos] = useState(50);

  return (
    <section className="ba section" aria-labelledby="ba-title">
      <div className="wrap">
        <p className="kicker">Avant / après</p>
        <h2 id="ba-title" className="h-section" data-split>
          Votre site possède peut-être un potentiel inexploité.
        </h2>
        <p className="lead" data-reveal>
          Faites glisser le curseur : le même site, avant et après un travail SEO. Une optimisation ne garantit pas une
          première position ; elle donne à votre site les moyens d&apos;être compris et choisi.
        </p>

        <div
          className="ba-box"
          style={{ "--pos": `${pos}%` } as React.CSSProperties}
        >
          <div className="ba-layer ba-layer-after">
            <MockSite variant="after" />
            <span className="ba-tag ba-tag-after mono">Après</span>
          </div>
          <div className="ba-layer ba-layer-before">
            <MockSite variant="before" />
            <span className="ba-tag ba-tag-before mono">Avant</span>
          </div>
          <div className="ba-handle" aria-hidden="true">
            <span />
          </div>
          <input
            className="ba-range"
            type="range"
            min={0}
            max={100}
            value={Math.round(pos)}
            onInput={(e) => setPos(Number((e.target as HTMLInputElement).value))}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Comparer le site avant et après optimisation"
          />
        </div>

        <ul className="ba-axes">
          {AXES.map((a, i) => (
            <li key={a.k} className={pos < 100 - (i + 1) * 13 ? "is-after" : ""} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <span className="ba-k">{a.k}</span>
              <span className="ba-before">{a.before}</span>
              <span className="ba-after">{a.after}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
