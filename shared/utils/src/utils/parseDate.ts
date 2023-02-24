export const parseDate = (arg: string, formating?: boolean) => {
  const [date, time] = arg.split(' ');

  const splitedDate = date.split('.');
  const splitedTime = time.split(':');
  const day = new Date(
    parseInt(splitedDate[0]),
    parseInt(splitedDate[1]) - 1,
    parseInt(splitedDate[2]),
    parseInt(splitedTime[0]),
    parseInt(splitedTime[1]),
  );
  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = WEEKDAY[day.getDay()];

  const parsedDate = formating
    ? `${splitedDate[0]}년 ${splitedDate[1]}월 ${splitedDate[2]}일 (${weekday})`
    : `${date} (${weekday})`;
  return [parsedDate, time];
};
