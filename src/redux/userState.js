import * as ActionTypes from './ActionTypes';

export const UserState = (state = { userstate:null }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_LOGIN:
      return { ...state, userstate: action.payload };
    // case ActionTypes.ADD_LOGOUT_BE:
    //   return {...state , userstate: null}  
    default:
      return state;
  }
};
export const SignedInState = (state = { isSignedIn:false }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_LOGIN:
      return { ...state, isSignedIn: true };
    // case ActionTypes.ADD_LOGOUT_BE:
    //   return {...state , isSignedIn: false}  
    default:
      return state;
  }
};