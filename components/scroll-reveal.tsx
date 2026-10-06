"use client";

import { useEffect, useRef, type ReactNode } from "react";

const revealTargets = [
  ".section-heading",
  ".about-grid",
  ".skill-card",
  ".education-card",
  ".timeline-item",
  ".project-card",
  ".certificate-card",
  ".contact-shell",
].join(", ");

export function ScrollReveal({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!main || motionPreference.matches || !("IntersectionObserver" in window)) return;

    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);

        // Focused content stays immediately visible for keyboard navigation.
        if (element.contains(document.activeElement)) continue;

        const isGridCard = element.matches(".skill-card, .certificate-card");
        const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
        const delay = isGridCard && window.innerWidth > 800 ? (siblings.indexOf(element) % 3) * 90 : 0;
        const animation = element.animate(
          [
            { opacity: 0, translate: "0 36px", scale: "0.98" },
            { opacity: 1, translate: "0 0", scale: "1" },
          ],
          { duration: 650, delay, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });

    // Keep the initial viewport and restored scroll position visible without a flash.
    // Everything remains readable if JavaScript or animation support is unavailable.
    for (const element of main.querySelectorAll<HTMLElement>(revealTargets)) {
      if (element.getBoundingClientRect().top >= window.innerHeight && typeof element.animate === "function") {
        observer.observe(element);
      }
    }

    function stopAnimations() {
      observer.disconnect();
      for (const animation of animations) animation.cancel();
      animations.clear();
    }

    function revealFocusedContent(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest(revealTargets);
      if (!element) return;
      observer.unobserve(element);
      for (const animation of element.getAnimations()) animation.cancel();
    }

    motionPreference.addEventListener("change", stopAnimations);
    main.addEventListener("focusin", revealFocusedContent);
    return () => {
      stopAnimations();
      motionPreference.removeEventListener("change", stopAnimations);
      main.removeEventListener("focusin", revealFocusedContent);
    };
  }, []);

  return <main ref={mainRef}>{children}</main>;
}
