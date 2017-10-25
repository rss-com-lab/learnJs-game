import { TIMEOUT_INCREASED, TIMEOUT_DECREASED } from './constants'

export function timeoutIncreased () {
  return {
    type: TIMEOUT_INCREASED,
    step: 1 
  }
}

export function timeoutDecreased () {
  return {
    type: TIMEOUT_DECREASED,
    step: 1 
  }
}