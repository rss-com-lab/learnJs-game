import {MAXNUMBER_INCREASED, MAXNUMBER_DECREASED} from '../actions/constants';

export default function maxnumber (state = 10, action) {
  switch (action.type) {
    case MAXNUMBER_INCREASED: 
    	return state + action.step; 
    case MAXNUMBER_DECREASED: 
    	return  state - action.step ;
    default: return state;
  }
}