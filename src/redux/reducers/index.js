import { combineReducers } from 'redux';
import user from './user';
import assocs from './assoc';

const reducers = combineReducers({
  user,
  assocs
});

export default reducers;
