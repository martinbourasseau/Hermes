"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onIdle, prefersReducedMotion } from "@/components/Motion";
import { HermesMark } from "@/components/Mark";

gsap.registerPlugin(ScrollTrigger);

/** Deux leviers, une même ambition : SEO (résultats) et GEO (réponses) reliés à l'entreprise. */
export function Compare() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion() || window.matchMedia("(max-width: 900px)").matches) return;
    const q = gsap.utils.selector(el);
    let ctx: gsap.Context | undefined;
    const cancel = onIdle(() => {
      ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: q(".cmp-stage")[0], start: "top 80%", end: "bottom 45%", scrub: 0.7 },
      });
      tl.from(q(".cmp-seo"), { xPercent: -18, rotationY: 14, opacity: 0, duration: 1 })
        .from(q(".cmp-geo"), { xPercent: 18, rotationY: -14, opacity: 0, duration: 1 }, "<")
        .from(q(".cmp-res"), { opacity: 0, y: 14, stagger: 0.08, duration: 0.5 }, "-=0.4")
        .from(q(".cmp-ans-line"), { scaleX: 0, transformOrigin: "0 50%", stagger: 0.08, duration: 0.5 }, "<")
        .from(q(".cmp-cite"), { opacity: 0, scale: 0.6, stagger: 0.1, duration: 0.4 })
        .fromTo(q(".cmp-wire"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.15 })
        .from(q(".cmp-core"), { scale: 0.4, opacity: 0, duration: 0.6, ease: "back.out(1.6)" }, "-=0.5");
      }, el);
      ScrollTrigger.refresh();
    });
    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);

  return (
    <section className="cmp section" ref={root} aria-labelledby="cmp-title">
      <div className="wrap">
        <p className="kicker">SEO + GEO</p>
        <h2 id="cmp-title" className="h-section" data-split>
          Deux leviers. Une même ambition : votre visibilité.
        </h2>
        <div className="cmp-stage">
          <div className="cmp-panel cmp-seo">
            <p className="cmp-label mono">SEO · Résultats de recherche</p>
            <div className="cmp-search">plombier chauffagiste nantes</div>
            <ol className="cmp-results">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className={`cmp-res${i === 1 ? " is-you" : ""}`}>
                  <span className="cmp-url">{i === 1 ? "votre-entreprise.fr" : `site-${i + 1}.fr`}</span>
                  <span className="cmp-line" />
                  <span className="cmp-line cmp-line-s" />
                </li>
              ))}
            </ol>
            <p className="cmp-cap">Être présent dans les résultats, sur les recherches qui comptent.</p>
          </div>

          <div className="cmp-core" aria-hidden="true">
            <HermesMark className="cmp-mark" />
            <span className="cmp-core-t">Votre entreprise</span>
          </div>

          <div className="cmp-panel cmp-geo">
            <p className="cmp-label mono">GEO · Réponse générative</p>
            <div className="cmp-ask">Quel chauffagiste recommandez-vous à Nantes ?</div>
            <div className="cmp-answer">
              <span className="cmp-ans-line" />
              <span className="cmp-ans-line" />
              <span className="cmp-ans-line is-you" />
              <span className="cmp-ans-line cmp-ans-short" />
            </div>
            <div className="cmp-cites">
              <span className="cmp-cite">[1] guide-local.fr</span>
              <span className="cmp-cite is-you">[2] votre-entreprise.fr</span>
              <span className="cmp-cite">[3] annuaire-pro.fr</span>
            </div>
            <p className="cmp-cap">Être compris, mentionné et cité dans les réponses.</p>
          </div>

          <svg className="cmp-wires" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
            <path className="cmp-wire" d="M330 170 C 420 170, 430 210, 500 210" pathLength={1} />
            <path className="cmp-wire" d="M670 250 C 580 250, 570 210, 500 210" pathLength={1} />
          </svg>
        </div>
        <p className="cmp-note">Exemple illustratif — entreprise, requêtes et sources fictives.</p>
        <p className="cmp-message" data-reveal>
          Ne vous contentez pas d&apos;être présent dans les résultats de recherche. Construisez une présence qui compte aussi
          dans les réponses de demain.
        </p>
      </div>
    </section>
  );
}
