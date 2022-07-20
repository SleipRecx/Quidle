export const getTodaysDate = (): string => {
  // YYYY-MM-DD

  /*
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];*/

  return new Date().toISOString().split("T")[0];
};
