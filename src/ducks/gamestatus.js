//gamestatus.js

//Actions
export const START_GAME = 'math-game-web/gamestatus/START_GAME';
export const PLAY_GAME = 'math-game-web/gamestatus/PLAY_GAME';
export const NEXT_STAGE = 'math-game-web/gamestatus/NEXT_STAGE';
export const NEXT_LEVEL = 'math-game-web/gamestatus/NEXT_LEVEL';
export const GAME_OVER = 'math-game-web/gamestatus/GAME_OVER';

//Reducer
let initialState = {
  stageCount: 1,
  levelCount: 1,
  actionText: 'Начать игру',
  currentStatus: 'start',
  playStatus: true,
};

export default function gameStatus(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        stageCount: 1,
        levelCount: 1,
        actionText: action.actionText,
        playStatus: action.playStatus,
        currentStatus: action.currentStatus,
      };
    case PLAY_GAME:
      return {
        ...state,
        stageCount: state.stageCount + action.stageCount,
        levelCount: state.levelCount + action.levelCount,
        actionText: action.actionText,
        playStatus: action.playStatus,
        currentStatus: action.currentStatus,
      };
    case NEXT_STAGE:
      return {
        ...state,
        stageCount: state.stageCount + action.stageCount,
        levelCount: state.levelCount,
        actionText: action.actionText,
        playStatus: action.playStatus,
        currentStatus: action.currentStatus,
      };
    case NEXT_LEVEL:
      return {
        ...state,
        stageCount: 1,
        levelCount: state.levelCount + action.levelCount,
        actionText: action.actionText,
        playStatus: action.playStatus,
        currentStatus: action.currentStatus,
      };
    case GAME_OVER:
      return {
        ...state,
        stageCount: state.stageCount,
        levelCount: state.levelCount,
        actionText: action.actionText,
        playStatus: action.playStatus,
        currentStatus: action.currentStatus,
      };
    default:
      return state;
  }
}

//Actions creators
export function gameStart(text) {
  return {
    type: START_GAME,
    stageCount: 1,
    levelCount: 1,
    actionText: text,
    currentStatus: 'start',
    playStatus: true,
  };
}

export function gamePlay(text) {
  return {
    type: PLAY_GAME,
    stageCount: 0,
    levelCount: 0,
    actionText: text,
    currentStatus: 'play',
    playStatus: true,
  };
}

export function nextStage(text) {
  return {
    type: NEXT_STAGE,
    stageCount: 1,
    levelCount: 0,
    actionText: text,
    currentStatus: 'next_stage',
    playStatus: false,
  };
}

export function nextLevel(text) {
  return {
    type: NEXT_LEVEL,
    stageCount: 0,
    levelCount: 1,
    actionText: text,
    currentStatus: 'next_level',
    playStatus: false,
  };
}

export function gameOver(text) {
  return {
    type: GAME_OVER,
    stageCount: 0,
    levelCount: 0,
    actionText: text,
    currentStatus: 'end',
    playStatus: false,
  };
}
