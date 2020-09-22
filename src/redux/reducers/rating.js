const INITIAL_STATE = {
    loading: false,
    error: ""
};

const rating = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'RATING_LOADING':
        return {
          ...state,
          loading: true,
          error: ""
        }
      case 'RATING_ERROR':
        return {
          ...state,
          loading: false,
          error: action.error
        }
      default:
        return state
    }
  }

  export default rating;
