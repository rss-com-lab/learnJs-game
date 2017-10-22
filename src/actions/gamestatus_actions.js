import { START_GAME, NEXT_LEVEL, GAME_OVER, PLAY_GAME } from './constants'

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