//theme.js

// Actions
export const THEME_SELECTED = 'math-game-web/complexity/THEME_SELECTED';

// Reducer
export default function theme(state = {}, action) {
  switch (action.type) {
    case THEME_SELECTED:
      return action.theme;
    default:
      return state;
  }
}

// Actions creators
export function themeSelected(text) {
  return {
    type: THEME_SELECTED,
    theme: text.value,
  };
}
