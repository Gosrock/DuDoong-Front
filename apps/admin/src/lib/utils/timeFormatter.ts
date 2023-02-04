const monthEng = [
  '',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const timeFormatter = (date: Date, time: Date) => {
  const month = monthEng.findIndex(
    (el: string) => el === date.toDateString().split(' ')[1],
  );
  const convertedMonth = month < 10 ? '0' + month : month;
  const convertedDate =
    date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const convertedHour =
    time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
  const convertedMinute =
    time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
  return (
    date.getFullYear() +
    '.' +
    convertedMonth +
    '.' +
    convertedDate +
    ' ' +
    convertedHour +
    ':' +
    convertedMinute
  );
};

export default timeFormatter;
