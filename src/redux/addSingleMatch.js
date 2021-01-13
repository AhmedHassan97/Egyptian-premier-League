import * as ActionTypes from './ActionTypes';


export const Match = (state = { match:null ,isLoading:true }, action) => {
    switch (action.type) {
      case ActionTypes.ADD_MATCH:
        return { ...state, match: action.payload ,isLoading:false};
      case ActionTypes.MATCH_LOADING:
        return { ...state, match: [] ,isLoading:true};
      default:
        return state;
    }
  };