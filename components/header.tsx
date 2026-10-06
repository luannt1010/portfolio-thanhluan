"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import type { NavigationItem } from "@/data/portfolio";

type HeaderProps = {
  initials: string;
  navigation: NavigationItem[];
  email: string;
};

export function Header({ initials, navigation, email }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let frame = 0;
    function updateActiveSection() {
      frame = 0;
      const offset = (document.querySelector(".site-header")?.getBoundingClientRect().height ?? 74) + 32;
      let current = navigation[0]?.href.slice(1) ?? "home";
      for (const item of navigation) {
        const section = document.getElementById(item.href.slice(1));
        if (section && section.getBoundingClientRect().top <= offset) current = section.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = navigation.at(-1)?.href.slice(1) ?? current;
      }
      setActiveSection(current);
    }
    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    }
    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, [navigation]);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <a
          className="brand"
          href="#home"
          aria-label="Go to home"
          onClick={() => setMenuOpen(false)}
        >
          {initials}<span>.</span>
        </a>

        <nav
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Portfolio sections"
          id="portfolio-navigation"
        >
          {navigation.map((item) => (
            <a
              className={activeSection === item.href.slice(1) ? "is-active" : undefined}
              key={item.href}
              href={item.href}
              aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <a className="nav-cta" href={`mailto:${email}`}>
            Let&apos;s talk
          </a>
          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-controls="portfolio-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
