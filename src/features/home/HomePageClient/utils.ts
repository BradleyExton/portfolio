export const startRevealAnimation = (
  onReveal: () => void,
): (() => void) => {
  const animationFrame = requestAnimationFrame(() => {
    onReveal();
  });

  return () => {
    cancelAnimationFrame(animationFrame);
  };
};
