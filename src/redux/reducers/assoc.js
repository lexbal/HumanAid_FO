const INITIAL_STATE = {
  assocs: [],
  assoc: {},
  loading: false,
  error: ""
};

const assocs = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_ASSOC_SUCCESS':
      return {
        ...state,
        assoc: action.assoc,
        loading: false,
        error: ""
      }
    case 'GET_ASSOCS_SUCCESS':
      return {
        ...state,
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
