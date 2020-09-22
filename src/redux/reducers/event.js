const INITIAL_STATE = {
  events: [],
  categories: [],
  event: {},
  loading: false,
  error: ""
};

const events = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_EVENTS_SUCCESS':
      return {
        ...state,
        events: action.events,
        loading: false,
        error: ""
      }
    case 'GET_EVENT_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.categories,
        loading: false,
        error: ""
      }
    case 'CREATE_EVENT_SUCCESS':
      return {
        ...state,
        categories: action.categories,
        loading: false,
        error: ""
      }
    case 'POST_RATING_SUCCESS':
      return {
        ...state,
        event: {
          ...state.event,
          ratings: [
            ...state.event.ratings,
            action.rating
          ]
        },
        loading: false,
        error: ""
      }
    case 'GET_EVENT_SUCCESS':
      return {
        ...state,
        event: action.event,
        loading: false,
        error: ""
      }
    case 'EVENT_LOADING':
      return {
        ...state,
        loading: true,
        error: ""
      }
    case 'EVENT_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default events;
