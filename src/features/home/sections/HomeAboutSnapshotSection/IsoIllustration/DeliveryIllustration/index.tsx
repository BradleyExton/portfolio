import { IsoBox, IsoShadow, SCENE_ORIGIN_X, SCENE_VIEW_BOX, shades } from "@/features/shared/isoKit";
import {
  BlockedCard,
  COLUMNS,
  ColumnSlab,
  EpicTile,
  PaperCard,
  ProductionApp,
  ROW_BACK,
  ROW_FRONT,
  ROW_MID,
  ShippedTile,
  SpecFace,
} from "./BoardParts";
import * as styles from "./styles";

/* A board that runs, rather than a board that sits. Three cut column slabs
   read left to right the way a real one does — to do, in progress, done — and
   the work crosses them on a single 9.6s timeline shared by every element
   (see the iso-dlv keyframes in globals.css).

   Two stories run in parallel so the card is never showing one lonely tile
   sliding around. Card A takes the front row all the way through: its face
   swaps spec -> build -> shipped as it goes, the build face fills a progress
   bar, and after its check it lifts off the board entirely and docks into the
   production window. Card B works the back row and carries the part of
   delivery that is not a happy path: it stalls, takes an amber blocker badge
   and a wiggle, clears, finishes its bar, and moves to done.

   Two ordering rules hold the scene together. Production is drawn last, so a
   card shipping into it passes behind the window rather than over it. And
   every animated element sits inside a plain positioning group, because a CSS
   transform animation replaces an SVG transform attribute outright — animate
   a positioned element directly and it snaps to the scene origin.

   Amber is spent entirely on the blocker badge: it is the one thing here that
   wants attention. */

export function DeliveryIllustration() {
  return (
    <svg viewBox={SCENE_VIEW_BOX} xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      {/* 195 centres this scene's bounding box in the 405-tall frame; the
          board plus the production pad run 356 units, so the slack splits to
          about 6% above and below. */}
      <g transform={`translate(${SCENE_ORIGIN_X},195)`}>
        <g className={styles.pieces[0]}>
          <IsoBox u={0} v={0} w={344} d={300} h={10} shade={shades.board} />
        </g>

        {COLUMNS.map((column, index) => (
          <g key={column.u} className={styles.pieces[index + 1]}>
            <ColumnSlab u={column.u} chip={column.chip} count={styles.dlv.counts[index]} />
          </g>
        ))}

        {/* Standing work: the board is populated before anything moves. */}
        <g className={styles.pieces[4]}>
          <EpicTile u={-114} v={ROW_BACK} />
        </g>
        <g className={styles.pieces[5]}>
          <PaperCard u={-114} v={ROW_MID}>
            <SpecFace />
          </PaperCard>
        </g>
        <g className={styles.pieces[6]}>
          <ShippedTile u={114} v={ROW_MID} />
        </g>

        {/* Card B's landing cell, released before it arrives. */}
        <ShippedTile u={114} v={ROW_BACK} ghost />

        {/* Base opacity is the resting value, not 1: the keyframes drive it
           while running, but a reduced-motion visitor sees this number. */}
        <g className={styles.dlv.shadowB}>
          <IsoShadow u={0} v={ROW_BACK} w={88} d={56} opacity={0.12} />
        </g>
        <g className={styles.dlv.cardB}>
          <BlockedCard />
        </g>
        <g className={styles.dlv.nextB}>
          <PaperCard u={0} v={ROW_BACK}>
            <rect x="-34" y="-21" width="26" height="6" rx="3" fill="#10b981" />
            <rect x="-34" y="-10" width="42" height="4.5" rx="2.25" fill="#c9d8d0" />
            <rect x="-34" y="4" width="54" height="5" rx="2.5" fill="#dde8e2" />
            <rect x="-34" y="4" width="23" height="5" rx="2.5" fill="#34d399" />
          </PaperCard>
        </g>

        <g className={styles.dlv.shadowA}>
          <IsoShadow u={-114} v={ROW_FRONT} w={88} d={56} opacity={0.12} />
        </g>
        <g className={styles.dlv.cardA}>
          <PaperCard u={-114} v={ROW_FRONT}>
            <g className={styles.dlv.faceSpec}>
              <SpecFace />
            </g>
            <g className={styles.dlv.faceBuild}>
              <rect x="-34" y="-21" width="26" height="6" rx="3" fill="#10b981" />
              <rect x="-34" y="-10" width="38" height="4.5" rx="2.25" fill="#c9d8d0" />
              <rect x="-34" y="4" width="54" height="5" rx="2.5" fill="#dde8e2" />
              <g transform="translate(-34,4)">
                <rect x="0" y="0" width="54" height="5" rx="2.5" fill="#34d399" className={styles.dlv.progressA} />
              </g>
              <circle cx="28" cy="15" r="5" fill="#a7f3d0" />
            </g>
            <g className={styles.dlv.faceShip}>
              <rect x="-34" y="-21" width="26" height="6" rx="3" fill="#059669" />
              <rect x="-34" y="-10" width="32" height="4.5" rx="2.25" fill="#dde8e2" />
              <g transform="translate(22,4)">
                <g className={styles.dlv.checkA}>
                  <circle r="10" fill="#10b981" />
                  <path
                    d="M -4.2 0.4 L -1.1 3.6 L 4.9 -3.6"
                    fill="none"
                    stroke="#ecfdf5"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <circle r="10" fill="none" stroke="#10b981" strokeWidth="2.5" className={styles.dlv.ringA} />
              </g>
            </g>
          </PaperCard>
        </g>
        <g className={styles.dlv.nextA}>
          <PaperCard u={-114} v={ROW_FRONT}>
            <SpecFace />
          </PaperCard>
        </g>

        {/* Last, so the ship leg passes behind the window it docks into. */}
        <g className={styles.pieces[7]}>
          <ProductionApp />
        </g>
      </g>
    </svg>
  );
}
