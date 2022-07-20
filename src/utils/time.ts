export const getTodaysDate = (): string => {
  // YYYY-MM-DD
  return new Date().toISOString().split("T")[0];
};
