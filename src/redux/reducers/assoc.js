const INITIAL_STATE = {
  assocs: [],
  loading: false,
  error: ""
};

const assocs = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_ASSOCS_SUCCESS':
      return {
        assocs: action.assocs,
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

export default assocs;
