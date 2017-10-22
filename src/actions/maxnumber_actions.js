import { MAXNUMBER_INCREASED, MAXNUMBER_DECREASED } from './constants'

export function maxnumberIncreased () {
  return {
    type: MAXNUMBER_INCREASED,
    step: 1 
  }
}

export function maxnumberDecreased () {
  return {
    type: MAXNUMBER_DECREASED,
    step: 1 
  }
}