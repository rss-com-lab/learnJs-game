// progress.js

// Actions
export const TEST_PASSED = 'math-game-web/progress/TEST_PASSED';
export const TEST_FAILED = 'math-game-web/progress/TEST_FAILED';
export const TEST_NEXT_LEVEL = 'math-game-web/progress/TEST_NEXT_LEVEL';
export const TEST_NEXT_STAGE = 'math-game-web/progress/TEST_NEXT_STAGE';
export const TEST_NEW_GAME = 'math-game-web/progress/TEST_NEW_GAME';

// Reducer
let initialState = {
  passed: 0,
  failed: 0,
  total: 0,
  gamePassed: 0,
  gameTotal: 0,
  color: true,
};

export default function progress(state = initialState, action) {
  switch (action.type) {
    case TEST_PASSED:
      return {
        ...state,
        passed: state.passed + action.passed,
        failed: state.failed + action.failed,
        total: state.total + action.total,
        gamePassed: state.gamePassed + action.gamePassed,
        gameTotal: state.gameTotal + action.gameTotal,
        color: action.color,
      };
    case TEST_FAILED:
      return {
        ...state,
        passed: state.passed + action.passed,
        failed: state.failed + action.failed,
        total: state.total + action.total,
        gamePassed: state.gamePassed + action.gamePassed,
        gameTotal: state.gameTotal + action.gameTotal,
        color: action.color,
      };
    case TEST_NEXT_LEVEL:
      return {
        ...state,
        passed: action.passed,
        failed: action.failed,
        total: action.total,
        gamePassed: state.gamePassed + action.gamePassed,
        gameTotal: state.gameTotal + action.gameTotal,
        color: action.color,
      };
    case TEST_NEXT_STAGE:
      return {
        ...state,
        passed: action.passed,
        failed: action.failed,
        total: action.total,
        gamePassed: state.gamePassed + action.gamePassed,
        gameTotal: state.gameTotal + action.gameTotal,
        color: action.color,
      };
    case TEST_NEW_GAME:
      return {
        ...state,
        passed: action.passed,
        failed: action.failed,
        total: action.total,
        gamePassed: action.gamePassed,
        gameTotal: action.gameTotal,
        color: action.color,
      };
    default:
      return state;
  }
}

// Action creators
export function testPassed(time) {
  return {
    type: TEST_PASSED,
    passed: 1,
    failed: 0,
    total: 1,
    gamePassed: 1,
    gameTotal: 1,
    color: true,
  };
}

export function testFailed(time) {
  return {
    type: TEST_FAILED,
    passed: 0,
    failed: 1,
    total: 1,
    gamePassed: 0,
    gameTotal: 1,
    color: false,
  };
}

export function testNextLevel() {
  return {
    type: TEST_NEXT_LEVEL,
    passed: 0,
    failed: 0,
    total: 0,
    gamePassed: 0,
    gameTotal: 0,
    color: true,
  };
}

export function testNextStage() {
  return {
    type: TEST_NEXT_STAGE,
    passed: 0,
    failed: 0,
    total: 0,
    gamePassed: 0,
    gameTotal: 0,
    color: true,
  };
}

export function testNewGame() {
  return {
    type: TEST_NEW_GAME,
    passed: 0,
    failed: 0,
    total: 0,
    gamePassed: 0,
    gameTotal: 0,
    color: true,
  };
}
