import Link from "next/link";
import type { CSSProperties } from "react";

/** Projection simple (équirectangulaire locale) sur le cadre de la carte stylisée. */
const proj = (lat: number, lon: number): [number, number] => [((lon + 2.75) / 3.4) * 640 + 30, ((48.65 - lat) / 2.45) * 460 + 30];

const CITIES = [
  { n: "Nantes", lat: 47.218, lon: -1.553, z: "44", main: true },
  { n: "Saint-Nazaire", lat: 47.273, lon: -2.214, z: "44" },
  { n: "Ancenis", lat: 47.366, lon: -1.177, z: "44" },
  { n: "Pornic", lat: 47.115, lon: -2.102, z: "44" },
  { n: "La Roche-sur-Yon", lat: 46.67, lon: -1.426, z: "85", main: true },
  { n: "Les Sables-d'Olonne", lat: 46.496, lon: -1.783, z: "85" },
  { n: "Montaigu-Vendée", lat: 46.973, lon: -1.309, z: "85" },
  { n: "Challans", lat: 46.846, lon: -1.877, z: "85" },
  { n: "Fontenay-le-Comte", lat: 46.466, lon: -0.806, z: "85" },
  { n: "Cholet", lat: 47.06, lon: -0.879, z: "49" },
  { n: "Angers", lat: 47.473, lon: -0.551, z: "49" },
  { n: "Saumur", lat: 47.26, lon: -0.077, z: "49" },
  { n: "Laval", lat: 48.073, lon: -0.77, z: "53" },
  { n: "Le Mans", lat: 48.006, lon: 0.199, z: "72" },
];

// Tracé approximatif de la Loire, de Saumur à l'estuaire
const LOIRE = [
  [47.26, -0.077],
  [47.4, -0.45],
  [47.42, -0.8],
  [47.366, -1.177],
  [47.24, -1.45],
  [47.2, -1.6],
  [47.22, -1.9],
  [47.27, -2.2],
].map(([a, b]) => proj(a, b));

export function LocalMap() {
  const nantes = proj(47.218, -1.553);
  const yon = proj(46.67, -1.426);
  const loire = `M${LOIRE.map((p) => p.join(" ")).join(" L")}`;
  return (
    <section className="local section section-ivory" aria-labelledby="local-title">
      <div className="wrap local-grid">
        <div className="local-copy">
          <p className="kicker">Nantes · Vendée · Pays de la Loire</p>
          <h2 id="local-title" className="h-section" data-split>
            Une visibilité ancrée dans votre territoire.
          </h2>
          <p className="lead" data-reveal>
            Hermès est une activité indépendante qui accompagne les entreprises de Loire-Atlantique, de Vendée et de toute la
            région, à distance ou sur rendez-vous. Pas de bureau fictif : un interlocuteur qui connaît votre marché.
          </p>
          <ul className="local-links" data-reveal>
            <li>
              <Link href="/referencement-naturel-nantes" className="local-link">
                <span className="mono">44</span> Référencement naturel à Nantes et en Loire-Atlantique
              </Link>
            </li>
            <li>
              <Link href="/referencement-naturel-vendee" className="local-link">
                <span className="mono">85</span> Référencement naturel en Vendée
              </Link>
            </li>
            <li>
              <Link href="/seo-local" className="local-link">
                <span className="mono">GBP</span> SEO local et Google Business Profile
              </Link>
            </li>
          </ul>
        </div>
        <figure className="local-map" data-inview>
          <svg viewBox="0 0 700 520" role="img" aria-labelledby="map-desc">
            <desc id="map-desc">
              Carte stylisée des Pays de la Loire : Nantes et La Roche-sur-Yon reliées aux principales villes de la région.
            </desc>
            <defs>
              <radialGradient id="mapGlow">
                <stop offset="0" stopColor="#E6CD96" stopOpacity="0.55" />
                <stop offset="1" stopColor="#E6CD96" stopOpacity="0" />
              </radialGradient>
            </defs>
            {Array.from({ length: 13 }, (_, i) => (
              <line key={`v${i}`} x1={30 + i * 52} y1="20" x2={30 + i * 52} y2="500" className="map-grid" />
            ))}
            {Array.from({ length: 10 }, (_, i) => (
              <line key={`h${i}`} x1="20" y1={30 + i * 52} x2="690" y2={30 + i * 52} className="map-grid" />
            ))}
            <circle cx={nantes[0]} cy={nantes[1]} r="140" fill="url(#mapGlow)" />
            <circle cx={yon[0]} cy={yon[1]} r="110" fill="url(#mapGlow)" />
            <path d={loire} className="map-loire" />
            <text x={proj(47.42, -0.95)[0]} y={proj(47.42, -0.95)[1] - 10} className="map-river">
              Loire
            </text>
            <text x="34" y="300" className="map-ocean">
              Océan Atlantique
            </text>
            {CITIES.filter((c) => !c.main).map((c, i) => {
              const [x, y] = proj(c.lat, c.lon);
              const from = c.z === "85" ? yon : nantes;
              return <path key={c.n} d={`M${from[0]} ${from[1]} L${x} ${y}`} className={`map-link z${c.z}`} pathLength={1} style={{ "--d": `${0.5 + i * 0.09}s` } as CSSProperties} />;
            })}
            <path d={`M${nantes[0]} ${nantes[1]} L${yon[0]} ${yon[1]}`} className="map-link map-link-main" pathLength={1} style={{ "--d": "0.3s" } as CSSProperties} />
            {CITIES.map((c, i) => {
              const [x, y] = proj(c.lat, c.lon);
              const right = x < 520;
              return (
                <g key={c.n} className={`map-city${c.main ? " is-main" : ""}`} style={{ "--d": `${0.2 + i * 0.07}s` } as CSSProperties}>
                  {c.main ? <circle cx={x} cy={y} r="18" className="map-ripple" /> : null}
                  <circle cx={x} cy={y} r={c.main ? 7 : 4.5} className="map-dot" />
                  <text x={right ? x + 11 : x - 11} y={y + 4} textAnchor={right ? "start" : "end"} className="map-label">
                    {c.n}
                  </text>
                </g>
              );
            })}
          </svg>
          <figcaption className="mono">Carte stylisée — positions approximatives</figcaption>
        </figure>
      </div>
    </section>
  );
}
