import { isFormConfigured } from "@/lib/env";

/**
 * Réception du formulaire de contact (même logique qu'Athéna).
 * Ne répond `{ ok: true }` QUE si Resend a accepté l'e-mail.
 * Sans configuration complète : 503, rien n'est simulé.
 */

const NEEDS = ["SEO", "GEO", "SEO + GEO", "Audit", "Création de site", "Autre demande"];
const RATE_LIMIT = 4;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const buckets = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const hits = (buckets.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  buckets.set(ip, hits);
  return hits.length > RATE_LIMIT;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: object, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!isFormConfigured()) {
    return json({ ok: false, error: "Le formulaire n'est pas encore relié à une boîte de réception." }, 503);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return json({ ok: false, error: "Trop de demandes envoyées. Réessayez dans une heure." }, 429);
  }

  const raw = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!raw) return json({ ok: false, error: "Données invalides." }, 400);

  // Champ piège : rempli = robot. Aucun envoi n'est confirmé.
  if (str(raw.nickname, 200)) return json({ ok: false, error: "Données invalides." }, 400);

  const data = {
    name: str(raw.name, 100),
    email: str(raw.email, 200),
    company: str(raw.company, 120),
    url: str(raw.url, 200),
    need: str(raw.need, 40),
    message: str(raw.message, 4000),
  };

  const errors: string[] = [];
  if (data.name.length < 2) errors.push("votre nom");
  if (!EMAIL.test(data.email)) errors.push("une adresse e-mail valide");
  if (!NEEDS.includes(data.need)) errors.push("le type de prestation");
  if (data.message.length < 20) errors.push("un message d'au moins 20 caractères");
  if (raw.consent !== "yes") errors.push("votre consentement");
  if (errors.length) {
    return json({ ok: false, error: `Merci d'indiquer ${errors.join(", ")}.` }, 400);
  }

  const text = [
    `Nom : ${data.name}`,
    `E-mail : ${data.email}`,
    `Entreprise : ${data.company || "—"}`,
    `Site : ${data.url || "—"}`,
    `Prestation : ${data.need}`,
    "",
    "Message :",
    data.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: data.email,
        subject: `Hermès — ${data.need} — ${data.name}${data.company ? ` (${data.company})` : ""}`,
        text,
      }),
    });
    if (!res.ok) {
      return json({ ok: false, error: "L'envoi n'a pas abouti. Réessayez plus tard ou écrivez-nous par e-mail." }, 502);
    }
    return json({ ok: true }, 200);
  } catch {
    return json({ ok: false, error: "L'envoi n'a pas abouti. Réessayez plus tard ou écrivez-nous par e-mail." }, 502);
  }
}
