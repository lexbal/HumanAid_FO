import { combineReducers } from 'redux';
import user from './user';
import assocs from './assoc';
import companies from './company';
import events from './event';
import rating from './rating';
import mail from './mail';

const reducers = combineReducers({
  user,
  events,
  assocs,
  companies,
  rating,
  mail
});

export default reducers;
