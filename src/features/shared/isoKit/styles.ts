// The kit draws no chrome of its own. It owns the one class every iso scene
// needs — fill the box you are given — so scenes in different features do not
// each invent their own. It used to re-export this from the what-i-do folder
// next door, which stopped being the right home once /services started drawing
// on the same geometry.
export const svg = "h-full w-full";
