import type { ReactNode } from "react";

export type SocialLinkIconStyle = "fill" | "stroke";

export type SocialLink = {
  label: string;
  href: string;
  external: boolean;
  iconStyle: SocialLinkIconStyle;
  icon: ReactNode;
};
