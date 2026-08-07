/* Terminal projected onto the hero photo's monitor. Sized in image-space
   pixels (the 1536x1024 source photo); the cluster anchor in ../utils.ts
   scales the whole cluster to the background's cover crop, so these fixed
   pixel sizes stay glued to the monitor at every viewport. Colors reach for
   palette vars directly, matching the iso-illustration tier: this is scenery
   inside a photo, not themeable UI surface. */

export const stage = "relative h-[292px] w-[336px]";

export const glow =
  "absolute -inset-5 rounded-[24px] bg-[radial-gradient(70%_60%_at_50%_45%,color-mix(in_srgb,var(--color-primary-400)_30%,transparent)_0%,transparent_70%)] blur-2xl";

/* The monitor screen in the hero photo is a perspective quad; this matrix3d
   maps the flat 336x292 terminal onto the glass, relative to the cluster
   anchor utils.ts places at the quad's bounding-box origin (953, 422) in
   image space. The quad corners were measured from the photo's luminance
   edges and inset 2px so the terminal never laps onto the bezel. Recompute
   the matrix if the hero photo changes. */
export const frame =
  "absolute left-0 top-0 h-[292px] w-[336px] origin-top-left overflow-hidden bg-[color-mix(in_srgb,var(--color-neutral-900)_55%,transparent)] [transform:matrix3d(0.71359285,-0.20178053,0,-0.00078048,-0.01128586,0.74714096,0,0.00001034,0,0,1,0,4.8,69.2,0,1)]";

export const sheen =
  "pointer-events-none absolute inset-0 [background:radial-gradient(130%_90%_at_16%_0%,color-mix(in_srgb,var(--color-primary-400)_12%,transparent)_0%,transparent_58%)]";

export const chrome =
  "flex items-center gap-1.5 border-b border-[color-mix(in_srgb,var(--color-neutral-400)_16%,transparent)] px-3.5 py-2";

export const chromeDot =
  "h-[6px] w-[6px] rounded-full bg-[color-mix(in_srgb,var(--color-neutral-400)_38%,transparent)]";

export const chromeTitle =
  "ml-2 font-mono text-[10px] tracking-wide text-[color-mix(in_srgb,var(--color-neutral-300)_72%,transparent)]";

export const body =
  "flex flex-col gap-[7px] px-4 py-3 font-mono text-[11.5px] leading-[1.5]";

export const promptLine =
  "flex items-center gap-1.5 text-[var(--color-neutral-100)]";

export const promptSymbol = "text-[var(--color-primary-400)]";

export const cursor =
  "ml-0.5 inline-block h-[13px] w-[7px] bg-[var(--color-primary-300)] motion-safe:animate-[iso-blink_1.1s_steps(1)_infinite]";

export const statusLine =
  "flex items-baseline gap-2 text-[var(--color-neutral-300)] motion-safe:animate-[screen-line-in_240ms_ease-out]";

export const dotDone =
  "relative h-[7px] w-[7px] shrink-0 self-center rounded-full bg-[var(--color-primary-400)]";

export const dotWorking =
  "relative h-[7px] w-[7px] shrink-0 self-center rounded-full bg-[var(--color-accent-400)] motion-safe:animate-[iso-twinkle_1.2s_ease-in-out_infinite]";

export const meta = "ml-auto text-[10.5px] text-[var(--color-primary-300)]";

export const doneLine =
  "flex items-center gap-2 text-[var(--color-primary-300)] motion-safe:animate-[screen-line-in_240ms_ease-out]";

export const doneCheck = "text-[var(--color-primary-400)]";
