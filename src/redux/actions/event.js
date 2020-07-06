import axios from 'axios';

const api = {
  url: 'http://localhost:3000'
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
              console.log(json);
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