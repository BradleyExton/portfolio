import Image from "next/image";
import { Fragment } from "react";
import { Link } from "next-view-transitions";
import { caseStudies } from "@/copy/caseStudies";
import { homeCopy } from "@/copy/home";
import { ArrowRightIcon, SectionIntro } from "@/features/shared/designSystem";
import * as styles from "./styles";

const { selectedWork } = homeCopy;

export function HomeSelectedWorkSection() {
  return (
    <section id="work" className={styles.section} aria-labelledby="selected-work-heading">
      <div className={styles.container}>
        <SectionIntro
          eyebrow={selectedWork.eyebrow}
          title={<span id="selected-work-heading">{selectedWork.heading}</span>}
          description={selectedWork.description}
          className={styles.intro}
          eyebrowClassName={styles.eyebrow}
          titleClassName={styles.title}
          descriptionClassName={styles.description}
        />

        <ul className={styles.grid}>
          {caseStudies.map((study) => (
            <li key={study.slug} className={styles.item}>
              <Link
                href={`/work/${study.slug}`}
                prefetch={false}
                className={styles.card}
                aria-label={selectedWork.cardLabel({ title: study.title })}
              >
                <span className={styles.media}>
                  <Image
                    src={study.cover.src}
                    alt=""
                    width={study.cover.width}
                    height={study.cover.height}
                    sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
                    quality={70}
                    className={styles.mediaImage}
                  />
                </span>
                <span className={styles.body}>
                  <span className={styles.cardTitle}>
                    {study.title}
                    <ArrowRightIcon aria-hidden="true" className={styles.titleArrow} />
                  </span>
                  <span className={styles.summary}>{study.summary}</span>
                  <span className={styles.meta}>
                    {study.tags.map((tag, index) => (
                      <Fragment key={tag}>
                        {index > 0 ? (
                          <span aria-hidden="true" className={styles.metaSeparator}>
                            ·
                          </span>
                        ) : null}
                        <span>{tag}</span>
                      </Fragment>
                    ))}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
