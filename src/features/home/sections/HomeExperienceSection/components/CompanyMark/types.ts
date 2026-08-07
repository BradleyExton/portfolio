import type { ReactElement } from "react";

// Each mark is drawn from the employer's real logo geometry, so the palette is
// the only thing that changes between the light cards and the emerald current
// card. Tones are passed down as class names rather than fill attributes to
// keep the marks on semantic tokens.
export type CompanyMarkTone = {
  inkFill: string;
  accentFill: string;
  inkStroke: string;
  accentStroke: string;
};

export type CompanyMarkProps = {
  company: string;
  inverse?: boolean;
};

// Three of the four marks are square; the Weedmaps wordmark needs a wider box
// to carry the same optical weight beside the company name.
export type CompanyMarkDefinition = {
  viewBox: string;
  className: string;
  render: (tone: CompanyMarkTone) => ReactElement;
};
