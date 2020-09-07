import axios from 'axios';

export const getAssoc = id => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING'
    });
    return axios.get(`${process.env.REACT_APP_API_HOST}assoc/${id}`)
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
    return axios.get(`${process.env.REACT_APP_API_HOST}assoc`)
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
