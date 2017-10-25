import {
  GAME_OVER,
  NEXT_LEVEL,
  START_GAME,
  PLAY_GAME,
} from '../actions/constants';

let initialState = {
  levelCount: 1,
  actionText: 'Начать игру',
  currentStatus: 'start',
  playStatus: false,
};

export default function gameStatus(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        levelCount: state.levelCount + action.levelCount,
        actionText: action.actionText,
        playStatus: action.playStatus,
        currentStatus: action.currentStatus,
      };
    case PLAY_GAME:
      return {
        ...state,
        levelCount: state.levelCount + action.levelCount,
        actionText: action.actionText,
        playStatus: action.playStatus,
        currentStatus: action.currentStatus,
      };
    case NEXT_LEVEL:
      return {
        ...state,
        levelCount: state.levelCount + action.levelCount,
        actionText: action.actionText,
        playStatus: action.playStatus,
        currentStatus: action.currentStatus,
      };
    case GAME_OVER:
      return {
        ...state,
        levelCount: state.levelCount + action.levelCount,
        actionText: action.actionText,
        playStatus: action.playStatus,
        currentStatus: action.currentStatus,
      };
    default:
      return state;
  }
}
