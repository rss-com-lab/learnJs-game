// maxnumber.js

// Actions
export const MAX_NUMBER_INCREASED = 'math-game-web/maxnumber/MAXNUMBER_INCREASED';
export const MAX_NUMBER_DECREASED = 'math-game-web/maxnumber/MAXNUMBER_DECREASED';

// Reducer
export default function maxnumber (state = 10, action) {
  switch (action.type) {
    case MAX_NUMBER_INCREASED: 
    	return state + action.step; 
    case MAX_NUMBER_DECREASED: 
    	return  state - action.step ;
    default: return state;
  }
}

//Actions creators
export function maxnumberIncreased () {
  return {
    type: MAX_NUMBER_INCREASED,
    step: 1 
  }
}

export function maxnumberDecreased () {
  return {
    type: MAX_NUMBER_DECREASED,
    step: 1 
  }
}