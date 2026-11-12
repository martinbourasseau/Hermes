"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

export const NEEDS = ["SEO", "GEO", "SEO + GEO", "Audit", "Création de site", "Autre demande"] as const;

type Status = { kind: "idle" | "sending" | "ok" | "error"; msg?: string };

/**
 * Formulaire de contact. La confirmation n'apparaît que si le serveur
 * confirme l'envoi (Resend a accepté l'e-mail). Sans configuration,
 * le formulaire est désactivé et l'adresse e-mail reste disponible.
 */
export function ContactForm({ configured, id = "formulaire" }: { configured: boolean; id?: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const needRef = useRef<HTMLSelectElement>(null);

  // Pré-sélection depuis un bouton « Parlons-en » (?besoin=seo|geo|audit|site)
  useEffect(() => {
    const map: Record<string, string> = { seo: "SEO", geo: "GEO", audit: "Audit", site: "Création de site" };
    const b = new URLSearchParams(window.location.search).get("besoin") ?? "";
    if (map[b] && needRef.current) needRef.current.value = map[b];
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (res.ok && json?.ok) {
        setStatus({ kind: "ok" });
        form.reset();
      } else {
        setStatus({ kind: "error", msg: json?.error ?? "L'envoi n'a pas abouti. Réessayez plus tard." });
      }
    } catch {
      setStatus({ kind: "error", msg: "Connexion impossible. Vérifiez votre réseau et réessayez." });
    }
  }

  if (status.kind === "ok") {
    return (
      <div className="form-done" role="status" tabIndex={-1}>
        <p className="form-done-k mono">Message envoyé</p>
        <p className="form-done-t">Merci. Votre demande a bien été transmise, nous revenons vers vous rapidement.</p>
      </div>
    );
  }

  const disabled = !configured || status.kind === "sending";

  return (
    <form className="form" id={id} onSubmit={onSubmit} noValidate={false}>
      {!configured ? (
        <p className="form-notice" role="note">
          Le formulaire n&apos;est pas encore relié à une boîte de réception. En attendant, écrivez-nous directement à{" "}
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        </p>
      ) : null}
      <fieldset disabled={disabled}>
        <legend className="sr-only">Votre demande</legend>
        <div className="form-row">
          <label className="field">
            <span>Nom et prénom *</span>
            <input name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} />
          </label>
          <label className="field">
            <span>E-mail *</span>
            <input name="email" type="email" autoComplete="email" required maxLength={200} />
          </label>
        </div>
        <div className="form-row">
          <label className="field">
            <span>Entreprise</span>
            <input name="company" type="text" autoComplete="organization" maxLength={120} />
          </label>
          <label className="field">
            <span>Adresse du site</span>
            <input name="url" type="text" inputMode="url" placeholder="https://" maxLength={200} />
          </label>
        </div>
        <label className="field">
          <span>Type de prestation *</span>
          <select name="need" required defaultValue="" ref={needRef}>
            <option value="" disabled>
              Choisir…
            </option>
            {NEEDS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Votre message *</span>
          <textarea name="message" required minLength={20} maxLength={4000} rows={6} placeholder="Votre activité, vos objectifs, ce qui vous amène…" />
        </label>
        {/* Champ piège : invisible pour les humains */}
        <label className="hp" aria-hidden="true">
          Ne pas remplir
          <input name="nickname" type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="consent">
          <input name="consent" type="checkbox" value="yes" required />
          <span>
            J&apos;accepte que les informations saisies soient utilisées pour répondre à ma demande. Voir la{" "}
            <a href="/confidentialite">politique de confidentialité</a>. *
          </span>
        </label>
        <div className="form-foot">
          <button type="submit" className="btn btn-gold">
            <span>{status.kind === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}</span>
          </button>
          <p className="form-alt">
            ou par e-mail : <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </p>
        </div>
        <p className="form-status" role="alert" aria-live="assertive">
          {status.kind === "error" ? status.msg : ""}
        </p>
      </fieldset>
    </form>
  );
}
