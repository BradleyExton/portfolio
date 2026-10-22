import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/copy/caseStudies";
import { caseStudyMetadata } from "@/copy/metadata";
import CaseStudyPage from "@/features/work/CaseStudyPage";

type CaseStudyRouteProps = {
  params: Promise<{ slug: string }>;
};

// Only the studies in the copy module exist; anything else is a 404 at build.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyRouteProps): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) {
    return {};
  }

  return caseStudyMetadata({
    slug: study.slug,
    title: study.title,
    summary: study.summary,
    coverSrc: study.cover.src,
  });
}

export default async function CaseStudyRoutePage({ params }: CaseStudyRouteProps) {
  const study = getCaseStudy((await params).slug);
  if (!study) {
    notFound();
  }

  return <CaseStudyPage study={study} />;
}
