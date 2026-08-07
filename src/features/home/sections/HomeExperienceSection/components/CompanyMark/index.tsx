import type { ReactElement } from "react";
import type { CompanyMarkDefinition, CompanyMarkProps, CompanyMarkTone } from "./types";
import * as styles from "./styles";

// Brand recreations of each employer's mark. The geometry is traced from the
// real logos so they stay recognisable; only the palette is swapped, onto the
// site's emerald/amber tokens, so four unrelated brands read as one set.
// Every mark is normalised into the same 48x48 box for optical balance.

function LocalLogicMark(tone: CompanyMarkTone): ReactElement {
  // Two interlocking brackets, the original's tonal pair kept intact.
  return (
    <g transform="translate(3.74 2) scale(1.158)">
      <path d="M9 0H0V37H23V29H9V0Z" className={tone.inkFill} />
      <path d="M26 38H35V1H12V9H26V38Z" className={tone.accentFill} />
    </g>
  );
}

function RenoRunMark(tone: CompanyMarkTone): ReactElement {
  // Rounded tile with the knocked-out R and its folded corner.
  return (
    <g transform="translate(2 2) scale(0.9167)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        className={tone.inkFill}
        d="M37.3556 0H10.557C4.7642 0 0 4.77288 0 10.5763V37.4237C0 43.2271 4.7642 48 10.557 48H37.3556C43.1485 48 47.9127 43.2271 47.9127 37.4237V10.522C47.9127 4.71865 43.1485 0 37.3556 0ZM34.5946 20.8814C33.9449 25.2746 29.8845 28.1492 25.4993 28.1492H18.5154L13.1015 34.7119C12.7767 35.0915 12.2353 34.9288 12.2895 34.4407L13.2098 28.1492L14.7798 17.2475L14.9964 15.783C15.2671 13.722 17.0537 12.2034 19.1109 12.2034H20.5185H21.6013H27.7731C32.1583 12.2576 35.1901 16.4881 34.5946 20.8814Z"
      />
      <path
        className={tone.accentFill}
        d="M18.5154 28.1491H27.2317C28.5852 28.1491 29.8845 28.6915 30.8048 29.722L35.5149 34.8203C35.8397 35.1458 35.569 35.6881 35.1359 35.6881H26.8527C25.9865 35.6881 25.1744 35.3085 24.5789 34.6576L18.5154 28.1491Z"
      />
    </g>
  );
}

function OpswareDataMark(tone: CompanyMarkTone): ReactElement {
  // Outer ring around the power glyph, redrawn as strokes rather than the
  // original's single 6kb compound path.
  return (
    <g fill="none" strokeLinecap="round">
      <path
        d="M21.37 45.44A21.6 21.6 0 1 1 26.63 45.44"
        strokeWidth="4.5"
        className={tone.inkStroke}
      />
      <path
        d="M34.13 18.15A11.7 11.7 0 1 1 24 12.3"
        strokeWidth="4.7"
        className={tone.accentStroke}
      />
      <path d="M24 5V26.5" strokeWidth="4.7" className={tone.accentStroke} />
    </g>
  );
}

function WeedmapsMark(tone: CompanyMarkTone): ReactElement {
  // Lowercase wordmark over its smile, the compact mark used in their header.
  return (
    <g transform="translate(1.6 5.9) scale(1.72)" fillRule="evenodd" clipRule="evenodd">
      <path
        className={tone.inkFill}
        d="M20.028.492v1.37h.04c.367-.521.81-.926 1.329-1.214.518-.287 1.113-.43 1.782-.43.643 0 1.23.124 1.763.371.531.248.935.686 1.21 1.313.302-.445.713-.836 1.231-1.176.519-.34 1.132-.509 1.842-.509a5.5 5.5 0 0 1 1.496.196c.46.13.853.339 1.181.626.329.288.584.663.768 1.127.185.463.276 1.022.276 1.675v6.775H30.15V4.879c0-.34-.013-.66-.04-.96a2.023 2.023 0 0 0-.216-.784 1.313 1.313 0 0 0-.522-.528c-.23-.13-.542-.197-.935-.197-.394 0-.712.076-.955.226a1.63 1.63 0 0 0-.571.588c-.138.24-.23.516-.276.823a6.254 6.254 0 0 0-.07.93v5.639H23.77v-5.68c0-.3-.006-.597-.019-.89a2.49 2.49 0 0 0-.167-.813 1.254 1.254 0 0 0-.492-.597c-.23-.15-.569-.226-1.015-.226-.131 0-.305.03-.522.089-.216.058-.427.17-.63.333-.204.163-.377.398-.521.705-.146.307-.217.709-.217 1.205v5.874H17.39V.492h2.638ZM9.769 10.616 7.957 3.82h-.04l-1.732 6.795H3.29L.06.492h2.955l1.87 6.873h.04L6.618.492h2.718l1.733 6.854h.04l1.87-6.854h2.875l-3.21 10.124H9.77Z"
      />
      <path
        className={tone.accentFill}
        d="M16.622 16.549c6.045 0 9.104-2.283 9.104-2.283l1.301 1.75s-4.514 3.805-10.405 3.805c-5.891 0-10.405-3.805-10.405-3.805l1.301-1.75s3.06 2.283 9.104 2.283Z"
      />
    </g>
  );
}

const SQUARE_BOX = { viewBox: "0 0 48 48", className: styles.mark } as const;

const MARKS: Record<string, CompanyMarkDefinition> = {
  "Local Logic": { ...SQUARE_BOX, render: LocalLogicMark },
  RenoRun: { ...SQUARE_BOX, render: RenoRunMark },
  "Opsware Data": { ...SQUARE_BOX, render: OpswareDataMark },
  Weedmaps: { viewBox: "0 0 60 48", className: styles.markWide, render: WeedmapsMark },
};

const LIGHT_TONE: CompanyMarkTone = {
  inkFill: styles.inkFill,
  accentFill: styles.accentFill,
  inkStroke: styles.inkStroke,
  accentStroke: styles.accentStroke,
};

const INVERSE_TONE: CompanyMarkTone = {
  inkFill: styles.inkFillInverse,
  accentFill: styles.accentFillInverse,
  inkStroke: styles.inkStrokeInverse,
  accentStroke: styles.accentStrokeInverse,
};

export function CompanyMark({ company, inverse = false }: CompanyMarkProps) {
  const definition = MARKS[company];

  if (!definition) {
    return null;
  }

  return (
    <svg
      viewBox={definition.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={definition.className}
      aria-hidden="true"
      focusable="false"
    >
      {definition.render(inverse ? INVERSE_TONE : LIGHT_TONE)}
    </svg>
  );
}
