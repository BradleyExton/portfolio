export const getServiceNumber = (index: number): string =>
  String(index + 1).padStart(2, "0");
