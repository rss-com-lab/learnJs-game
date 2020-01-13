// timeused.js

// Actions
export const TIME_USED = 'math-game-web/timeused/TIME_USED';
export const CLEAR_TIME_USED = 'math-game-web/timeused/CLEAR_TIME_USED';

// Reducers
export default function gameTime(state = 0, action) {
  switch (action.type) {
    case TIME_USED:
      return state + action.step;
    case CLEAR_TIME_USED:
      return action.step;
    default:
      return state;
  }
}

// Actions creators
export function timeUsed() {
  return {
    type: TIME_USED,
    step: 1,
  };
}

export function clearTimeUsed() {
  return {
    type: CLEAR_TIME_USED,
    step: 0,
  };
}
