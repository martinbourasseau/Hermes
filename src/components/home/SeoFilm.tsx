"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onIdle, prefersReducedMotion } from "@/components/Motion";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { k: "Analyse", t: "Le site est exploré page par page. Les freins apparaissent." },
  { k: "Balises", t: "Title, meta description, titres, données structurées : chaque page se présente clairement." },
  { k: "Mots-clés", t: "Les recherches réelles de vos clients trouvent leur place dans les contenus." },
  { k: "Structure", t: "Les pages se réorganisent. La hiérarchie devient lisible, pour les visiteurs comme pour les moteurs." },
  { k: "Maillage", t: "Les pages se relient entre elles. L'autorité circule." },
  { k: "Résultats", t: "Le site gagne en pertinence face aux pages concurrentes." },
  { k: "Visibilité", t: "La visibilité se construit, et se mesure." },
];

const KEYWORDS = [
  { w: "consultant seo nantes", x: 590, y: 70 },
  { w: "audit seo", x: 640, y: 140 },
  { w: "seo local", x: 600, y: 470 },
  { w: "référencement naturel", x: 40, y: 500 },
];

/** Le film du SEO : une scène épinglée, pilotée par le défilement. */
export function SeoFilm() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const reduce = prefersReducedMotion();

    let ctx: gsap.Context | undefined;
    const cancel = onIdle(() => {
      ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      const starts: number[] = [];
      const step = (i: number) => {
        starts[i] = tl.duration();
      };
      let current = -1;
      const sync = () => {
        const time = tl.time();
        let i = 0;
        starts.forEach((s, j) => {
          if (time >= s - 0.01) i = j;
        });
        if (i === current) return;
        current = i;
        q(".film-step").forEach((s: Element, j: number) => s.classList.toggle("is-active", j === i));
        (q(".film-count")[0] as HTMLElement).textContent = String(i + 1).padStart(2, "0");
      };

      // 1. Analyse
      step(0);
      tl.fromTo(q(".f-scan"), { attr: { y: 70 } }, { attr: { y: 520 }, duration: 1.2, ease: "none" })
        .fromTo(q(".f-issue"), { scale: 0, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, stagger: 0.12, duration: 0.4 }, "<0.2")
        .to(q(".f-scan"), { opacity: 0, duration: 0.2 });
      // 2. Balises
      step(1);
      tl.fromTo(q(".f-tag"), { opacity: 0, x: (i: number) => (i % 2 ? 60 : -60) }, { opacity: 1, x: 0, stagger: 0.15, duration: 0.6 });
      // 3. Mots-clés
      step(2);
      tl.fromTo(q(".f-kw"), { opacity: 0, y: -20 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.5 })
        .to(q(".f-kw"), { x: (i: number) => [-360, -410, -370, 190][i], y: (i: number) => [192, 158, -208, -202][i], scale: 0.8, duration: 0.9 })
        .to(q(".f-kw"), { opacity: 0, duration: 0.3 }, "-=0.15")
        .to(q(".f-line-kw"), { fill: "#C9A15A", duration: 0.3 }, "<");
      // 4. Structure
      step(3);
      tl.to(q(".f-block"), {
        x: 0,
        y: 0,
        rotation: 0,
        fill: (i: number) => (i === 0 ? "#14204A" : "#E9E1D2"),
        duration: 1,
        stagger: 0.05,
      })
        .to(q(".f-issue"), { fill: "#C9A15A", duration: 0.4 }, "<0.5")
        .to(q(".f-tag"), { opacity: 0.35, duration: 0.4 }, "<");
      // 5. Maillage
      step(4);
      tl.fromTo(q(".f-node"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, stagger: 0.08, duration: 0.5 })
        .fromTo(q(".f-link"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.08, duration: 0.8 }, "<0.2");
      // 6. Résultats
      step(5);
      tl.to(q(".f-browser"), { scale: 0.55, x: -170, y: 40, transformOrigin: "50% 50%", duration: 1 })
        .to(q(".f-node, .f-link, .f-tag"), { opacity: 0, duration: 0.5 }, "<")
        .fromTo(q(".f-serp"), { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.8 }, "<0.3")
        .fromTo(q(".f-mine"), { y: 5 * 44 }, { y: 44, duration: 1.4, ease: "power3.inOut" })
        .to(q(".f-other-shift"), { y: "+=44", duration: 1.4, stagger: 0.04, ease: "power3.inOut" }, "<");
      // 7. Visibilité
      step(6);
      tl.fromTo(q(".f-curve"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: "power1.inOut" })
        .fromTo(q(".f-curve-area"), { opacity: 0 }, { opacity: 1, duration: 0.8 }, "<0.4");

      tl.eventCallback("onUpdate", sync);
      if (reduce) {
        tl.progress(1);
        sync();
        return;
      }
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 4.2)}`,
        pin: el.querySelector(".film-pin"),
        scrub: 0.8,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (st) => {
          (q(".film-bar")[0] as HTMLElement).style.transform = `scaleX(${st.progress})`;
        },
      });
      }, el);
      ScrollTrigger.refresh();
    });
    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);

  return (
    <section className="film" ref={root} aria-labelledby="film-title">
      <div className="film-pin">
        <div className="wrap film-grid">
          <div className="film-copy">
            <p className="kicker">Le film du SEO</p>
            <h2 id="film-title" className="h-section">
              Comment un site devient visible.
            </h2>
            <p className="film-count-wrap mono">
              <span className="film-count">01</span> / 07
            </p>
            <ol className="film-steps">
              {STEPS.map((s, i) => (
                <li key={s.k} className={`film-step${i === 0 ? " is-active" : ""}`}>
                  <span className="film-k">{s.k}</span>
                  <span className="film-t">{s.t}</span>
                </li>
              ))}
            </ol>
            <span className="film-progress" aria-hidden="true">
              <span className="film-bar" />
            </span>
          </div>
          <div className="film-stage" aria-hidden="true">
            <svg viewBox="0 0 800 560" className="film-svg">
              <defs>
                <linearGradient id="fCurve" x1="0" x2="1">
                  <stop offset="0" stopColor="#3E64B5" />
                  <stop offset="1" stopColor="#C9A15A" />
                </linearGradient>
                <linearGradient id="fArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#C9A15A" stopOpacity="0.28" />
                  <stop offset="1" stopColor="#C9A15A" stopOpacity="0" />
                </linearGradient>
                <filter id="fShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="18" stdDeviation="22" floodColor="#14204A" floodOpacity="0.14" />
                </filter>
              </defs>

              {/* Maillage : pages satellites */}
              {[
                [90, 90],
                [80, 300],
                [150, 470],
                [700, 300],
                [690, 470],
              ].map(([x, y], i) => (
                <g key={i}>
                  <path className="f-link" d={`M${x + 30} ${y + 20} Q 400 ${y < 280 ? 180 : 380} 400 280`} pathLength={1} />
                  <g className="f-node">
                    <rect x={x} y={y} width="60" height="44" rx="8" />
                    <rect x={x + 8} y={y + 10} width="30" height="4" rx="2" className="f-node-l" />
                    <rect x={x + 8} y={y + 20} width="44" height="3" rx="1.5" className="f-node-l2" />
                    <rect x={x + 8} y={y + 28} width="36" height="3" rx="1.5" className="f-node-l2" />
                  </g>
                </g>
              ))}

              {/* Navigateur */}
              <g className="f-browser" filter="url(#fShadow)">
                <rect x="190" y="60" width="420" height="440" rx="18" className="f-win" />
                <rect x="190" y="60" width="420" height="38" rx="18" className="f-bar" />
                <circle cx="214" cy="79" r="5" className="f-dot" />
                <circle cx="230" cy="79" r="5" className="f-dot" />
                <circle cx="246" cy="79" r="5" className="f-dot" />
                <rect x="280" y="70" width="230" height="18" rx="9" className="f-url" />
                <text x="295" y="83" className="f-url-t">votre-site.fr</text>

                {/* Blocs de contenu : désordonnés au départ */}
                <rect className="f-block" x="214" y="116" width="372" height="96" rx="10" style={{ transform: "translate(14px,6px) rotate(1.5deg)" }} />
                <rect className="f-block" x="214" y="230" width="230" height="14" rx="7" style={{ transform: "translate(40px,10px) rotate(-2deg)" }} />
                <rect className="f-block f-line-kw" x="214" y="254" width="300" height="10" rx="5" style={{ transform: "translate(-10px,18px)" }} />
                <rect className="f-block" x="214" y="272" width="260" height="10" rx="5" style={{ transform: "translate(30px,-6px) rotate(2deg)" }} />
                <rect className="f-block f-line-kw" x="214" y="290" width="320" height="10" rx="5" style={{ transform: "translate(6px,22px)" }} />
                <rect className="f-block" x="214" y="320" width="176" height="110" rx="10" style={{ transform: "translate(18px,14px) rotate(-3deg)" }} />
                <rect className="f-block" x="410" y="320" width="176" height="110" rx="10" style={{ transform: "translate(-22px,26px) rotate(2.5deg)" }} />
                <rect className="f-block" x="214" y="448" width="150" height="28" rx="14" style={{ transform: "translate(60px,0) rotate(-1deg)" }} />

                {/* Problèmes détectés */}
                {[
                  [580, 130],
                  [470, 238],
                  [250, 338],
                  [560, 360],
                  [330, 462],
                ].map(([x, y], i) => (
                  <circle key={i} className="f-issue" cx={x} cy={y} r="8" />
                ))}
                <rect className="f-scan" x="196" y="70" width="408" height="3" rx="1.5" />
              </g>

              {/* Balises */}
              {[
                { t: "<title>", x: 40, y: 140 },
                { t: "<meta description>", x: 600, y: 210 },
                { t: "<h1>", x: 60, y: 240 },
                { t: "schema.org", x: 630, y: 390 },
              ].map((g) => (
                <g key={g.t} className="f-tag">
                  <rect x={g.x} y={g.y} width={g.t.length * 9 + 26} height="30" rx="15" />
                  <text x={g.x + 13} y={g.y + 20}>
                    {g.t}
                  </text>
                </g>
              ))}

              {/* Mots-clés */}
              {KEYWORDS.map((k) => (
                <g key={k.w} className="f-kw">
                  <text x={k.x} y={k.y}>
                    {k.w}
                  </text>
                </g>
              ))}

              {/* Résultats de recherche (illustration) */}
              <g className="f-serp">
                <rect x="420" y="40" width="360" height="480" rx="18" className="f-serp-bg" filter="url(#fShadow)" />
                <rect x="444" y="62" width="312" height="26" rx="13" className="f-serp-q" />
                <text x="460" y="80" className="f-serp-qt">
                  consultant seo nantes
                </text>
                <g transform="translate(444 104)">
                  {Array.from({ length: 6 }, (_, i) => (
                    <g key={i} className={i < 1 ? "" : "f-other-shift"} transform={`translate(0 ${i * 44})`}>
                      <rect width="312" height="34" rx="8" className="f-res" />
                      <rect x="12" y="9" width={140 + ((i * 37) % 90)} height="6" rx="3" className="f-res-l" />
                      <rect x="12" y="21" width={200 - ((i * 23) % 70)} height="4" rx="2" className="f-res-l2" />
                    </g>
                  ))}
                  <g className="f-mine">
                    <rect width="312" height="34" rx="8" className="f-res-mine" />
                    <rect x="12" y="9" width="150" height="6" rx="3" fill="#fff" />
                    <rect x="12" y="21" width="210" height="4" rx="2" fill="#fff" opacity="0.6" />
                  </g>
                </g>
                <path className="f-curve-area" d="M444 505 C 520 498, 560 486, 610 468 S 700 428, 756 412 L756 508 L444 508 Z" fill="url(#fArea)" />
                <path className="f-curve" d="M444 505 C 520 498, 560 486, 610 468 S 700 428, 756 412" pathLength={1} />
                <text x="444" y="536" className="f-demo">
                  Illustration — aucune position n&apos;est garantie
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
