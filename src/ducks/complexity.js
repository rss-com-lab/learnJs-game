//complexity.js

// Actions
export const COMPLEXITY_SELECTED =
  'math-game-web/complexity/COMPLEXITY_SELECTED';

// Reducer
export default function complexity(state = 2, action) {
  switch (action.type) {
    case COMPLEXITY_SELECTED:
      return action.level;
    default:
      return state;
  }
}

// Actions creators
export function complexitySelected(text) {
  return {
    type: COMPLEXITY_SELECTED,
    level: text,
  };
}
