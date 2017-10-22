import { TIMEOUT_INCREASED, TIMEOUT_DECREASED } from '../actions/constants';

export default function timeout(state = 20, action) {
  switch (action.type) {
    case TIMEOUT_INCREASED: 
    	return state + action.step 
    case TIMEOUT_DECREASED: 
    	return  state - action.step 
    default: return state
  }
}