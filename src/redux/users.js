import * as ActionTypes from './ActionTypes';


export const Users = (state = { users:null,isLoading: true }, action) => {
    switch (action.type) {
      case ActionTypes.ADD_USERS:
        return { ...state, users: action.payload,isLoading: false };
      case ActionTypes.USERS_LOADING:
          return {...state, isLoading: true, errMess: null, users: []}
      default:
        return state;
    }
  };