export const getGridCols = (num) => {
  if (num === 1) return "grid-cols-1";
  if (num === 2) return "grid-cols-1 md:grid-cols-2";
  if (num === 3) return "grid-cols-1 md:grid-cols-3";
  if (num === 4) return "grid-cols-1 md:grid-cols-2";
  return "grid-cols-1 md:grid-cols-3";
};