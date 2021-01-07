import * as ActionTypes from './ActionTypes';





export const Matches = (state = { matches:null }, action) => {
    switch (action.type) {
      case ActionTypes.ADD_MATCHES:
        return { ...state, matches: action.payload };
      default:
        return state;
    }
  };