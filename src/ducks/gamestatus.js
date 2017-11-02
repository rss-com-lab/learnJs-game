//gamestatus.js

//Actions
export const START_GAME = 'math-game-web/gamestatus/START_GAME';
export const PLAY_GAME = 'math-game-web/gamestatus/PLAY_GAME';
export const NEXT_LEVEL = 'math-game-web/gamestatus/NEXT_LEVEL';
export const GAME_OVER = 'math-game-web/gamestatus/GAME_OVER';

//Reducer
let initialState = { levelCount: 1, actionText: 'Начать игру', currentStatus: 'start', playStatus: false }

export default function gameStatus (state = initialState, action) {
  switch (action.type) {
    case START_GAME: 
    	return { 
            ...state, 
            levelCount: 1, 
            actionText: action.actionText, 
            playStatus: action.playStatus,
            currentStatus: action.currentStatus 
        }
    case PLAY_GAME: 
        return { 
            ...state, 
            levelCount: state.levelCount + action.levelCount, 
            actionText: action.actionText, 
            playStatus: action.playStatus,
            currentStatus: action.currentStatus 
        }  
    case NEXT_LEVEL: 
    	return { 
            ...state, 
            levelCount: state.levelCount + action.levelCount, 
            actionText: action.actionText, 
            playStatus: action.playStatus,
            currentStatus: action.currentStatus 
        }
    case GAME_OVER: 
        return  { 
            ...state, 
            levelCount: state.levelCount, 
            actionText: action.actionText, 
            playStatus: action.playStatus,
            currentStatus: action.currentStatus 
        }
    default: 
    	return state
  }
}

//Actions creators
export function gameStart (text) {
  return {
    type: START_GAME,
    levelCount: 1,
    actionText: text,
    currentStatus: 'start',
    playStatus: false
  }
}

export function gamePlay (text) {
  return {
    type: PLAY_GAME,
    levelCount: 0,
    actionText: text,
    currentStatus: 'play',
    playStatus: true
  }
}

export function nextLevel (text) {
  return {
    type: NEXT_LEVEL,
    levelCount: 1,
	  actionText: text,
    currentStatus: 'next',
	  playStatus: false
  }
}

export function gameOver (text) {
  return {
    type: GAME_OVER,
   	levelCount: 0,
    actionText: text,
    currentStatus: 'end',
    playStatus: false
  }
}
