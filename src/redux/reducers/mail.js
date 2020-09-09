const INITIAL_STATE = {
    loading: false,
    error: ""
};
  
const mail = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'MAIL_SUCCESS':
            return {
                ...state,
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
  
  export default mail;
  