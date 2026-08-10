import { BOARD_EDGE, IsoBox, OnGround, PAPER_EDGE, PLANE_LEFT, project, ring, shades } from "@/features/shared/isoKit";
import * as styles from "./styles";

/* An agent doing work, and a human keeping the last say. The console is the
   dark mass and stands at the back of the board; the work it produces steps
   forward across the floor toward the viewer, and the front tile carries the
   one amber note in the scene: the approval that has to happen before anything
   lands. That order matters more than the objects do — it is the difference
   between drawing automation and drawing automation you would let near a
   business. */

const BOARD_W = 328;
const BOARD_D = 286;
const BOARD_H = 8;

/* The console sits back-left rather than centred. A standing panel placed on
   the u+v=0 diagonal lands mid-frame, and everything downstream of it then has
   to fit in the near half of the board; pushing it back buys the thread its
   run. */
const CONSOLE_U = -46;
const CONSOLE_V = -62;
const CONSOLE_W = 178;
const CONSOLE_D = 34;
const CONSOLE_H = 95;

/* Work leaving the console. The steps are uneven in u and v on purpose: equal
   steps run straight down the screen in this basis, which reads as a stack
   rather than a thread. */
const STEPS = [
  { u: -40, v: 26 },
  { u: 32, v: 54 },
  { u: 104, v: 82 },
] as const;

/* Work arriving. Without these the left third of the board was bare floor, and
   the scene read as an agent with an out-tray and no in-tray. */
const SOURCES = [
  { u: -150, v: -34 },
  { u: -134, v: 46 },
] as const;

export function AiToolsIllustration() {
  return (
    <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      <g transform="translate(320,180)">
        <IsoBox u={0} v={0} w={BOARD_W} d={BOARD_D} h={BOARD_H} shade={shades.board} outline={BOARD_EDGE} />

        {/* Feeds into the console, drawn before it so the console covers the
            ends rather than the lines crossing its face. */}
        {SOURCES.map((source) => (
          <polyline
            key={`feed-${source.u}`}
            points={ring([
              [source.u, source.v, BOARD_H + 1],
              [CONSOLE_U - CONSOLE_W / 2 + 10, CONSOLE_V + CONSOLE_D / 2, BOARD_H + 1],
            ])}
            stroke="#a7f3d0"
            strokeWidth={4}
            strokeLinecap="round"
            fill="none"
          />
        ))}

        {SOURCES.map((source) => (
          <IsoBox
            key={`source-${source.u}`}
            u={source.u}
            v={source.v}
            w={90}
            d={66}
            h={10}
            base={BOARD_H}
            shade={shades.paper}
            outline={PAPER_EDGE}
          >
            <rect x={-26} y={-10} width={34} height={9} rx={4.5} fill="#059669" />
            <rect x={-26} y={3} width={20} height={7} rx={3.5} fill="#6ee7b7" />
          </IsoBox>
        ))}

        {/* Route the work travels, drawn under the tiles so each tile sits on
            its own line rather than beside it. */}
        <polyline
          points={ring([
            [CONSOLE_U, CONSOLE_V + CONSOLE_D / 2, BOARD_H + 1],
            [STEPS[0].u, STEPS[0].v, BOARD_H + 1],
            [STEPS[1].u, STEPS[1].v, BOARD_H + 1],
            [STEPS[2].u, STEPS[2].v, BOARD_H + 1],
          ])}
          stroke="#6ee7b7"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        <IsoBox
          u={CONSOLE_U}
          v={CONSOLE_V}
          w={CONSOLE_W}
          d={CONSOLE_D}
          h={CONSOLE_H}
          base={BOARD_H}
          shade={shades.ink}
        />

        {/* The console face, raked onto the wide side of the box. Art x runs
            along +u here, so this is laid out like a terminal read normally. */}
        <g transform={`translate(${project(CONSOLE_U, CONSOLE_V + CONSOLE_D / 2, BOARD_H)}) ${PLANE_LEFT}`}>
          <rect x={-76} y={-80} width={40} height={10} rx={5} fill="#34d399" />
          <rect x={-76} y={-62} width={104} height={9} rx={4.5} fill="#10b981" opacity={0.7} />
          <rect x={-76} y={-47} width={78} height={9} rx={4.5} fill="#10b981" opacity={0.45} />
          <rect x={-76} y={-32} width={114} height={9} rx={4.5} fill="#10b981" opacity={0.45} />
          <rect x={-76} y={-17} width={54} height={9} rx={4.5} fill="#6ee7b7" />
          <rect x={-16} y={-17} width={12} height={9} rx={2.5} fill="#a7f3d0" />
        </g>

        {/* Three steps of work. The first two are finished and pale; the front
            one is the one waiting on a person. */}
        {STEPS.map((step, index) => {
          const isApproval = index === STEPS.length - 1;
          return (
            <g key={`${step.u}-${step.v}`}>
              <IsoBox
                u={step.u}
                v={step.v}
                w={104}
                d={76}
                h={11}
                base={BOARD_H}
                shade={shades.paper}
                outline={PAPER_EDGE}
              />
              <OnGround u={step.u} v={step.v} h={BOARD_H + 11}>
                <rect x={-42} y={-26} width={52} height={10} rx={5} fill="#047857" />
                <rect x={-42} y={-9} width={70} height={9} rx={4.5} fill="#34d399" opacity={0.6} />
                {isApproval ? (
                  <rect x={-42} y={8} width={58} height={19} rx={9.5} fill="#fbbf24" />
                ) : (
                  <rect x={-42} y={8} width={40} height={9} rx={4.5} fill="#34d399" opacity={0.6} />
                )}
              </OnGround>
            </g>
          );
        })}

        {/* One packet in flight between the console and the first result. */}
        <g transform={`translate(${project(-52, -10, BOARD_H + 18)})`}>
          <polygon points="0,0 9,5.2 0,10.4 -9,5.2" fill="#34d399" />
        </g>
      </g>
    </svg>
  );
}
