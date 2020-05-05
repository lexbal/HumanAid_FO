import axios from 'axios';

const api = {
  url: 'http://localhost:3000'
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
