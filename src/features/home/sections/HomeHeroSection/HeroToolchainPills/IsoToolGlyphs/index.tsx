import * as styles from "./styles";

/* Mini isometric glyphs in the site's iso illustration style: shared cube
   geometry (viewBox 36), brand palette via CSS vars, micro-animations from
   the iso keyframes in globals.css. */

const CUBE_TOP = "18,5 29,11.5 18,18 7,11.5";
const CUBE_LEFT = "7,11.5 18,18 18,30 7,23.5";
const CUBE_RIGHT = "29,11.5 18,18 18,30 29,23.5";
const RIGHT_FACE = "matrix(0.866,-0.5,0,1,18,18)";
const LEFT_FACE = "matrix(0.866,0.5,0,1,7,11.5)";
const TOP_FACE = "matrix(0.846,0.5,0.846,-0.5,7,11.5)";

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true" className={styles.glyph}>
      {children}
    </svg>
  );
}

export function IsoToolGlyph({ tool }: { tool: string }) {
  if (tool === "Claude Code") {
    return (
      <Svg>
        <polygon points={CUBE_TOP} fill="var(--color-primary-700)" />
        <polygon points={CUBE_LEFT} fill="var(--color-primary-800)" />
        <polygon points={CUBE_RIGHT} fill="var(--color-primary-900)" />
        <g transform={RIGHT_FACE}>
          <rect x="1.5" y="2.5" width="5" height="1.7" rx="0.85" fill="var(--color-primary-400)" />
          <rect x="1.5" y="5.5" width="7" height="1.7" rx="0.85" fill="var(--color-primary-200)" />
          <rect x="8.6" y="8.2" width="2.2" height="2.2" rx="0.5" fill="var(--color-primary-300)" className={styles.blink} />
        </g>
      </Svg>
    );
  }

  if (tool === "Codex") {
    return (
      <Svg>
        <polygon points={CUBE_TOP} fill="var(--color-primary-300)" />
        <polygon points={CUBE_LEFT} fill="var(--color-primary-600)" />
        <polygon points={CUBE_RIGHT} fill="var(--color-primary-700)" />
        <g fill="none" stroke="var(--color-surface)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.2 3.4L4.9 5.7L8.2 8" transform={LEFT_FACE} />
          <path d="M4.5 3.4L7.8 5.7L4.5 8" transform={RIGHT_FACE} />
        </g>
      </Svg>
    );
  }

  if (tool === "ChatGPT") {
    return (
      <Svg>
        <polygon points={CUBE_TOP} fill="var(--color-primary-100)" />
        <polygon points={CUBE_LEFT} fill="var(--color-primary-200)" />
        <polygon points={CUBE_RIGHT} fill="var(--color-primary-300)" />
        <g fill="var(--color-primary-700)" transform={RIGHT_FACE}>
          <circle cx="3" cy="6" r="1" />
          <circle cx="6.3" cy="6" r="1" />
          <circle cx="9.6" cy="6" r="1" />
        </g>
        <path d="M28 2.6c.5 2.6 1.6 3.7 4.2 4.2-2.6.5-3.7 1.6-4.2 4.2-.5-2.6-1.6-3.7-4.2-4.2 2.6-.5 3.7-1.6 4.2-4.2z" fill="var(--color-accent-500)" className={styles.twinkleA} />
      </Svg>
    );
  }

  if (tool === "MCP Servers") {
    return (
      <Svg>
        <polygon points="18,13 29,19.5 18,26 7,19.5" fill="var(--color-primary-100)" />
        <polygon points="7,19.5 18,26 18,30.5 7,24" fill="var(--color-primary-500)" />
        <polygon points="29,19.5 18,26 18,30.5 29,24" fill="var(--color-primary-600)" />
        <polygon points="18,3.5 29,10 18,16.5 7,10" fill="var(--color-primary-100)" />
        <polygon points="7,10 18,16.5 18,21 7,14.5" fill="var(--color-primary-500)" />
        <polygon points="29,10 18,16.5 18,21 29,14.5" fill="var(--color-primary-600)" />
        <circle cx="26.2" cy="13.7" r="1.2" fill="var(--color-accent-400)" className={styles.twinkleA} />
        <circle cx="26.2" cy="23.2" r="1.2" fill="var(--color-accent-400)" className={styles.twinkleB} />
      </Svg>
    );
  }

  if (tool === "React") {
    return (
      <Svg>
        <polygon points="18,20 28,25.5 18,31 8,25.5" fill="var(--color-neutral-200)" />
        <g fill="none" stroke="var(--color-primary-600)" strokeWidth="1.5">
          <ellipse cx="18" cy="13" rx="8.5" ry="3.4" />
          <ellipse cx="18" cy="13" rx="8.5" ry="3.4" transform="rotate(60 18 13)" />
          <ellipse cx="18" cy="13" rx="8.5" ry="3.4" transform="rotate(120 18 13)" />
        </g>
        <circle cx="18" cy="13" r="1.7" fill="var(--color-accent-500)" />
      </Svg>
    );
  }

  if (tool === "Next.js") {
    return (
      <Svg>
        <polygon points={CUBE_TOP} fill="var(--color-neutral-100)" />
        <polygon points={CUBE_LEFT} fill="var(--color-neutral-800)" />
        <polygon points={CUBE_RIGHT} fill="var(--color-neutral-900)" />
        <g fill="none" stroke="var(--color-surface)" strokeWidth="1.5" strokeLinecap="round" transform={RIGHT_FACE}>
          <path d="M3.5 8.8V3.2L8.8 8.8V3.2" strokeLinejoin="round" />
        </g>
      </Svg>
    );
  }

  if (tool === "TypeScript") {
    return (
      <Svg>
        <polygon points={CUBE_TOP} fill="var(--color-primary-200)" />
        <polygon points={CUBE_LEFT} fill="var(--color-primary-500)" />
        <polygon points={CUBE_RIGHT} fill="var(--color-primary-600)" />
        <g transform={RIGHT_FACE}>
          <text x="6.3" y="8.8" fill="var(--color-surface)" fontSize="7.5" fontWeight="800" textAnchor="middle">TS</text>
        </g>
      </Svg>
    );
  }

  if (tool === "Node.js") {
    return (
      <Svg>
        <polygon points="18,4 29,10.5 29,23.5 18,30 7,23.5 7,10.5" fill="var(--color-primary-600)" />
        <polygon points="18,4 29,10.5 18,17 7,10.5" fill="var(--color-primary-400)" />
        <text x="18" y="26" fill="var(--color-surface)" fontSize="9" fontWeight="800" textAnchor="middle">N</text>
      </Svg>
    );
  }

  if (tool === "Python") {
    return (
      <Svg>
        <polygon points="18,22.5 28,28 18,33.5 8,28" fill="var(--color-neutral-200)" />
        <path d="M12 6.5h7a4 4 0 014 4V13h-9.5a4 4 0 00-4 4v-6.5a4 4 0 012.5-4z" fill="var(--color-primary-500)" />
        <path d="M24 22.5h-7a4 4 0 01-4-4V16h9.5a4 4 0 014-4v6.5a4 4 0 01-2.5 4z" fill="var(--color-accent-500)" />
        <circle cx="13.4" cy="9.4" r="1.05" fill="var(--color-surface)" />
        <circle cx="22.6" cy="19.6" r="1.05" fill="var(--color-surface)" />
      </Svg>
    );
  }

  if (tool === "Tailwind CSS") {
    return (
      <Svg>
        <polygon points={CUBE_TOP} fill="var(--color-primary-50)" />
        <polygon points={CUBE_LEFT} fill="var(--color-primary-200)" />
        <polygon points={CUBE_RIGHT} fill="var(--color-primary-300)" />
        <g fill="none" stroke="var(--color-primary-500)" strokeWidth="1.7" strokeLinecap="round" transform={TOP_FACE}>
          <path d="M2.5 7.5Q4.5 4.5 6.5 6.5T10.5 5.5" />
          <path d="M2.5 10.5Q4.5 7.5 6.5 9.5T10.5 8.5" />
        </g>
      </Svg>
    );
  }

  return (
    <Svg>
      <polygon points="18,23 28,28.5 18,34 8,28.5" fill="var(--color-neutral-200)" />
      <g transform={LEFT_FACE}>
        <rect x="0.5" y="-11" width="15" height="12.5" rx="1.5" fill="var(--color-surface)" stroke="var(--color-primary-400)" strokeWidth="1.1" />
        <rect x="1" y="-10.5" width="14" height="2.6" rx="1" fill="var(--color-primary-200)" />
        <circle cx="2.8" cy="-9.2" r="0.7" fill="var(--color-primary-600)" />
        <circle cx="4.9" cy="-9.2" r="0.7" fill="var(--color-primary-600)" />
        <path d="M5.5 -6l5.4 3.2-5.4 3.2z" fill="var(--color-accent-500)" />
      </g>
    </Svg>
  );
}
