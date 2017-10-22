import { combineReducers } from 'redux';

import timeout from './timeout';
import progress from './progress';
import complexity from './complexity';
import maxnumber from './maxnumber';
import gameStatus from './gamestatus';

export const mapStateToProps = (state) => {
    return {
        timeout: state.timeout,
        progress: state.progress,
        complexity: state.complexity,
        maxnumber: state.maxnumber,
        gameStatus: state.gameStatus
    }
}

const reducers = { 
    timeout: timeout, 
    progress: progress,
    complexity: complexity,
    maxnumber: maxnumber,
    gameStatus: gameStatus
}

export default combineReducers (reducers);