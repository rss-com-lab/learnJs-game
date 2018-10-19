//levels.js

// Actions
export const SET_LEVELS_CONFIG = 'math-game-web/complexity/SET_LEVELS_CONFIG';

// Reducer
export default function complexity(state = {}, action) {
  switch (action.type) {
    case SET_LEVELS_CONFIG:
      return {
        ...state,
        config: action.config,
      };
    default:
      return state;
  }
}

// Actions creators
export function setLevelsConfig(data) {
  return {
    type: SET_LEVELS_CONFIG,
    config: data,
  };
}
