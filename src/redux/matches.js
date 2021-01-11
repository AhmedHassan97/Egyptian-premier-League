import * as ActionTypes from './ActionTypes';


export const Matches = (state = { matches:[] ,isLoading:true }, action) => {
    switch (action.type) {
      case ActionTypes.ADD_MATCHES:
        return { ...state, matches: action.payload ,isLoading:false};
      case ActionTypes.MATCHES_LOADING:
        return { ...state, matches: [] ,isLoading:true};
      default:
        return state;
    }
  };