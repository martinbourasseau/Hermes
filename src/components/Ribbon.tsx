"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onIdle, prefersReducedMotion } from "@/components/Motion";

gsap.registerPlugin(ScrollTrigger);

type Tone = "gold" | "blue" | "light";

const TONES: Record<Tone, [string, string, string]> = {
  gold: ["#E6CD96", "#C9A15A", "#9C7638"],
  blue: ["#7FA0E0", "#3E64B5", "#1F3A78"],
  light: ["#FFFFFF", "#F4E7C6", "#E6CD96"],
};

/**
 * Ruban d'Hermès : traînée lumineuse tracée au rythme du défilement,
 * avec une lueur qui parcourt la trajectoire.
 */
export function Ribbon({
  d,
  viewBox = "0 0 1440 600",
  tone = "gold",
  className,
  strands = 3,
  start = "top 85%",
  end = "bottom 30%",
}: {
  d: string;
  viewBox?: string;
  tone?: Tone;
  className?: string;
  strands?: number;
  start?: string;
  end?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const gid = useId().replace(/:/g, "");

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const paths = Array.from(svg.querySelectorAll<SVGPathElement>(".rb-path"));
    const comet = svg.querySelector<SVGCircleElement>(".rb-comet");
    if (prefersReducedMotion()) {
      paths.forEach((p) => (p.style.strokeDashoffset = "0"));
      return;
    }
    const main = paths[0];
    const len = main.getTotalLength();
    let ctx: gsap.Context | undefined;
    const cancel = onIdle(() => {
      ctx = gsap.context(() => {
      gsap.fromTo(
        paths,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: svg,
            start,
            end,
            scrub: 0.6,
            onUpdate: (st) => {
              if (!comet) return;
              const pt = main.getPointAtLength(len * Math.min(0.999, st.progress));
              comet.setAttribute("cx", String(pt.x));
              comet.setAttribute("cy", String(pt.y));
              comet.style.opacity = st.progress > 0.01 && st.progress < 0.99 ? "1" : "0";
            },
          },
        },
      );
      }, svg);
      ScrollTrigger.refresh();
    });
    return () => {
      cancel();
      ctx?.revert();
    };
  }, [start, end]);

  const [c1, c2, c3] = TONES[tone];
  return (
    <svg ref={ref} className={`ribbon ${className ?? ""}`} viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`rg${gid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={c1} stopOpacity="0" />
          <stop offset="0.25" stopColor={c1} />
          <stop offset="0.6" stopColor={c2} />
          <stop offset="1" stopColor={c3} stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id={`rc${gid}`}>
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.35" stopColor={c1} stopOpacity="0.9" />
          <stop offset="1" stopColor={c2} stopOpacity="0" />
        </radialGradient>
      </defs>
      {Array.from({ length: strands }, (_, i) => (
        <path
          key={i}
          className="rb-path"
          d={d}
          pathLength={1}
          fill="none"
          stroke={`url(#rg${gid})`}
          strokeWidth={i === 0 ? 2.4 : 1.1}
          strokeOpacity={i === 0 ? 1 : 0.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ transform: `translate(${i * 7}px, ${i * 11}px)` }}
        />
      ))}
      <circle className="rb-comet" r="7" cx="-20" cy="-20" fill={`url(#rc${gid})`} />
    </svg>
  );
}
