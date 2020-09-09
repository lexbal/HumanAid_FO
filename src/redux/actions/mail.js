import axios from 'axios';

export const mail = contact => {
    return (dispatch) => {
      dispatch({
        type: 'LOADING'
      });
      return axios.post(`${process.env.REACT_APP_API_HOST}send_mail`, {
                name: contact.name,
                email: contact.email,
                message: contact.content
              })
              .then(() => {
                dispatch({
                  type: 'MAIL_SUCCESS'
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