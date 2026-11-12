import Link from "next/link";
import type { Service } from "@/content/services";
import { ModuleArt } from "@/components/ModuleArt";

/** Carte de prestation : animation dédiée + contenu + liste détaillée dépliable. */
export function ServiceCard({ s, size = "m", headingLevel = 3 }: { s: Service; size?: "l" | "m"; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className={`svc svc-${s.expertise} svc-${size}`} id={s.id} data-inview data-inview-loop>
      <div className="svc-art">
        <ModuleArt id={s.id} demo={s.demo} />
      </div>
      <div className="svc-body">
        <p className="svc-num mono">
          {s.num} — {s.name}
        </p>
        <H className="svc-title">{s.title}</H>
        <p className="svc-desc">{s.description}</p>
        <details className="svc-details">
          <summary>
            <span>Ce que comprend la prestation</span>
            <span className="svc-plus" aria-hidden="true" />
          </summary>
          <ul>
            {s.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </details>
        <div className="svc-actions">
          <Link href={s.href} className="link-arrow">
            En savoir plus <span className="sr-only">sur : {s.name}</span>
          </Link>
          <Link href={`/contact?besoin=${s.expertise}`} className="link-arrow link-arrow-gold">
            Parlons-en
          </Link>
        </div>
      </div>
    </article>
  );
}
