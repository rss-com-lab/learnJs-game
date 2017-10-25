import {COMPLEXITY_SELECTED} from './constants';

export function complexitySelected(text) {
  return {
    type: COMPLEXITY_SELECTED,
    level: text,
  };
}
