export function convertSecondsToTime(sec) {
  let minutes = String(Math.floor(sec / 60));
  let seconds = String(sec % 60);

  minutes.length < 2 ? (minutes = 0 + minutes) : null;
  seconds.length < 2 ? (seconds = 0 + seconds) : null;

  return `${minutes}:${seconds}`;
}
