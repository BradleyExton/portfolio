// Everything on the line runs the scene's carry bar, so the belt can never
// index out of time with the arms that empty it. Base state is each crate
// parked on its own slot, which is what a still or a reduced-motion render
// shows: a loaded line rather than a bare slab.

export const crate = "iso-loop-belt-crate";

// The far copy has no upstream neighbour to receive from, so it fades up out of
// the spec panel as it takes its slot instead of appearing from nowhere.
export const feed = "iso-loop-belt-feed";

export const step = "iso-loop-belt-step";
