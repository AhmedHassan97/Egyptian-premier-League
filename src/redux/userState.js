import * as ActionTypes from './ActionTypes';

export const UserState = (state = { userstate:null ,isLoading:true}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_LOGIN:
      return { ...state, userstate: action.payload ,isLoading:false};
    case ActionTypes.EDIT_PROFILE:
      return { ...state, userstate: action.payload ,isLoading:false};
    case ActionTypes.EDIT_PROFILE_LOADING:
      return { ...state, userstate: [],isLoading: true };
    case ActionTypes.ADD_LOGOUT:
      return {...state , userstate: null}  
    default:
      return state;
  }
};
export const SignedInState = (state = { isSignedIn:false }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_LOGIN:
      return { ...state, isSignedIn: true };
    case ActionTypes.ADD_LOGOUT:
      return {...state , isSignedIn: false}  
    default:
      return state;
  }
};