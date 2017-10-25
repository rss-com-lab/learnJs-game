import {MAX_NUMBER_INCREASED, MAX_NUMBER_DECREASED} from './constants';

export function maxnumberIncreased() {
  return {
    type: MAX_NUMBER_INCREASED,
    step: 1,
  };
}

export function maxnumberDecreased() {
  return {
    type: MAX_NUMBER_DECREASED,
    step: 1,
  };
}
