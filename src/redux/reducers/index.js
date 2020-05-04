import { combineReducers } from 'redux';
import user from './user';
import events from './event';

const reducers = combineReducers({
  user,
  events
});

export default reducers;
