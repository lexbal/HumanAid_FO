const INITIAL_STATE = {
    rating: {},
    ratings: [],
    loading: false,
    error: ""
};

const rating = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'POST_RATING_SUCCESS':
        return {
          ...state,
          assoc: action.assoc,
          loading: false,
          error: ""
        }
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
