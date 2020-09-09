import { isLoggedIn, getUserValue } from '../../services/AuthService';

const INITIAL_STATE = {
  user: {},
  username: getUserValue("username"),
  role: getUserValue("role"),
  email: getUserValue("email"),
  token: getUserValue("token"),
  loggedIn: isLoggedIn(),
  loading: false,
  error: ""
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        loading: false,
        error: ""
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        email: action.email,
        username: action.username,
        token: action.token,
        loading: false,
        loggedIn: isLoggedIn(),
        error: ""
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
        loading: false,
        error: ""
      }
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        user: action.user,
        loading: false,
        error: ""
      }
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        email: action.email,
        username: action.username,
        loading: false,
        error: ""
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        email: "",
        username: "",
        token: "",
        loggedIn: false,
        loading: false,
        error: ""
      }
    case 'LOADING':
      return {
        ...state,
        loading: true,
        error: ""
      }
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default user;
