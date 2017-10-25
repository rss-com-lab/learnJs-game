import { COMPLEXITY_SELECTED } from '../actions/constants'

export default function complexity(state = 2, action) {
  switch (action.type) {
    case COMPLEXITY_SELECTED: 
    	return action.level
    default: 
    	return state
  }
}