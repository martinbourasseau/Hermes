import type { CSSProperties } from "react";

/**
 * Animations propres à chaque prestation (SVG + CSS).
 * Elles démarrent quand la carte entre à l'écran (classe .is-in posée par Motion)
 * et se mettent en pause hors de l'écran. Les données affichées sont illustratives.
 */

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function Audit() {
  return (
    <g className="a-audit">
      {[0, 1, 2].map((i) => (
        <g key={i} className="layer" style={{ ...d(0.1 + i * 0.12), "--ly": `${(i - 1) * 26}px` } as CSSProperties}>
          <path d="M160 70 L250 105 L160 140 L70 105 Z" className={`iso iso-${i}`} />
          <path d="M120 98 L170 117" className="iso-line" />
          <path d="M135 92 L200 117" className="iso-line" />
        </g>
      ))}
      {[
        [205, 76, 0.9],
        [118, 104, 1.1],
        [190, 132, 1.3],
      ].map(([x, y, t], i) => (
        <g key={i} className="pop" style={d(t)}>
          <circle cx={x} cy={y} r="9" className="issue" />
          <path d={`M${x} ${y - 4} v5 M${x} ${y + 3.5} v0.5`} className="issue-mark" />
        </g>
      ))}
    </g>
  );
}

function Technique() {
  const cubes = [
    [130, 128],
    [160, 140],
    [190, 128],
    [160, 116],
    [145, 100],
    [175, 100],
    [160, 82],
  ];
  return (
    <g className="a-tech">
      {cubes.map(([x, y], i) => (
        <g key={i} className="drop" style={d(0.1 + i * 0.13)}>
          <path d={`M${x} ${y} l15 -8 l15 8 l-15 8 z`} className="c-top" />
          <path d={`M${x} ${y} l15 8 v16 l-15 -8 z`} className="c-left" />
          <path d={`M${x + 30} ${y} l-15 8 v16 l15 -8 z`} className="c-right" />
        </g>
      ))}
      <g transform="translate(262 62)">
        <circle r="26" className="gauge-bg" />
        <circle r="26" className="gauge" pathLength={1} />
        <text y="5" textAnchor="middle" className="gauge-t">
          LCP
        </text>
      </g>
      <text x="236" y="112" className="art-note">
        Core Web Vitals
      </text>
    </g>
  );
}

function OnPage() {
  const rows = [
    { y: 52, w: 150, cls: "h1", label: "H1" },
    { y: 78, w: 110, cls: "h2", label: "H2" },
    { y: 96, w: 180, cls: "p" },
    { y: 110, w: 160, cls: "p" },
    { y: 132, w: 96, cls: "h2", label: "H2" },
    { y: 150, w: 170, cls: "p" },
  ];
  return (
    <g className="a-onpage">
      <rect x="70" y="30" width="180" height="150" rx="12" className="page" />
      {rows.map((r, i) => (
        <g key={i} className="row" style={{ ...d(0.1 + i * 0.1), "--sx": `${((i * 37) % 30) - 15}px`, "--sr": `${((i * 13) % 6) - 3}deg` } as CSSProperties}>
          <rect x="84" y={r.y} width={r.w * 0.8} height={r.cls === "h1" ? 12 : r.cls === "h2" ? 8 : 5} rx="3" className={`r-${r.cls}`} />
          {r.label ? (
            <text x="262" y={r.y + 8} className="row-l">
              {r.label}
            </text>
          ) : null}
        </g>
      ))}
      <g className="pop" style={d(1.3)}>
        <rect x="190" y="132" width="46" height="34" rx="6" className="img" />
        <path d="M196 160 l10 -10 l8 7 l6 -5 l10 8" className="img-l" />
      </g>
      <text x="70" y="22" className="art-note">
        &lt;title&gt; · meta · alt · liens
      </text>
    </g>
  );
}

function Keywords() {
  const words = [
    ["consultant seo", 0],
    ["audit seo", 0],
    ["seo technique", 0],
    ["seo local", 1],
    ["google maps", 1],
    ["avis clients", 1],
    ["visibilité ia", 2],
    ["chatgpt", 2],
    ["geo", 2],
  ] as const;
  const centers = [
    [70, 120],
    [160, 70],
    [252, 128],
  ];
  return (
    <g className="a-kw">
      {centers.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="44" className="cluster" style={d(0.9 + i * 0.1)} />
      ))}
      {words.map(([w, g], i) => {
        const [cx, cy] = centers[g];
        const k = i % 3;
        const tx = cx - 36 + k * 4;
        const ty = cy - 14 + k * 16;
        const fx = (i * 71) % 300;
        const fy = 20 + ((i * 53) % 160);
        return (
          <text
            key={w}
            className={`kw kw-${g}`}
            x={tx}
            y={ty}
            style={{ ...d(0.1 + i * 0.07), "--fx": `${fx - tx}px`, "--fy": `${fy - ty}px` } as CSSProperties}
          >
            {w}
          </text>
        );
      })}
    </g>
  );
}

function Local() {
  const cities = [
    { n: "Nantes", x: 128, y: 92, main: true },
    { n: "Saint-Nazaire", x: 72, y: 82 },
    { n: "La Roche-sur-Yon", x: 132, y: 160 },
    { n: "Angers", x: 206, y: 72 },
    { n: "Cholet", x: 186, y: 128 },
    { n: "Les Sables", x: 102, y: 182 },
  ];
  const main = cities[0];
  return (
    <g className="a-local">
      <path d="M40 76 C 90 70, 110 96, 150 86 S 230 66, 290 60" className="loire" />
      {cities.slice(1).map((c, i) => (
        <path key={c.n} d={`M${main.x} ${main.y} L${c.x} ${c.y}`} className="link" pathLength={1} style={d(0.4 + i * 0.12)} />
      ))}
      {cities.map((c, i) => (
        <g key={c.n} className="pop" style={d(0.1 + i * 0.1)}>
          {c.main ? <circle cx={c.x} cy={c.y} r="16" className="ripple" /> : null}
          <circle cx={c.x} cy={c.y} r={c.main ? 6 : 4} className={c.main ? "city-main" : "city"} />
          <text x={c.x + 9} y={c.y - 7} className="city-t">
            {c.n}
          </text>
        </g>
      ))}
    </g>
  );
}

function Content() {
  const cards = [
    [40, 40],
    [40, 120],
    [240, 40],
    [240, 120],
    [140, 150],
  ];
  return (
    <g className="a-content">
      {cards.map(([x, y], i) => (
        <path key={i} d={`M${x + 20} ${y + 15} L160 100`} className="link" pathLength={1} style={d(0.7 + i * 0.1)} />
      ))}
      <g className="pop" style={d(0.1)}>
        <rect x="128" y="74" width="64" height="52" rx="10" className="pillar" />
        <text x="160" y="104" textAnchor="middle" className="pillar-t">
          Pilier
        </text>
      </g>
      {cards.map(([x, y], i) => (
        <g key={i} className="pop" style={d(0.3 + i * 0.1)}>
          <rect x={x} y={y} width="40" height="30" rx="6" className="card" />
          <rect x={x + 6} y={y + 8} width="22" height="3" rx="1.5" className="card-l" />
          <rect x={x + 6} y={y + 15} width="28" height="2.5" rx="1.25" className="card-l2" />
          <rect x={x + 6} y={y + 21} width="18" height="2.5" rx="1.25" className="card-l2" />
        </g>
      ))}
    </g>
  );
}

function Netlinking() {
  const nodes = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return [160 + Math.cos(a) * 110, 100 + Math.sin(a) * 70] as const;
  });
  return (
    <g className="a-net">
      <ellipse cx="160" cy="100" rx="110" ry="70" className="orbit" />
      {nodes.map(([x, y], i) => (
        <path key={i} d={`M${x.toFixed(1)} ${y.toFixed(1)} L160 100`} className="flow" style={d(i * 0.2)} />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 9 : 6} className="pop site" style={d(0.1 + i * 0.08)} />
      ))}
      <circle cx="160" cy="100" r="22" className="hub" />
      <circle cx="160" cy="100" r="34" className="hub-ring" />
    </g>
  );
}

function Tracking({ demo }: { demo?: string }) {
  const bars = [38, 52, 46, 64, 72, 80, 92];
  return (
    <g className="a-track">
      <rect x="30" y="24" width="260" height="150" rx="14" className="dash" />
      {bars.map((h, i) => (
        <rect key={i} x={52 + i * 20} y={150 - h} width="12" height={h} rx="3" className="bar" style={d(0.1 + i * 0.07)} />
      ))}
      <path d="M200 140 C 220 132, 230 110, 246 104 S 266 70, 276 58" className="line" pathLength={1} />
      <text x="200" y="48" className="kpi">
        Clics
      </text>
      <text x="200" y="62" className="kpi-v">
        ↗
      </text>
      {demo ? (
        <text x="30" y="194" className="art-demo">
          {demo}
        </text>
      ) : null}
    </g>
  );
}

function AiAudit({ demo }: { demo?: string }) {
  return (
    <g className="a-aiaudit">
      {[0, 1, 2].map((i) => (
        <g key={i} className="win pop" style={{ ...d(0.1 + i * 0.18), "--wz": `${(1 - i) * 10}px` } as CSSProperties}>
          <rect x={22 + i * 96} y={30 + (i % 2) * 14} width="88" height="128" rx="12" className="w-bg" />
          <text x={32 + i * 96} y={48 + (i % 2) * 14} className="w-name">
            Assistant {i + 1}
          </text>
          <rect x={32 + i * 96} y={58 + (i % 2) * 14} width="68" height="12" rx="6" className="w-q" />
          <rect x={32 + i * 96} y={80 + (i % 2) * 14} width="62" height="4" rx="2" className="w-l type" style={d(0.6 + i * 0.2)} />
          <rect x={32 + i * 96} y={90 + (i % 2) * 14} width="54" height="4" rx="2" className="w-l type" style={d(0.75 + i * 0.2)} />
          <rect
            x={32 + i * 96}
            y={102 + (i % 2) * 14}
            width="40"
            height="10"
            rx="5"
            className={i === 1 ? "w-mention" : "w-other"}
            style={d(1.1 + i * 0.2)}
          />
          <rect x={32 + i * 96} y={120 + (i % 2) * 14} width="30" height="8" rx="4" className="w-src" style={d(1.3 + i * 0.2)} />
        </g>
      ))}
      {demo ? (
        <text x="22" y="192" className="art-demo">
          {demo}
        </text>
      ) : null}
    </g>
  );
}

function GenOptim() {
  return (
    <g className="a-optim">
      {Array.from({ length: 12 }, (_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 82 + col * 42;
        const y = 50 + row * 36;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="34"
            height="26"
            rx="6"
            className={`blk ${i % 5 === 0 ? "blk-key" : ""}`}
            style={{ ...d(0.1 + i * 0.05), "--bx": `${((i * 47) % 140) - 70}px`, "--by": `${((i * 29) % 90) - 45}px`, "--br": `${((i * 31) % 50) - 25}deg` } as CSSProperties}
          />
        );
      })}
      <text x="82" y="178" className="art-note">
        Identité · offre · zone · preuves
      </text>
    </g>
  );
}

function Authority() {
  const src = [
    [60, 50, "Presse"],
    [250, 46, "Annuaire pro"],
    [270, 140, "Site"],
    [52, 150, "Partenaire"],
    [160, 176, "Fiche Google"],
  ] as const;
  return (
    <g className="a-auth">
      {src.map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} Q 160 ${y < 100 ? 60 : 150} 160 100`} className="link" pathLength={1} style={d(0.5 + i * 0.15)} />
      ))}
      <g className="pop" style={d(0.1)}>
        <circle cx="160" cy="100" r="24" className="entity" />
        <text x="160" y="104" textAnchor="middle" className="entity-t">
          Vous
        </text>
      </g>
      {src.map(([x, y, n], i) => (
        <g key={n} className="pop" style={d(0.3 + i * 0.15)}>
          <rect x={x - 34} y={y - 11} width="68" height="22" rx="11" className="src" />
          <text x={x} y={y + 4} textAnchor="middle" className="src-t">
            {n}
          </text>
        </g>
      ))}
    </g>
  );
}

function GeoContent() {
  const chips = ["Définition", "Données", "Guide", "FAQ", "Comparatif", "Sources"];
  return (
    <g className="a-geocontent">
      <g className="pop" style={d(0.1)}>
        <rect x="96" y="80" width="128" height="40" rx="20" className="question" />
        <text x="160" y="105" textAnchor="middle" className="question-t">
          « Quel prestataire… ? »
        </text>
      </g>
      {chips.map((c, i) => {
        const a = (i / chips.length) * Math.PI * 2;
        const x = 160 + Math.cos(a) * 120;
        const y = 100 + Math.sin(a) * 72;
        return (
          <g key={c} className="chip" style={{ ...d(0.4 + i * 0.12), "--cx": `${(160 - x) * 0.55}px`, "--cy": `${(100 - y) * 0.55}px` } as CSSProperties}>
            <rect x={x - 34} y={y - 11} width="68" height="22" rx="11" />
            <text x={x} y={y + 4} textAnchor="middle">
              {c}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function GeoTracking({ demo }: { demo?: string }) {
  const engines = ["Assistant 1", "Assistant 2", "Assistant 3", "Assistant 4"];
  return (
    <g className="a-geotrack">
      {engines.map((e, i) => (
        <g key={e} transform={`translate(${38 + i * 66} 0)`}>
          <rect x="0" y="40" width="50" height="120" rx="10" className="col" />
          <rect x="10" y="60" width="30" height="90" rx="6" className="col-bar" style={{ ...d(0.2 + i * 0.12), "--h1": String(0.3 + ((i * 0.23) % 0.5)), "--h2": String(0.55 + ((i * 0.17) % 0.4)) } as CSSProperties} />
          <text x="25" y="176" textAnchor="middle" className="col-t">
            {e}
          </text>
        </g>
      ))}
      {demo ? (
        <text x="38" y="28" className="art-demo">
          {demo}
        </text>
      ) : null}
    </g>
  );
}

export function ModuleArt({ id, demo }: { id: string; demo?: string }) {
  const map: Record<string, React.ReactNode> = {
    "audit-seo": <Audit />,
    "seo-technique": <Technique />,
    "seo-on-page": <OnPage />,
    "mots-cles": <Keywords />,
    "seo-local": <Local />,
    "contenu-seo": <Content />,
    netlinking: <Netlinking />,
    "suivi-seo": <Tracking demo={demo} />,
    "audit-visibilite-ia": <AiAudit demo={demo} />,
    "optimisation-generative": <GenOptim />,
    "autorite-sources": <Authority />,
    "contenu-geo": <GeoContent />,
    "suivi-geo": <GeoTracking demo={demo} />,
  };
  return (
    <svg className={`art art-${id}`} viewBox="0 0 320 200" aria-hidden="true" focusable="false">
      {map[id]}
    </svg>
  );
}
