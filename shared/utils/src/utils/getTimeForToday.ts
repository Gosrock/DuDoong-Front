const getTimeForToday = (arg: string) => {
  const today = new Date();

  const [date, time] = arg.split(' ');

  const splitedDate = date.split('.');
  const splitedTime = time.split(':');
  const timeValue = new Date(
    parseInt(splitedDate[0]),
    parseInt(splitedDate[1]) - 1,
    parseInt(splitedDate[2]),
    parseInt(splitedTime[0]),
    parseInt(splitedTime[1]),
  );

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60,
  );

  if (betweenTime < 1) return '방금 전';
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 4) {
    return `${betweenTimeDay}일전`;
  }

  return `${timeValue.getMonth() + 1}월 ${timeValue.getDate()}일`;
};

export default getTimeForToday;
