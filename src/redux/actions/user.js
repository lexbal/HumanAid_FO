import axios from 'axios';
import CryptoJS from "crypto-js";
import { setUserToken, getUserValue, removeUser } from '../../services/AuthService';

export const signup = user => {
  var form_data = new FormData();

  for (var key in user) {
    if (key === "roles") {
      let role = null;

      switch (user[key]) {
        case "Entreprise": 
          role = ['ROLE_COMP'];
          break;
        case "Association": 
          role = ['ROLE_ASSOC'];
          break;
        default: 
          role = ['ROLE_USER'];
      }
      
      form_data.append(key, role);
    } else if (key === "address") {
      form_data.append("address", JSON.stringify(user[key]));
    } else {
      form_data.append((key === "photo") ? 'file' : key, user[key]);
    }
  }

  return (dispatch) => {
    dispatch({
      type: 'USER_LOADING'
    });
    return axios.post(`${process.env.REACT_APP_API_HOST}signup`, form_data)
            .then((json) => {
              dispatch({
                type: 'SIGNUP_SUCCESS'
              });
            })
            .catch((err) => {
              dispatch({
                type: 'USER_ERROR',
                error: err
              });
            });
  }
};

export const login = ({email, password}) => {
  return (dispatch) => {
    dispatch({
      type: 'USER_LOADING'
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
                type: 'USER_ERROR',
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
  return (dispatch) => {
    dispatch({
      type: 'USER_LOADING'
    });
    return axios.get(`${process.env.REACT_APP_API_HOST}user/${id}`, {
              headers: { Authorization: `${getUserValue("token")}` }
            })
            .then((json) => {
              dispatch({
                type: 'GET_USER_SUCCESS',
                user: json.data,
              });
            })
            .catch((err) => {
              if (err.response.status === 401) {
                removeUser();
              }

              dispatch({
                type: 'USER_ERROR',
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
  let string = CryptoJS.AES.encrypt((typeof user.id === "number") ? user.id.toString() : user.id, process.env.REACT_APP_SECRET).toString();
  let encryptedId = string.replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l');
  
  return (dispatch) => {
    dispatch({
      type: 'USER_LOADING'
    });
    return axios.put(`${process.env.REACT_APP_API_HOST}user/${encryptedId}`, user, {
              headers: { Authorization: `${getUserValue("token")}` }
            })
            .then((json) => {
              dispatch({
                type: 'UPDATE_USER_SUCCESS',
                username: user.username,
                email: user.email,
              });
            })
            .catch((err) => {
              if (err.response.status === 401) {
                removeUser();
              }

              dispatch({
                type: 'USER_ERROR',
                error: err
              });
            });
  }
};
