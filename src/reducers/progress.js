import { TEST_PASSED, TEST_FAILED, TEST_RESET } from '../actions/constants'

let initialState = { passed: 0, failed: 0, total: 0, gamePassed: 0, gameTotal: 0, color: true }

export default function progress(state = initialState, action) {
  switch (action.type) {
    case TEST_PASSED: 
    	return { 
            ...state, 
    		passed: state.passed + action.passed, 
    		failed: state.failed + action.failed,
            total: state.total + action.total,
            gamePassed: state.gamePassed + action.gamePassed, 
            gameTotal: state.gameTotal + action.gameTotal,  
    		color: action.color 
        } 
    case TEST_FAILED: 
    	return { 
            ...state, 
    		passed: state.passed + action.passed, 
    		failed: state.failed + action.failed, 
            total: state.total + action.total, 
            gamePassed: state.gamePassed + action.gamePassed, 
            gameTotal: state.gameTotal + action.gameTotal,   
    		color: action.color 
        }
    case TEST_RESET: 
        return { 
            ...state, 
            passed: action.passed, 
            failed: action.failed, 
            total: action.total, 
            gamePassed: state.gamePassed + action.gamePassed, 
            gameTotal: state.gameTotal + action.gameTotal,   
            color: action.color 
        }
    default: 
    	return state
  }
}