import { cancerRecognitionCaseStudy } from "@/data/case-studies/cancer-recognition";
import { faceRecognitionCaseStudy } from "@/data/case-studies/face-recognition-system";
import { vietnameseAlprCaseStudy } from "@/data/case-studies/vietnamese-alpr";
import { realTimeSketchRecognitionCaseStudy } from "@/data/case-studies/real-time-sketch-recognition";
import { vietnameseClickbaitDetectionCaseStudy } from "@/data/case-studies/vietnamese-clickbait-detection";
import type { CaseStudy } from "@/data/case-studies/types";

export const caseStudies: CaseStudy[] = [
  faceRecognitionCaseStudy,
  vietnameseAlprCaseStudy,
  realTimeSketchRecognitionCaseStudy,
  vietnameseClickbaitDetectionCaseStudy,
  cancerRecognitionCaseStudy,
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export type {
  CaseStudy,
  CaseStudyFact,
  CaseStudyFigure,
  CaseStudyMetric,
  CaseStudySection,
} from "@/data/case-studies/types";
