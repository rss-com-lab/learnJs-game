import { combineReducers } from 'redux'
import timeout from './timeout'
import progress from './progress'
import complexity from './complexity'
import maxnumber from './maxnumber'
import gameStatus from './gamestatus'
import gameResults from './gameresults'
import gameTime from './timeused'


const reducers = { 
    timeout: timeout, 
    progress: progress,
    complexity: complexity,
    maxnumber: maxnumber,
    gameStatus: gameStatus,
    gameResults: gameResults,
    gameTime: gameTime
}

export default combineReducers (reducers);
