import type { SocialLink } from "@/data/portfolio";

type FooterProps = {
  name: string;
  initials: string;
  socials: SocialLink[];
};

export function Footer({ name, initials, socials }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-shell">
        <a className="brand footer-brand" href="#home" aria-label="Back to home">
          {initials}<span>.</span>
        </a>
        <p>© {new Date().getFullYear()} {name}. Built with care and curiosity.</p>
        <div className="footer-links">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
