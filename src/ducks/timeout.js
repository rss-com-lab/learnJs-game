// timeout.js

// Actions
export const TIMEOUT_INCREASED = 'math-game-web/timeout/TIMEOUT_INCREASED';
export const TIMEOUT_DECREASED = 'math-game-web/timeout/TIMEOUT_DECREASED';

// Reducers
export default function timeout(state = 10, action) {
  switch (action.type) {
    case TIMEOUT_INCREASED:
      return state + action.step;
    case TIMEOUT_DECREASED:
      return state - action.step;
    default:
      return state;
  }
}

//Actions creators
export function timeoutIncreased() {
  return {
    type: TIMEOUT_INCREASED,
    step: 1,
  };
}

export function timeoutDecreased() {
  return {
    type: TIMEOUT_DECREASED,
    step: 1,
  };
}
