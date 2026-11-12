"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Mark";
import { mainNav } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const on = () => setScrolled(scrollY > 24);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="header-logo" aria-label="Hermès — accueil" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="header-nav" aria-label="Navigation principale">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/contact" className="btn btn-gold btn-sm header-cta" onClick={() => setOpen(false)}>
          <span>Parlons-en</span>
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <div className="menu-mobile" id="menu-mobile" hidden={!open}>
        <ul>
          {mainNav.map((item, i) => (
            <li key={item.href} style={{ "--i": i } as React.CSSProperties}>
              <Link href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
          <li style={{ "--i": mainNav.length } as React.CSSProperties}>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
        <p className="mono">Une activité du Groupe BOURASSEAU</p>
      </div>
      <span className="progress" data-progress aria-hidden="true" />
    </header>
  );
}
