import axios from 'axios';

const api = {
  url: 'http://localhost:3000'
};

export const getAssoc = id => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING'
    });
    return axios.get(`${api.url}/assoc/${id}`)
            .then((json) => {
              dispatch({
                type: 'GET_ASSOC_SUCCESS',
                assoc: json.data
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

export const getAssociations = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING'
    });
    return axios.get(`${api.url}/assoc`)
            .then((json) => {
              dispatch({
                type: 'GET_ASSOCS_SUCCESS',
                assocs: json.data
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