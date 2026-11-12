"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/components/Motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scène du hero : le ciel d'origine dans une arche, Hermès détouré en avant-plan
 * (corps + bras/caducée séparé pour l'animer), lumière du caducée et particules.
 */
export function HeroStage() {
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    const fig = el.querySelector<HTMLElement>("[data-hero-figure]");
    const arm = el.querySelector<HTMLElement>(".hero-arm");
    const sky = el.querySelector<HTMLElement>(".portal-sky");
    const glow = el.querySelector<HTMLElement>(".cad-glow");
    if (!fig || !arm || !sky || !glow || reduce) return;

    const ctx = gsap.context(() => {
      // Flottement du corps, mouvement du bras, respiration de la lumière
      gsap.to(fig, { y: -14, x: 6, rotation: -0.6, duration: 4.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(arm, { rotation: -3.2, duration: 3.1, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(glow, { scale: 1.25, opacity: 0.95, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1 });

      // Au défilement : Hermès s'élève et le ciel s'enfonce
      gsap.to(fig.parentElement, {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(sky, {
        yPercent: 8,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    // Parallaxe au pointeur
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      gsap.to(sky, { x: dx * -14, y: dy * -10, duration: 1.2, ease: "power3.out", overwrite: "auto" });
      gsap.to(".hero-figure-wrap", { x: dx * 18, y: dy * 12, duration: 1.2, ease: "power3.out", overwrite: "auto" });
    };
    window.addEventListener("pointermove", onMove);

    // Particules qui se détachent du caducée et dérivent
    const cv = canvas.current;
    const c2 = cv?.getContext("2d");
    let raf = 0;
    let visible = true;
    type Dot = { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number; gold: boolean };
    const dots: Dot[] = [];
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    let frameN = 0;
    let ox = 0,
      oy = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!cv || !c2 || !visible) return;
      frameN++;
      const w = cv.clientWidth,
        h = cv.clientHeight,
        dpr = Math.min(devicePixelRatio || 1, 2);
      if (cv.width !== Math.round(w * dpr)) {
        cv.width = Math.round(w * dpr);
        cv.height = Math.round(h * dpr);
      }
      c2.setTransform(dpr, 0, 0, dpr, 0, 0);
      c2.clearRect(0, 0, w, h);
      if (frameN % 20 === 1) {
        // lecture de mise en page espacée (évite un recalcul à chaque image)
        const g = glow.getBoundingClientRect();
        const s = cv.getBoundingClientRect();
        ox = g.left + g.width / 2 - s.left;
        oy = g.top + g.height / 2 - s.top;
      }
      if (dots.length < 70 && Math.random() < 0.5) {
        dots.push({
          x: ox + (Math.random() - 0.5) * 18,
          y: oy + (Math.random() - 0.5) * 18,
          vx: (Math.random() - 0.65) * 0.7,
          vy: Math.random() * 0.5 + 0.15,
          life: 0,
          max: 140 + Math.random() * 160,
          r: Math.random() * 1.8 + 0.6,
          gold: Math.random() < 0.65,
        });
      }
      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        d.life++;
        d.x += d.vx + Math.sin(d.life * 0.03) * 0.25;
        d.y += d.vy;
        const a = Math.sin((d.life / d.max) * Math.PI) * 0.85;
        c2.fillStyle = d.gold ? `rgba(214,178,110,${a})` : `rgba(62,100,181,${a * 0.8})`;
        c2.beginPath();
        c2.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        c2.fill();
        if (d.life > d.max) dots.splice(i, 1);
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="hero-stage" ref={stage}>
      <div className="portal">
        <div className="portal-sky">
          <Image
            src="/images/ciel-hermes.jpg"
            alt=""
            fill
            preload
            fetchPriority="high"
            quality={70}
            sizes="(max-width: 900px) 92vw, 46vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <span className="portal-light" aria-hidden="true" />
        <span className="portal-rim" aria-hidden="true" />
      </div>
      <div className="hero-figure-wrap">
        <div className="hero-figure" data-hero-figure>
          <Image
            className="hero-body"
            src="/images/hermes-body.png"
            alt="Hermès, messager des dieux, s'élève dans le ciel en brandissant son caducée"
            width={819}
            height={909}
            preload
            fetchPriority="high"
            sizes="(max-width: 900px) 46vw, 24vw"
          />
          <div className="hero-arm">
            <Image src="/images/hermes-arm.png" alt="" width={819} height={909} loading="eager" sizes="(max-width: 900px) 46vw, 24vw" />
            <span className="cad-glow" aria-hidden="true" />
          </div>
        </div>
      </div>
      <canvas className="hero-particles" ref={canvas} aria-hidden="true" />
    </div>
  );
}
