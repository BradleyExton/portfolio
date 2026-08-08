import { BELT, DECK, iso, point, slats, slot } from "../ContextIllustration/utils";
import * as styles from "./styles";

/* The line that feeds the context stage: a belt running out of the foot of the
   spec panel and down to where Bradley stands, carrying crates of context one
   slot at a time.
   It is a separate piece from the scene because it has to be drawn between the
   spec panel and the figure — behind him, so his hand closes over the crate at
   the head of the line rather than under it. The crate he is actually holding
   is the scene's own, drawn in front of him; the two hand off at the loop seam
   at the same spot, so the swap is invisible. */

/* Same neutrals as the spec panel and the disc stack, so the line reads as
   hardware in the scene's own material family rather than as a second floor.
   The deck is the darkest of them and the rails the lightest: a run built the
   other way up — pale deck, banded across its full width — read as a staircase
   climbing to the panel, which is the one thing it must not look like. */
const RAIL = "#f1f6f3";
const CAP = "#e0eae5";
const DECK_FILL = "#c9d8d0";
const FRONT = "#b3c7bd";

const clipId = "iso-context-belt-deck";

/** Shared with the scene, which carries the same crate once it is off the line. */
export function LineCrate() {
  return (
    <>
      <polygon points="0,-9.4 13.7,-1.4 0,6.5 -13.7,-1.4" fill="#f8faf9" />
      <polygon points="-13.7,-1.4 0,6.5 0,17.3 -13.7,9.4" fill="#d1fae5" />
      <polygon points="13.7,-1.4 0,6.5 0,17.3 13.7,9.4" fill="#a7f3d0" />
      <polygon points="0,-4.7 6.8,-0.7 0,3.2 -6.8,-0.7" fill="#10b981" />
    </>
  );
}

/** A face of the run, given as its four (a, b, rise) corners. */
const face = (corners: readonly (readonly [number, number, number])[]) =>
  corners.map(([a, b, rise]) => point(a, b, rise)).join(" ");

const deckFace = face([
  [BELT.start, DECK.far, DECK.rise],
  [BELT.end, DECK.far, DECK.rise],
  [BELT.end, DECK.near, DECK.rise],
  [BELT.start, DECK.near, DECK.rise],
]);

export function ContextBelt() {
  return (
    <g>
      <clipPath id={clipId}>
        <polygon points={deckFace} />
      </clipPath>
      {/* End cap and front, drawn first: everything else stands on them. */}
      <polygon
        points={face([
          [BELT.end, BELT.far, BELT.rise],
          [BELT.end, BELT.near, BELT.rise],
          [BELT.end, BELT.near, 0],
          [BELT.end, BELT.far, 0],
        ])}
        fill={CAP}
      />
      <polygon
        points={face([
          [BELT.end, BELT.near, BELT.rise],
          [BELT.start, BELT.near, BELT.rise],
          [BELT.start, BELT.near, 0],
          [BELT.end, BELT.near, 0],
        ])}
        fill={FRONT}
      />
      <polygon
        points={face([
          [BELT.start, BELT.far, BELT.rise],
          [BELT.end, BELT.far, BELT.rise],
          [BELT.end, DECK.far, BELT.rise],
          [BELT.start, DECK.far, BELT.rise],
        ])}
        fill={RAIL}
      />
      <polygon
        points={face([
          [BELT.start, DECK.far, BELT.rise],
          [BELT.end, DECK.far, BELT.rise],
          [BELT.end, DECK.far, DECK.rise],
          [BELT.start, DECK.far, DECK.rise],
        ])}
        fill={CAP}
      />
      <polygon points={deckFace} fill={DECK_FILL} />
      {/* Slats index with the crates rather than gliding, so the deck reads as
          driven by the same clock and not as a second, faster motion. */}
      <g clipPath={`url(#${clipId})`}>
        <g className={styles.step}>
          {slats.map((a) => {
            const [x1, y1] = iso(a, DECK.far, DECK.rise);
            const [x2, y2] = iso(a, DECK.near, DECK.rise);
            return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={FRONT} strokeWidth="1.4" />;
          })}
        </g>
      </g>
      <polygon
        points={face([
          [BELT.start, DECK.near, BELT.rise],
          [BELT.end, DECK.near, BELT.rise],
          [BELT.end, BELT.near, BELT.rise],
          [BELT.start, BELT.near, BELT.rise],
        ])}
        fill={RAIL}
      />
      {/* Three copies, anchored a slot apart. Each steps forward one slot per
          bar and snaps home at the seam; because they are identical and evenly
          spaced, all the snap shows is the head slot emptying into his hands
          and a fresh crate joining at the spec end. */}
      {[0, 1, 2].map((index) => (
        <g key={index} transform={`translate(${slot(index).join(",")})`}>
          <g className={index === 0 ? styles.feed : styles.crate}>
            <LineCrate />
          </g>
        </g>
      ))}
    </g>
  );
}
