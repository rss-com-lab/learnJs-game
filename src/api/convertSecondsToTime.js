export function convertSecondsToTime(sec) {
  let minutes = String(Math.floor(sec / 60));
  let seconds = String(sec % 60);

  if (minutes.length < 2) {
    minutes = 0 + minutes;
  }
  if (seconds.length < 2) {
    seconds = 0 + seconds;
  }

  return `${minutes}:${seconds}`;
}
