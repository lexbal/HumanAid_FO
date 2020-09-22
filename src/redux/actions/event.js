import axios from 'axios';
import { removeUser, getUserValue } from '../../services/AuthService';

const config = {
  headers: { Authorization: `${getUserValue("token")}` }
};

export const createEvent = event => {
  return (dispatch) => {
    dispatch({
      type: 'EVENT_LOADING'
    });
    return axios.post(`${process.env.REACT_APP_API_HOST}event`, {
              user: getUserValue("username") ? getUserValue("username") : getUserValue("email"),
              title:        event.title,
              description:  event.description,
              categories:   event.categories.map(({value}, i) => {
                return value;
              }),
              start_date:   event.start,
              end_date:     event.end
            }, config)
            .then(() => {
              dispatch({
                type: 'CREATE_EVENT_SUCCESS'
              });
            })
            .catch((err) => {
              if (err.response.status === 401) {
                removeUser();
              }

              dispatch({
                type: 'EVENT_ERROR',
                error: err
              });
            });
  }
};

export const getEvents = () => {
  return (dispatch) => {
    dispatch({
      type: 'EVENT_LOADING'
    });
    return axios.get(`${process.env.REACT_APP_API_HOST}event`)
            .then((json) => {
              dispatch({
                type: 'GET_EVENTS_SUCCESS',
                events: json.data
              });
          })
          .catch((err) => {
            dispatch({
              type: 'EVENT_ERROR',
              error: err
            });
          });
  }
};

export const getEvent = id => {
  return (dispatch) => {
    dispatch({
      type: 'EVENT_LOADING'
    });
    return axios.get(`${process.env.REACT_APP_API_HOST}event/${id}`)
            .then((json) => {
              dispatch({
                type: 'GET_EVENT_SUCCESS',
                event: json.data
              });
            })
            .catch((err) => {
              dispatch({
                type: 'EVENT_ERROR',
                error: err
              });
            });
  }
};

export const getCategories = () => {
  return (dispatch) => {
    dispatch({
      type: 'EVENT_LOADING'
    });
    return axios.get(`${process.env.REACT_APP_API_HOST}event/categories`)
            .then((json) => {
              dispatch({
                type: 'GET_EVENT_CATEGORIES_SUCCESS',
                categories: json.data
              });
            })
            .catch((err) => {
              dispatch({
                type: 'EVENT_ERROR',
                error: err
              });
            });
  }
};
