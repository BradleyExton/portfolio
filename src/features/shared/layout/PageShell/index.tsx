import type { ReactNode } from "react";
import SiteFooter from "@/features/shared/layout/SiteFooter";
import SiteHeader from "@/features/shared/layout/SiteHeader";
import { cn } from "@/features/shared/designSystem/cn";
import * as styles from "./styles";

type PageShellProps = {
  children: ReactNode;
  mainClassName?: string;
};

export function PageShell({ children, mainClassName }: PageShellProps) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className={cn(styles.main, mainClassName)}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
