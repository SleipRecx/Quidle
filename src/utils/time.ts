export const getTodaysDate = (): string => {
  // YYYY-MM-DD

  /*
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];*/
  let myDate = new Date();
  const offset = new Date().getTimezoneOffset();
  myDate = new Date(myDate.getTime() - offset * 60 * 1000);
  return myDate.toISOString().split("T")[0];
};
