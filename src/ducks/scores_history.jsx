// scores_history.js

// Actions
export const RECORD_RESULT = 'math-game-web/scores_history/RECORD_RESULT';
export const CLEAR_RECORDS = 'math-game-web/scores_history/CLEAR_RECORDS';

// Reducer
let initialState = {figure: '', result: '0%'};

export default function scoresHistory(state = initialState, action) {
  switch (action.type) {
    case RECORD_RESULT:
      return {
        ...state,
        figure: action.figure,
        result: action.result,
      };
    case CLEAR_RECORDS:
      return {
        ...state,
        figure: action.figure,
        result: action.result,
      };
    default:
      return state;
  }
}

// Action creators
export function recordResult(figure, result) {
  return {
    type: RECORD_RESULT,
    figure: figure,
    result: result,
  };
}

export function clearRecords() {
  return {
    type: CLEAR_RECORDS,
    figure: 0,
    result: 0,
  };
}
