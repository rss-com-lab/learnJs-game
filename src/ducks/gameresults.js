// gameresults.js

// Actions
export const SET_SCORE = 'math-game-web/gameresults/SET_SCORE';
export const CLEAR_SCORE = 'math-game-web/gameresults/CLEAR_SCORE';

// Reducer
let initialState = {time: 0, levels: 0, tests: 0};

export default function gameResults(state = initialState, action) {
  switch (action.type) {
    case SET_SCORE:
      return {
        ...state,
        time: action.time,
        levels: action.levels,
        tests: action.tests,
      };
    case CLEAR_SCORE:
      return {
        ...state,
        time: action.time,
        levels: action.levels,
        tests: action.tests,
      };
    default:
      return state;
  }
}

// Action creators
export function setScore(time, levels, tests) {
  return {
    type: SET_SCORE,
    time: time,
    levels: levels,
    tests: tests,
  };
}

export function clearScore() {
  return {
    type: CLEAR_SCORE,
    time: 0,
    levels: 0,
    tests: 0,
  };
}
