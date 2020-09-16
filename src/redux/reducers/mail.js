const INITIAL_STATE = {
    loading: false,
    error: ""
};

const mail = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'MAIL_SUCCESS':
            console.log("here");
            return {
                ...state,
                loading: false,
                error: ""
            }
        case 'MAIL_LOADING':
            console.log("here1");
            return {
                ...state,
                loading: true,
                error: ""
            }
        case 'MAIL_ERROR':
            console.log("here2");
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
