"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Exécute une initialisation non critique quand le navigateur est disponible (découpe les longues tâches). */
export function onIdle(fn: () => void, timeout = 1500): () => void {
  if (typeof window === "undefined") return () => {};
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(fn, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(fn, 120);
  return () => clearTimeout(id);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Découpe un titre en mots (une seule fois) pour l'animation typographique. */
function split(el: HTMLElement) {
  if (el.dataset.splitDone) return;
  el.dataset.splitDone = "1";
  let i = 0;
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = (node.textContent ?? "").split(/(\s+)/);
      const frag = document.createDocumentFragment();
      for (const p of parts) {
        if (!p) continue;
        if (/^\s+$/.test(p)) {
          frag.append(document.createTextNode(p));
        } else {
          const w = document.createElement("span");
          w.className = "w";
          const inner = document.createElement("span");
          inner.className = "wi";
          inner.style.setProperty("--i", String(i++));
          inner.textContent = p;
          w.append(inner);
          frag.append(w);
        }
      }
      node.parentNode?.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE && !(node as HTMLElement).classList.contains("w")) {
      Array.from(node.childNodes).forEach(walk);
    }
  };
  Array.from(el.childNodes).forEach(walk);
}

/**
 * Moteur commun : défilement fluide (Lenis), apparitions au scroll,
 * typographie cinétique, parallaxe et état « en vue » des animations.
 * Sans JavaScript ou avec prefers-reduced-motion, tout reste visible.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = prefersReducedMotion();
    root.classList.add("motion-ready");

    let lenis: Lenis | undefined;
    let tick: ((t: number) => void) | undefined;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1 });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t: number) => lenis?.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Liens d'ancre internes : défilement fluide
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const hash = href.startsWith("#") ? href : href.startsWith(`${pathname}#`) || (pathname === "/" && href.startsWith("/#")) ? href.slice(href.indexOf("#")) : null;
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      history.pushState(null, "", hash);
      if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -72 });
      else (target as HTMLElement).scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      (target as HTMLElement).focus?.({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    // Titres découpés en mots
    document.querySelectorAll<HTMLElement>("[data-split]").forEach(split);

    // Apparitions et état « en vue »
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.classList.add("is-in");
            if (!el.hasAttribute("data-inview-loop")) io.unobserve(el);
          } else if (el.hasAttribute("data-inview-loop")) {
            el.classList.remove("is-in");
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    document.querySelectorAll("[data-reveal],[data-split],[data-inview]").forEach((el) => io.observe(el));

    // Parallaxe
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const k = parseFloat(el.dataset.parallax ?? "0.15");
        gsap.fromTo(
          el,
          { yPercent: -k * 50 },
          {
            yPercent: k * 50,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    // Barre de progression de lecture
    const bar = document.querySelector<HTMLElement>("[data-progress]");
    const onScroll = () => {
      if (!bar) return;
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 400);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    return () => {
      clearTimeout(t);
      removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      io.disconnect();
      ctx.revert();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      window.__lenis = undefined;
    };
  }, [pathname]);

  return null;
}
