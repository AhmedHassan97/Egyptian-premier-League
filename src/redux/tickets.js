import * as ActionTypes from './ActionTypes';


export const Tickets = (state = { tickets:[],isLoading: true }, action) => {
    switch (action.type) {
      case ActionTypes.GET_TICKETS:
        return { ...state, tickets: action.payload,isLoading: false };
      case ActionTypes.TICKETS_LOADING:
          return {...state, isLoading: true, errMess: null, tickets: []}
      default:
        return state;
    }
  };