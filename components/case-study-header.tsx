import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

type CaseStudyHeaderProps = {
  initials: string;
  repositoryUrl: string;
};

export function CaseStudyHeader({ initials, repositoryUrl }: CaseStudyHeaderProps) {
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" href="/#home" aria-label="Go to portfolio home">
          {initials}<span>.</span>
        </Link>

        <nav className="case-study-header-actions" aria-label="Case study navigation">
          <Link className="case-study-back-link" href="/#projects">
            <span aria-hidden="true">←</span> All projects
          </Link>
          <a className="nav-cta case-study-github-link" href={repositoryUrl} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
