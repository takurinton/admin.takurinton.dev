export const getDateList = () => {
  let date = new Date("2021-08-27");
  const dateString = JSON.stringify(date).slice(1, 11);
  const today = new Date();
  // @ts-ignore
  const term = Math.floor((today - date) / 86400000);
  let dateList: string[] = [dateString];

  let current;
  for (let d = 0; d <= term; d++) {
    current = date.setDate(date.getDate() + 1);
    const newDate = new Date(current);
    const dateString = JSON.stringify(newDate).slice(1, 11);
    dateList.unshift(dateString);
  }

  return dateList;
};
