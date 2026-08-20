"use client";

import { useState } from "react";
import type { NavigationItem } from "@/data/portfolio";

type HeaderProps = {
  initials: string;
  navigation: NavigationItem[];
  email: string;
  activeTab: string;
  onNavigate: (href: string) => void;
};

export function Header({ initials, navigation, email, activeTab, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  }

  function navigate(href: string) {
    onNavigate(href);
    setMenuOpen(false);
  }

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    const currentIndex = navigation.findIndex((item) => item.href === `#${activeTab}`);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % navigation.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + navigation.length) % navigation.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = navigation.length - 1;
    else return;

    event.preventDefault();
    const nextItem = navigation[nextIndex];
    navigate(nextItem.href);
    window.requestAnimationFrame(() => document.getElementById(`${nextItem.href.slice(1)}-tab`)?.focus());
  }

  return (
    <header className="site-header">
      <div className="nav-shell">
        <a
          className="brand"
          href="#home"
          aria-label="Go to home"
          onClick={(event) => {
            event.preventDefault();
            navigate("#home");
          }}
        >
          {initials}<span>.</span>
        </a>

        <nav
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Portfolio sections"
          role="tablist"
          onKeyDown={handleTabKeyDown}
        >
          {navigation.map((item) => (
            <a
              className={activeTab === item.href.slice(1) ? "is-active" : undefined}
              id={`${item.href.slice(1)}-tab`}
              key={item.href}
              href={item.href}
              role="tab"
              aria-controls={`${item.href.slice(1)}-panel`}
              aria-selected={activeTab === item.href.slice(1)}
              tabIndex={activeTab === item.href.slice(1) ? 0 : -1}
              onClick={(event) => {
                event.preventDefault();
                navigate(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            title="Toggle color theme"
          >
            <span aria-hidden="true">◐</span>
          </button>
          <a className="nav-cta" href={`mailto:${email}`}>
            Let&apos;s talk
          </a>
          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
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
