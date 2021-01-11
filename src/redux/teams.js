import * as ActionTypes from './ActionTypes';


export const Teams = (state = { teams:[],isLoading: true }, action) => {
    switch (action.type) {
      case ActionTypes.GET_TEAMS:
        return { ...state, teams: action.payload,isLoading: false };
      case ActionTypes.TEAMS_LOADING:
          return {...state, isLoading: true, errMess: null, teams: []}
      default:
        return state;
    }
  };