import {MAX_NUMBER_INCREASED, MAX_NUMBER_DECREASED} from '../actions/constants';

export default function maxnumber (state = 10, action) {
  switch (action.type) {
    case MAX_NUMBER_INCREASED: 
    	return state + action.step; 
    case MAX_NUMBER_DECREASED: 
    	return  state - action.step ;
    default: return state;
  }
}