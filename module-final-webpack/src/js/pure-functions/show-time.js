export function showTime(timestamp) {
  const time = new Date(timestamp);
  let hours = time.getHours();
  if (hours > 12) {
    return `${showWithExtraZero(hours - 12)}:${showWithExtraZero(
      time.getMinutes()
    )} PM`;
  } else {
    return `${showWithExtraZero(hours)}:${showWithExtraZero(
      time.getMinutes()
    )} AM`;
  }
}

function showWithExtraZero(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return `${number}`;
}
