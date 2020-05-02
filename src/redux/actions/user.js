import axios from 'axios';
import { setUserToken, removeUser } from '../../services/AuthService';

const api = {
  url: 'http://localhost:3000'
};

export const signup = user => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING'
    });
    return axios.post(`${api.url}/signup`, {
              username: user.username,
              description: user.description,
              siret: user.siret,
              address: user.address,
              website: user.website,
              name: user.name,
              email: user.email,
              password: user.password,
              roles: user.roles
            })
            .then((json) => {
              dispatch({
                type: 'SIGNUP_SUCCESS'
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

export const login = ({email, password}) => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING'
    });
    return axios.post(`${api.url}/login`, {
              email: email,
              password: password
            })
            .then((json) => {
              setUserToken(json.data);
              dispatch({
                type: 'LOGIN_SUCCESS',
                email: json.data.email,
                username: json.data.username,
                token: json.data.token
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

export const logout = () => {
  removeUser();
  return {
    type:'LOGOUT_SUCCESS'
  }
};
