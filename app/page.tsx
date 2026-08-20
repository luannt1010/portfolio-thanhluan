"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { portfolio } from "@/data/portfolio";

const tabIds = ["home", "about", "experience", "projects", "certificates", "contact"] as const;

type TabId = (typeof tabIds)[number];
type Direction = "forward" | "backward";

function tabFromHash(hash: string): TabId {
  const candidate = hash.replace("#", "") as TabId;
  return tabIds.includes(candidate) ? candidate : "home";
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [direction, setDirection] = useState<Direction>("forward");
  const heroWords = portfolio.person.heroTitle.split(" ");
  const heroAccent = heroWords.at(-1);
  const heroLead = heroWords.slice(0, -1).join(" ");

  const activateTab = useCallback((nextTab: TabId, updateHistory = true) => {
    setActiveTab((currentTab) => {
      if (currentTab === nextTab) return currentTab;
      setDirection(tabIds.indexOf(nextTab) > tabIds.indexOf(currentTab) ? "forward" : "backward");
      return nextTab;
    });

    if (updateHistory) {
      window.history.pushState(null, "", `#${nextTab}`);
    }

    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }, []);

  useEffect(() => {
    const syncTabWithUrl = () => activateTab(tabFromHash(window.location.hash), false);
    syncTabWithUrl();
    window.addEventListener("popstate", syncTabWithUrl);
    window.addEventListener("hashchange", syncTabWithUrl);
    return () => {
      window.removeEventListener("popstate", syncTabWithUrl);
      window.removeEventListener("hashchange", syncTabWithUrl);
    };
  }, [activateTab]);

  function navigate(href: string) {
    const nextTab = tabFromHash(href);
    const startViewTransition = (
      document as Document & { startViewTransition?: (callback: () => void) => void }
    ).startViewTransition;

    if (startViewTransition) {
      startViewTransition.call(document, () => activateTab(nextTab));
    } else {
      activateTab(nextTab);
    }
  }

  function renderActivePanel() {
    if (activeTab === "home") {
      return (
        <section className="hero section-shell" id="home-panel" role="tabpanel" aria-labelledby="home-tab">
          <div className="hero-copy">
            <p className="eyebrow hero-enter hero-delay-1">
              <span className="status-dot" /> {portfolio.person.availability}
            </p>
            <h1 className="hero-enter hero-delay-2">
              {heroLead} <em>{heroAccent}</em>
            </h1>
            <p className="hero-text hero-enter hero-delay-3">
              {portfolio.person.heroDescription}
            </p>
            <div className="hero-actions hero-enter hero-delay-4">
              <button className="button button-primary" type="button" onClick={() => navigate("#projects")}>
                Explore my work <span aria-hidden="true">↘</span>
              </button>
              <a className="button button-secondary" href={portfolio.person.resumeUrl} target="_blank" rel="noreferrer">
                View résumé <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="hero-socials hero-enter hero-delay-4" aria-label="Social links">
              {portfolio.socials.map((social) => (
                <a key={social.label} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {social.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>

          <aside className="hero-card hero-enter hero-delay-3" aria-label={`${portfolio.person.name} profile photo`}>
            <Image
              className="hero-portrait"
              src={portfolio.person.avatar}
              alt={`Portrait of ${portfolio.person.name}`}
              fill
              priority
              sizes="(max-width: 800px) 92vw, (max-width: 1200px) 34vw, 390px"
            />
            <div className="portrait-badge">
              <span className="status-dot" /> {portfolio.person.role}
            </div>
            <div className="portrait-caption">
              <p className="portrait-name">{portfolio.person.name}</p>
              <div className="portrait-meta">
                <span>{portfolio.person.profileNote}</span>
                <span>{portfolio.person.location}</span>
              </div>
            </div>
          </aside>
        </section>
      );
    }

    if (activeTab === "about") {
      return (
        <section className="content-section section-shell panel-section" id="about-panel" role="tabpanel" aria-labelledby="about-tab">
          <SectionHeading index="01" eyebrow="About me" title={portfolio.person.aboutTitle} />
          <div className="about-grid">
            <div className="about-copy">
              {portfolio.person.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="stats-grid">
              {portfolio.stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-subsection">
            <SectionHeading
              index="02"
              eyebrow="Skills / Tech stack"
              title="Tools change. Good engineering judgment compounds."
              description="A practical toolkit for taking intelligent products from first prototype to reliable production."
            />
            <div className="skills-grid">
              {portfolio.skills.map((skill, index) => (
                <article className="skill-card" key={skill.category}>
                  <span className="skill-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{skill.category}</h3>
                  <p>{skill.summary}</p>
                  <ul className="tag-list">
                    {skill.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="panel-subsection panel-subsection-last">
            <SectionHeading
              index="03"
              eyebrow="Education"
              title="A foundation in computer science, strengthened by shipping."
            />
            <div className="education-list">
              {portfolio.education.map((education) => (
                <article className="education-card" key={education.degree}>
                  <span>{education.period}</span>
                  <div>
                    <h3>{education.degree}</h3>
                    <p>{education.institution}</p>
                  </div>
                  <p>{education.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (activeTab === "experience") {
      return (
        <section className="content-section section-shell panel-section" id="experience-panel" role="tabpanel" aria-labelledby="experience-tab">
          <SectionHeading index="01" eyebrow="Experience" title="Building useful things with thoughtful teams." />
          <div className="timeline">
            {portfolio.experience.map((experience) => (
              <article className="timeline-item" key={`${experience.company}-${experience.role}`}>
                <div className="timeline-when">
                  <p>{experience.period}</p>
                  {experience.location ? <span>{experience.location}</span> : null}
                </div>
                <div className="timeline-role">
                  <h3>{experience.role}</h3>
                  <p>{experience.company} · {experience.employmentType}</p>
                </div>
                <div className="timeline-details">
                  <span className="timeline-label">Overview</span>
                  <p>{experience.description}</p>
                  <span className="timeline-label contributions-label">My Contributions</span>
                  <ul>
                    {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      );
    }

    if (activeTab === "projects") {
      return (
        <section className="content-section section-shell projects-section panel-section" id="projects-panel" role="tabpanel" aria-labelledby="projects-tab">
          <SectionHeading
            index="01"
            eyebrow="Selected projects"
            title="Systems, products, and experiments made to matter."
            description="A selection of work across applied AI, developer infrastructure, and human-centered software."
          />
          <div className="projects-list">
            {portfolio.projects.map((project, index) => (
              <ProjectCard project={project} index={index} key={project.slug} />
            ))}
          </div>
        </section>
      );
    }

    if (activeTab === "certificates") {
      return (
        <section className="content-section section-shell panel-section" id="certificates-panel" role="tabpanel" aria-labelledby="certificates-tab">
          <SectionHeading index="01" eyebrow="Certificates" title="Structured learning, applied in the real world." />
          <div className="certificate-grid">
            {portfolio.certificates.map((certificate, index) => (
              <article className="certificate-card" key={certificate.name}>
                <div className="certificate-visual">
                  {certificate.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={certificate.image} alt={`${certificate.name} certificate`} />
                  ) : (
                    <div className="certificate-mark" aria-hidden="true">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <i>✓</i>
                    </div>
                  )}
                </div>
                <div className="certificate-copy">
                  <p>
                    {[certificate.issuer, certificate.platform !== certificate.issuer ? certificate.platform : null, certificate.issueDate]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <h3>{certificate.name}</h3>
                  <div className="certificate-links">
                    {certificate.credentialUrl ? (
                      <a href={certificate.credentialUrl} target="_blank" rel="noreferrer">
                        View credential <span aria-hidden="true">↗</span>
                      </a>
                    ) : null}
                    {certificate.credentials?.map((credential) => (
                      <a key={credential.url} href={credential.url} target="_blank" rel="noreferrer">
                        {credential.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      );
    }

    return (
      <section className="contact-section tab-contact" id="contact-panel" role="tabpanel" aria-labelledby="contact-tab">
        <div className="section-shell contact-shell">
          <p className="contact-kicker"><span className="status-dot" /> Open to AI opportunities and collaborations</p>
          <h2>Let&apos;s <em>connect.</em></h2>
          <p>Feel free to reach out if you would like to discuss an AI project, an internship, or a new opportunity.</p>
          <div className="contact-grid">
            {portfolio.contact.map((item) => {
              const content = (
                <>
                  <span className="contact-item-label">{item.label}</span>
                  <span className="contact-item-value">{item.value}</span>
                  <span className="contact-item-arrow" aria-hidden="true">{item.href ? "↗" : "•"}</span>
                </>
              );

              return item.href ? (
                <a className="contact-item" href={item.href} key={item.label} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div className="contact-item" key={item.label}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Header
        initials={portfolio.person.initials}
        navigation={portfolio.navigation}
        email={portfolio.person.email}
        activeTab={activeTab}
        onNavigate={navigate}
      />

      <main className="tab-stage">
        <div className="tab-panel" data-direction={direction} key={activeTab}>
          {renderActivePanel()}
        </div>
      </main>

      <Footer name={portfolio.person.name} initials={portfolio.person.initials} socials={portfolio.socials} />
    </>
  );
}
