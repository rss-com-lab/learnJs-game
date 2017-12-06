import {combineReducers} from 'redux';
import timeout from './timeout';
import progress from './progress';
import complexity from './complexity';
import gameStatus from './gamestatus';
import currentUser from './users';

const reducers = {
  timeout: timeout,
  progress: progress,
  complexity: complexity,
  gameStatus: gameStatus,
  currentUser: currentUser,
};

export default combineReducers(reducers);
