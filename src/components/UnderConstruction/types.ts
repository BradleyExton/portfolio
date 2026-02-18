import type { ReactNode } from "react";

export type SocialLink = {
  label: string;
  href: string;
  external: boolean;
  icon: ReactNode;
};
