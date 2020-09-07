import axios from 'axios';
import { setUserToken, getUserValue, removeUser } from '../../services/AuthService';

const config = {
  headers: { Authorization: `${getUserValue("token")}` }
};

export const signup = user => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING'
    });
    return axios.post(`${process.env.REACT_APP_API_HOST}signup`, {
              username: user.username,
              description: user.description,
              siret: user.siret,
              address: user.address,
              website: user.website,
              photo: user.photo,
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
    return axios.post(`${process.env.REACT_APP_API_HOST}login`, {
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

export const getUser = id => {
  id = 1;
  return (dispatch) => {
    dispatch({
      type: 'LOADING'
    });
    return axios.get(`${process.env.REACT_APP_API_HOST}user/${id}`)
            .then((json) => {
              dispatch({
                type: 'GET_USER_SUCCESS',
                user: json.data,
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

export const setUser = user => {
  return (dispatch) => {
    dispatch({
      type: 'SET_USER',
      user: user
    });
  };
};

export const updateUser = user => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING'
    });
    return axios.put(`${process.env.REACT_APP_API_HOST}user/${user.id}`, {
              username: user.username,
              description: user.description,
              siret: user.siret,
              address: user.address,
              website: user.website,
              name: user.name,
              email: user.email,
              roles: getUserValue("roles")
            }, config)
            .then((json) => {
              dispatch({
                type: 'UPDATE_USER_SUCCESS',
                username: user.username,
                email: user.email,
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