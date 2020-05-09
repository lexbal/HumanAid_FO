import { combineReducers } from 'redux';
import user from './user';
import assocs from './assoc';
import events from './event';

const reducers = combineReducers({
  user,
  events,
  assocs
});

export default reducers;
