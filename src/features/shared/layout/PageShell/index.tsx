import type { ReactNode } from "react";
import SiteFooter from "@/features/shared/layout/SiteFooter";
import SiteHeader from "@/features/shared/layout/SiteHeader";
import * as styles from "./styles";

type PageShellProps = {
  children: ReactNode;
  mainClassName?: string;
};

const mergeMainClassNames = (mainClassName: string | undefined): string =>
  [styles.main, mainClassName].filter(Boolean).join(" ");

export function PageShell({ children, mainClassName }: PageShellProps) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className={mergeMainClassNames(mainClassName)}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
