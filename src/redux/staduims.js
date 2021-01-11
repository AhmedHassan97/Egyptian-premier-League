import * as ActionTypes from './ActionTypes';


export const Staduims = (state = { staduims:null,isLoading: true }, action) => {
    switch (action.type) {
      case ActionTypes.GET_STADUIMS:
        return { ...state, staduims: action.payload,isLoading: false };
      case ActionTypes.STADUIMS_LOADING:
          return {...state, isLoading: true, errMess: null, staduims: []}
      default:
        return state;
    }
  };