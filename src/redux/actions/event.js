import axios from 'axios';
import { removeUser } from '../../services/AuthService';

const api = {
  url: 'http://localhost:3000'
};

export const createEvent = event => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING'
    });
    return axios.post(`${api.url}/event`, {
              title:        event.title,
              description:  event.description,
              start_date:   event.start,
              end_date:     event.end
            })
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
                type: 'ERROR',
                error: err
              });
            });
  }
};

export const getEvents = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING'
    });
    return axios.get(`${api.url}/event`)
            .then((json) => {
              dispatch({
                type: 'GET_EVENTS_SUCCESS',
                events: json.data
              });
          })
          .catch((err) => {
            dispatch({
              type: 'ERROR',
              error: err
            });
          });
  }
};

export const getEvent = id => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING'
    });
    return axios.get(`${api.url}/event/${id}`)
            .then((json) => {
              dispatch({
                type: 'GET_EVENT_SUCCESS',
                event: json.data
              });
            })
            .catch((err) => {
              dispatch({
                type: 'ERROR',
                error: err
              });
            });
  }
};

export const getCategories = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING'
    });
    return axios.get(`${api.url}/event/categories`)
            .then((json) => {
              dispatch({
                type: 'GET_EVENT_CATEGORIES_SUCCESS',
                categories: json.data
              });
            })
            .catch((err) => {
              dispatch({
                type: 'ERROR',
                error: err
              });
            });
  }
};