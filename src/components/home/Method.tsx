"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { onIdle, prefersReducedMotion } from "@/components/Motion";
import { HERMES_MARK_PATH } from "@/lib/hermes-paths";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const STEPS = [
  { n: "01", k: "Analyser", t: "Comprendre votre activité, votre marché, votre site et vos concurrents — sur Google comme dans les réponses IA." },
  { n: "02", k: "Stratégie", t: "Identifier les mots-clés, les questions, les priorités et les opportunités réalistes." },
  { n: "03", k: "Optimiser", t: "Améliorer la technique, les contenus, la structure et la clarté des informations." },
  { n: "04", k: "Développer", t: "Suivre les résultats, mesurer les performances et poursuivre les optimisations." },
];

const PATH = "M40 120 C 200 20, 300 220, 470 120 S 760 20, 930 120 S 1200 220, 1360 110";

/** La méthode Hermès : quatre étapes reliées par le parcours du messager. */
export function Method() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const reduce = prefersReducedMotion();
    let ctx: gsap.Context | undefined;
    const cancel = onIdle(() => {
      ctx = gsap.context(() => {
      const steps = q(".m-step");
      const path = el.querySelector<SVGPathElement>(".m-path")!;
      if (reduce) {
        steps.forEach((s: Element) => s.classList.add("is-on"));
        return;
      }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el.querySelector(".m-track"),
          start: "top 75%",
          end: "bottom 35%",
          scrub: 0.8,
          onUpdate: (st) => {
            steps.forEach((s: Element, i: number) => s.classList.toggle("is-on", st.progress >= i / 4 + 0.04));
          },
        },
      });
      tl.fromTo(q(".m-path"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", duration: 1 }).to(
        q(".m-traveler"),
        {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: false },
          ease: "none",
          duration: 1,
        },
        0,
      );
      }, el);
      ScrollTrigger.refresh();
    });
    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);

  return (
    <section className="method section" id="methode" ref={root} aria-labelledby="m-title" tabIndex={-1}>
      <div className="wrap">
        <p className="kicker">La méthode Hermès</p>
        <h2 id="m-title" className="h-section" data-split>
          Une stratégie claire. Un travail mesurable.
        </h2>
        <div className="m-track">
          <svg className="m-svg" viewBox="0 0 1400 240" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="mGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#3E64B5" />
                <stop offset="0.5" stopColor="#C9A15A" />
                <stop offset="1" stopColor="#E6CD96" />
              </linearGradient>
            </defs>
            <path d={PATH} className="m-path-bg" />
            <path d={PATH} className="m-path" pathLength={1} />
            <g className="m-traveler">
              <circle r="16" className="m-trav-glow" />
              <g transform="translate(-11 -12) scale(0.027)">
                <path d={HERMES_MARK_PATH} className="m-trav-mark" />
              </g>
            </g>
          </svg>
          <ol className="m-steps">
            {STEPS.map((s) => (
              <li key={s.n} className="m-step">
                <span className="m-n">{s.n}</span>
                <h3 className="m-k">{s.k}</h3>
                <p className="m-t">{s.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
