import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyHeader } from "@/components/case-study-header";
import { Footer } from "@/components/footer";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { portfolio } from "@/data/portfolio";
import styles from "./case-study.module.css";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) return {};

  const canonicalPath = `/projects/${caseStudy.slug}`;

  return {
    title: `${caseStudy.title} | ${portfolio.person.name}`,
    description: caseStudy.summary,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      url: canonicalPath,
      title: caseStudy.title,
      description: caseStudy.summary,
      images: [
        {
          url: caseStudy.heroImage,
          alt: caseStudy.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.title,
      description: caseStudy.summary,
      images: [caseStudy.heroImage],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) notFound();

  const pageStyle = {
    "--case-study-accent": caseStudy.accent,
  } as CSSProperties;

  return (
    <>
      <CaseStudyHeader
        initials={portfolio.person.initials}
        repositoryUrl={caseStudy.repositoryUrl}
      />

      <main className={styles.page} style={pageStyle}>
        <section className={styles.hero}>
          <div className={styles.shell}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/#projects">Projects</Link>
              <span aria-hidden="true">/</span>
              <span>Case study</span>
            </nav>

            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>{caseStudy.eyebrow}</p>
                <h1>{caseStudy.title}</h1>
                <p className={styles.summary}>{caseStudy.summary}</p>

                <div className={styles.heroActions}>
                  <a
                    className={styles.primaryAction}
                    href={caseStudy.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View GitHub <span aria-hidden="true">↗</span>
                  </a>
                  <Link className={styles.secondaryAction} href="/#projects">
                    Back to projects
                  </Link>
                </div>
              </div>

              <div className={styles.heroMedia}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={caseStudy.heroImage} alt={caseStudy.heroAlt} fetchPriority="high" />
                <span>Case study</span>
              </div>
            </div>

            <dl className={styles.facts}>
              {caseStudy.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>

            {caseStudy.disclaimer ? (
              <aside className={styles.disclaimer}>
                <strong>Responsible-use note</strong>
                <p>{caseStudy.disclaimer}</p>
              </aside>
            ) : null}
          </div>
        </section>

        <section className={styles.metrics} aria-label="Project results">
          <div className={styles.shell}>
            <div className={styles.metricGrid}>
              {caseStudy.metrics.map((metric) => (
                <article key={metric.label}>
                  <strong>{metric.value}</strong>
                  <h2>{metric.label}</h2>
                  {metric.detail ? <p>{metric.detail}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className={`${styles.shell} ${styles.story}`}>
          <nav className={styles.contents} aria-label="Case study contents">
            <p>Inside this case study</p>
            <ol>
              {caseStudy.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          {caseStudy.sections.map((section, index) => (
            <section className={styles.section} id={section.id} key={section.id}>
              <header className={styles.sectionHeading}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{section.eyebrow}</p>
                  <h2>{section.title}</h2>
                </div>
              </header>

              <div>
                <div className={styles.sectionCopy}>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {section.bullets?.length ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                {section.figures?.length ? (
                  <div
                    className={styles.figureGrid}
                    data-layout={section.figureLayout ?? "stack"}
                  >
                    {section.figures.map((figure) => (
                      <figure className={styles.figure} key={figure.src}>
                        <div
                          className={styles.figureMedia}
                          data-fit={figure.fit ?? "cover"}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={figure.src} alt={figure.alt} loading="lazy" />
                        </div>
                        <figcaption>{figure.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          ))}

          <section className={styles.technologySection}>
            <div>
              <p className={styles.eyebrow}>Technology stack</p>
              <h2>Tools used across the experiment</h2>
            </div>
            <ul>
              {caseStudy.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </section>

          <section className={styles.closing}>
            <p>Want to inspect the implementation?</p>
            <h2>Explore the training pipeline, notebooks, and source code.</h2>
            <div className={styles.heroActions}>
              <a
                className={styles.primaryAction}
                href={caseStudy.repositoryUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open repository <span aria-hidden="true">↗</span>
              </a>
              <Link className={styles.secondaryAction} href="/#projects">
                View other projects
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer
        name={portfolio.person.name}
        initials={portfolio.person.initials}
        socials={portfolio.socials}
        homeHref="/#home"
      />
    </>
  );
}
