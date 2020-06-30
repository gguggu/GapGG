import moment from "moment";

const useTimeDuration = time => {
  const processedTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
  const now = moment();
  let diffContent = '';

  const diff =  moment.duration(now.diff(processedTime));

  const diffYear = diff.asYears();
  const diffMonth = diff.asMonths();
  // const diffWeek = diff.asWeeks();
  const diffDay = handleRound(diff.asDays());
  const diffHour = diff.asHours();
  const diffMinute = diff.asMinutes();
  const diffSecond = diff.asSeconds();

  if(diffYear >= 1)
    diffContent = Math.floor(diffYear).toString().concat('년 전');
  else if(diffMonth >= 1)
    diffContent = Math.floor(diffMonth).toString().concat('달 전');
  else if(diffDay >= 1)
    diffContent = Math.floor(diffDay).toString().concat('일 전');
  else if(diffHour <24 && diffHour >= 1)
    diffContent = Math.floor(diffHour).toString().concat('시간 전');
  else if(diffMinute < 60 && diffMinute >= 1)
    diffContent = Math.floor(diffMinute).toString().concat('분 전');
  else if(diffSecond < 60 && diffSecond >= 1)
    diffContent = Math.floor(diffSecond).toString().concat('초 전');
  else
    diffContent = '방금 전';

  return diffContent;
};

const handleRound = (time) => {
  if(time >= 1)
    return Math.round(time);
  
  return time;
}

export default useTimeDuration;