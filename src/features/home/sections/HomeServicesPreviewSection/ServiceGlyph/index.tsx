import type { ServiceKey } from "../types";
import * as styles from "./styles";

type ServiceGlyphProps = Readonly<{
  serviceKey: ServiceKey;
  className?: string;
}>;

// Amber marks the single payoff node in each glyph (the peak, the shipped
// check, the spark). Everything else inherits the row's currentColor so the
// mark tints with the row rather than fighting it.
const ACCENT = "var(--color-accent-500)";

function AiWorkflowMark() {
  return (
    <>
      <g className={styles.stroke}>
        <path d="M15 33.5 24 17.5" />
        <path d="M24 17.5 33 33.5" />
        <path d="M15 33.5h18" />
        <circle cx="24" cy="15" r="4.2" />
        <circle cx="13" cy="35" r="4.2" />
        <circle cx="35" cy="35" r="4.2" />
      </g>
      <path d="M39.5 11.5v6M36.5 14.5h6" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="24" cy="15" r="1.6" fill="currentColor" />
    </>
  );
}

function WebsiteMark() {
  return (
    <>
      <g className={styles.stroke}>
        <rect x="6" y="9" width="36" height="30" rx="3.5" />
        <path d="M6 17h36" />
        <path d="M12 24.5l6 5 6-9 7 6" />
      </g>
      <circle cx="10.5" cy="13" r="1.3" fill="currentColor" />
      <circle cx="14.5" cy="13" r="1.3" fill="currentColor" opacity="0.55" />
      <circle cx="18.5" cy="13" r="1.3" fill="currentColor" opacity="0.3" />
      <circle cx="31" cy="26.5" r="2.6" fill={ACCENT} />
    </>
  );
}

function WebAppMark() {
  return (
    <>
      <g className={styles.stroke}>
        <rect x="6" y="9" width="36" height="30" rx="3.5" />
        <path d="M18 9v30" />
        <path d="M10 17h4M10 22h4M10 27h4" />
        <rect x="23" y="15" width="14" height="7" rx="2" />
        <rect x="23" y="26" width="14" height="7" rx="2" />
      </g>
      <path
        d="M25.5 29.5l2 2 4-4"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

const markByServiceKey: Record<ServiceKey, () => React.ReactElement> = {
  aiTools: AiWorkflowMark,
  websites: WebsiteMark,
  webApps: WebAppMark,
};

export function ServiceGlyph({ serviceKey, className }: ServiceGlyphProps) {
  const Mark = markByServiceKey[serviceKey];

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <Mark />
    </svg>
  );
}
