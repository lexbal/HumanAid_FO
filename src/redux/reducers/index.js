import { combineReducers } from 'redux';
import user from './user';
import assocs from './assoc';
import events from './event';
import rating from './rating';
import mail from './mail';

const reducers = combineReducers({
  user,
  events,
  assocs,
  rating,
  mail
});

export default reducers;
