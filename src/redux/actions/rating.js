import axios from 'axios';
import { getUserValue, removeUser } from '../../services/AuthService';

const config = {
  headers: { Authorization: `${getUserValue("token")}` }
};

export const createRating = (rating, event_id) => {
    return (dispatch) => {
      dispatch({
        type: 'RATING_LOADING'
      });
      return axios.post(`${process.env.REACT_APP_API_HOST}rating`, {
                rating: rating.rating,
                comment: rating.comment,
                event_id: event_id,
                user: getUserValue("username") ? getUserValue("username") : getUserValue("email")
              }, config)
              .then(() => {
                dispatch({
                  type: 'POST_RATING_SUCCESS'
                });
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  removeUser();
                }

                dispatch({
                  type: 'RATING_ERROR',
                  error: err
                });
              });
    }
  };
