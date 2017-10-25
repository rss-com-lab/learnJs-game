import {TEST_PASSED, TEST_FAILED, TEST_RESET} from './constants';

export function testPassed() {
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

export function testFailed() {
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

export function testReset() {
  return {
    type: TEST_RESET,
    passed: 0,
    failed: 0,
    total: 0,
    gamePassed: 0,
    gameTotal: 0,
    color: true,
  };
}
