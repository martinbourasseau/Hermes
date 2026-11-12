"use client";

import { useEffect, useRef, useState } from "react";
import { HERMES_H, HERMES_PATH, HERMES_W } from "@/lib/hermes-paths";

/**
 * Introduction cinématique (temps réel, Canvas 2D) — page d'accueil uniquement.
 * 1. Point de lumière et faisceau sur fond crème
 * 2. Hermès apparaît en gros plan, caducée auréolé, particules or et bleu
 * 3. Recul : la caméra s'écarte, le ciel du hero apparaît derrière lui
 * 4. Une partie des particules suit un ruban et compose le logo HERMÈS
 * 5. La silhouette se fond dans l'Hermès peint du hero, le titre apparaît
 *
 * Jouée une fois par session, interruptible (clic, touche, molette, toucher),
 * absente si l'utilisateur demande moins d'animations.
 */

type Frame = { s: number; x: number; y: number; ax: number; ay: number };
type P = { u: number; v: number; sx: number; sy: number; r: number; ph: number; c: number; fly: boolean; d: number };

const DUR = 4.4;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const mix = (f: Frame, g: Frame, k: number): Frame => ({
  s: lerp(f.s, g.s, k),
  x: lerp(f.x, g.x, k),
  y: lerp(f.y, g.y, k),
  ax: lerp(f.ax, g.ax, k),
  ay: lerp(f.ay, g.ay, k),
});
const place = (u: number, v: number, f: Frame): [number, number] => [f.x + (u - f.ax) * f.s, f.y + (v - f.ay) * f.s];

const COLORS = ["201,161,90", "62,100,181", "20,32,74", "230,205,150"];

export function Intro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skipRef = useRef<() => void>(() => {});
  const [active, setActive] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("intro-pending")) return;
    const id = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) {
      root.classList.remove("intro-pending");
      return;
    }

    const lenis = window.__lenis;
    lenis?.stop();
    root.classList.add("intro-playing");
    try {
      sessionStorage.setItem("hermes-intro", "1");
    } catch {}

    const path = new Path2D(HERMES_PATH);
    let W = 0,
      H = 0,
      dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.25 : 1.75);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Échantillonnage de la silhouette
    const sample = () => {
      const k = 0.32;
      const off = document.createElement("canvas");
      off.width = Math.ceil(HERMES_W * k);
      off.height = Math.ceil(HERMES_H * k);
      const o = off.getContext("2d")!;
      o.scale(k, k);
      o.fill(path);
      const d = o.getImageData(0, 0, off.width, off.height).data;
      const pts: [number, number][] = [];
      for (let y = 0; y < off.height; y += 2)
        for (let x = 0; x < off.width; x += 2) if (d[(y * off.width + x) * 4 + 3] > 120) pts.push([x / k, y / k]);
      return pts;
    };
    const pts = sample();
    const mobile = W < 760;
    const lowPower = (navigator.hardwareConcurrency || 8) <= 4;
    const n = Math.min(pts.length, Math.round((mobile ? 420 : 1300) * (lowPower ? 0.6 : 1)));
    const step = pts.length / n;
    const parts: P[] = Array.from({ length: n }, (_, i) => {
      const p = pts[Math.floor(i * step)];
      return {
        u: p[0],
        v: p[1],
        sx: Math.random(),
        sy: Math.random(),
        r: Math.random() * 1.8 + 0.7,
        ph: Math.random() * Math.PI * 2,
        c: Math.random() < 0.5 ? 0 : Math.random() < 0.7 ? 1 : 3,
        fly: Math.random() < 0.38,
        d: Math.random(),
      };
    });

    const rectOf = (sel: string) => document.querySelector(sel)?.getBoundingClientRect();
    const frames = () => {
      const close: Frame = mobile
        ? { s: (H * 0.62) / 420, x: W * 0.5, y: H * 0.46, ax: 600, ay: 240 }
        : { s: (H * 0.78) / 420, x: W * 0.52, y: H * 0.48, ax: 600, ay: 230 };
      const hr = rectOf("[data-hero-figure]");
      const wide: Frame = hr && hr.width > 0
        ? { s: hr.width / HERMES_W, x: hr.left + hr.width / 2, y: hr.top + hr.height / 2, ax: HERMES_W / 2, ay: HERMES_H / 2 }
        : { s: (H * 0.6) / HERMES_H, x: W * 0.7, y: H * 0.5, ax: HERMES_W / 2, ay: HERMES_H / 2 };
      const lr = rectOf("[data-logo-target]");
      const logo: Frame = lr
        ? { s: lr.height / HERMES_H, x: lr.left + lr.width / 2, y: lr.top + lr.height / 2, ax: HERMES_W / 2, ay: HERMES_H / 2 }
        : { s: 28 / HERMES_H, x: 40, y: 34, ax: HERMES_W / 2, ay: HERMES_H / 2 };
      return { close, wide, logo };
    };
    let F = frames();
    const onResize = () => {
      resize();
      F = frames();
    };
    window.addEventListener("resize", onResize);

    const halo = (x: number, y: number, r: number, a: number) => {
      if (a <= 0.001 || r <= 0) return;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(255,250,236,${0.95 * a})`);
      g.addColorStop(0.18, `rgba(240,214,150,${0.55 * a})`);
      g.addColorStop(0.5, `rgba(214,178,110,${0.16 * a})`);
      g.addColorStop(1, "rgba(246,241,231,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    };

    // Silhouette pré-rendue une seule fois (dégradé + lueur dorée), puis simplement redimensionnée
    const PAD = 60;
    const figK = Math.min(2048 / HERMES_H, frames().close.s * dpr);
    const fig = document.createElement("canvas");
    fig.width = Math.ceil(HERMES_W * figK + PAD * 2);
    fig.height = Math.ceil(HERMES_H * figK + PAD * 2);
    {
      const f2 = fig.getContext("2d")!;
      f2.translate(PAD, PAD);
      f2.scale(figK, figK);
      const g = f2.createLinearGradient(HERMES_W, 0, 0, HERMES_H);
      g.addColorStop(0, "rgb(42,58,110)");
      g.addColorStop(0.5, "rgb(20,32,74)");
      g.addColorStop(1, "rgb(14,23,48)");
      f2.shadowColor = "rgba(214,178,110,0.6)";
      f2.shadowBlur = 30;
      f2.fillStyle = g;
      f2.fill(path);
    }
    const drawFigure = (f: Frame, a: number) => {
      if (a <= 0.001) return;
      const r = f.s / figK;
      ctx.globalAlpha = a;
      ctx.drawImage(fig, f.x - f.ax * f.s - PAD * r, f.y - f.ay * f.s - PAD * r, fig.width * r, fig.height * r);
      ctx.globalAlpha = 1;
    };

    // Point d'arrivée de la courbe « ruban » vers le logo
    const ribbonPoint = (from: [number, number], to: [number, number], k: number, seed: number): [number, number] => {
      const cx = lerp(from[0], to[0], 0.5) - 160 - seed * 120;
      const cy = Math.min(from[1], to[1]) - 120 + seed * 60;
      const it = 1 - k;
      return [it * it * from[0] + 2 * it * k * cx + k * k * to[0], it * it * from[1] + 2 * it * k * cy + k * k * to[1]];
    };

    let raf = 0;
    let t0 = performance.now();
    let finished = false;
    const heroLanded = { done: false };

    const finish = (fast = false) => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      root.classList.add("intro-done");
      root.classList.remove("intro-pending", "intro-playing");
      const cover = cv.parentElement;
      if (cover) {
        cover.style.transition = `opacity ${fast ? 0.35 : 0.6}s ease`;
        cover.style.opacity = "0";
        setTimeout(() => setActive(false), fast ? 380 : 650);
      }
      lenis?.start();
    };

    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);

      const kPoint = clamp(t / 0.7);
      const kBeam = ease(clamp((t - 0.25) / 0.8));
      const kAsm = ease(clamp((t - 0.7) / 1.0));
      const kBack = ease(clamp((t - 1.85) / 1.1));
      const kBg = ease(clamp((t - 2.0) / 1.0));
      const kFly = clamp((t - 2.7) / 1.1);
      const kLand = ease(clamp((t - 3.3) / 0.8));

      // fond crème qui s'efface pendant le recul (le ciel du hero apparaît)
      ctx.fillStyle = `rgba(246,241,231,${1 - kBg})`;
      ctx.fillRect(0, 0, W, H);

      const cur = mix(F.close, F.wide, kBack);
      const cad = place(700, 40, cur);

      // 1. Point de lumière + faisceau
      if (t < 1.8) {
        const px = F.close.x + (700 - F.close.ax) * F.close.s;
        const py = F.close.y + (40 - F.close.ay) * F.close.s;
        const fade = 1 - clamp((t - 1.2) / 0.6);
        const hr = 40 + 170 * easeOut(kPoint);
        const gg = ctx.createRadialGradient(px, py, 0, px, py, hr);
        gg.addColorStop(0, `rgba(214,178,110,${0.75 * kPoint * fade})`);
        gg.addColorStop(0.2, `rgba(230,205,150,${0.45 * kPoint * fade})`);
        gg.addColorStop(1, "rgba(246,241,231,0)");
        ctx.fillStyle = gg;
        ctx.fillRect(px - hr, py - hr, hr * 2, hr * 2);
        ctx.fillStyle = `rgba(154,117,51,${kPoint * fade})`;
        ctx.beginPath();
        ctx.arc(px, py, 3 + 2.5 * kPoint, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255,252,240,${kPoint * fade})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.6 + kPoint, 0, Math.PI * 2);
        ctx.fill();
        if (kBeam > 0) {
          const g = ctx.createLinearGradient(px, py - H, px, py + H);
          g.addColorStop(0, "rgba(214,178,110,0)");
          g.addColorStop(0.5, `rgba(201,161,90,${0.7 * kBeam * fade})`);
          g.addColorStop(1, "rgba(214,178,110,0)");
          ctx.fillStyle = g;
          const bw = 1 + 10 * kBeam;
          ctx.fillRect(px - bw / 2, py - H * kBeam, bw, H * 2 * kBeam);
        }
      }

      // Halo divin derrière le caducée
      halo(cad[0], cad[1], Math.max(W, H) * lerp(0.42, 0.22, kBack), kAsm * (1 - kLand * 0.9) * (1 + 0.06 * Math.sin(t * 7)));

      // 2-3. Silhouette pleine
      const figAlpha = kAsm * (1 - kLand);
      drawFigure(cur, figAlpha);

      // Particules, dessinées par lots (couleur × niveau d'opacité)
      const lf = F.logo;
      const batches: Path2D[][] = COLORS.map(() => [new Path2D(), new Path2D(), new Path2D(), new Path2D()]);
      for (const p of parts) {
        const tgt = place(p.u, p.v, cur);
        const delay = p.d * 0.35;
        const ka = ease(clamp((t - 0.6 - delay) / 1.0));
        let x = lerp(p.sx * W, tgt[0], ka);
        let y = lerp(p.sy * H, tgt[1], ka);
        x += Math.sin(t * 2.2 + p.ph) * 1.6;
        y += Math.cos(t * 1.8 + p.ph) * 1.2;
        let alpha = (1 - ka) * 0.7 + 0.35;
        let size = p.r;
        if (p.fly && kFly > 0) {
          const k = ease(clamp(kFly * 1.35 - p.d * 0.35));
          const dest = place(p.u, p.v, lf);
          const q = ribbonPoint([x, y], dest, k, p.d);
          x = q[0];
          y = q[1];
          size = lerp(p.r, 0.9, k);
          alpha = lerp(0.9, 0.95, k) * (1 - clamp((t - 3.9) / 0.5));
        } else {
          alpha *= 1 - kLand;
        }
        if (alpha <= 0.01) continue;
        batches[p.c][Math.min(3, Math.floor(alpha * 4))].rect(x, y, size, size);
      }
      batches.forEach((levels, c) =>
        levels.forEach((pth, b) => {
          ctx.fillStyle = `rgba(${COLORS[c]},${(b + 0.6) / 4})`;
          ctx.fill(pth);
        }),
      );

      if (!heroLanded.done && t > 3.25) {
        heroLanded.done = true;
        root.classList.add("intro-logo");
      }
      if (t >= DUR) {
        finish();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      const cover = cv.parentElement;
      if (cover) cover.style.background = "transparent";
      t0 = performance.now();
      F = frames();
      raf = requestAnimationFrame(frame);
    };
    // Laisse le temps à la page de se mettre en place (positions du hero)
    const startTimer = window.setTimeout(start, 60);

    const skip = () => finish(true);
    skipRef.current = skip;
    const onKey = (e: KeyboardEvent) => {
      if (["Tab", "Shift"].includes(e.key)) return;
      skip();
    };
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      window.removeEventListener("keydown", onKey);
      if (!finished) {
        root.classList.remove("intro-pending", "intro-playing");
        root.classList.add("intro-done");
        lenis?.start();
      }
    };
  }, [active]);

  return (
    <div className="intro-cover" data-active={active || undefined}>
      {active ? <canvas ref={canvasRef} aria-hidden="true" /> : null}
      {active ? (
        <button type="button" className="intro-skip" onClick={() => skipRef.current()}>
          Passer l&apos;introduction
        </button>
      ) : null}
    </div>
  );
}
