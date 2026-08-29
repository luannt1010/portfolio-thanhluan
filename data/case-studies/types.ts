export type CaseStudyFact = {
  label: string;
  value: string;
};

export type CaseStudyMetric = {
  value: string;
  label: string;
  detail?: string;
};

export type CaseStudyFigure = {
  src: string;
  alt: string;
  caption: string;
  fit?: "cover" | "contain";
};

export type CaseStudySection = {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  figures?: CaseStudyFigure[];
  figureLayout?: "stack" | "gallery";
};

export type CaseStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  repositoryUrl: string;
  accent: string;
  disclaimer?: string;
  facts: CaseStudyFact[];
  metrics: CaseStudyMetric[];
  technologies: string[];
  sections: CaseStudySection[];
};
