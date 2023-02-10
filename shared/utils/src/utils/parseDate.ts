export const parseDate = (arg: string, formating?: boolean) => {
  const day = new Date(arg);
  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = WEEKDAY[day.getDay()];
  const [date, time] = arg.split(' ');

  const splited = date.split('.');

  const parsedDate = formating
    ? `${splited[0]}년 ${splited[1]}월 ${splited[2]}일 (${weekday})`
    : `${date} (${weekday})`;
  return [parsedDate, time];
};
