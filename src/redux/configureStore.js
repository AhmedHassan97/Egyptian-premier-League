import {createStore, combineReducers, applyMiddleware } from 'redux';
import {createForms} from "react-redux-form"
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {InitialSignup,InitialSignIn,InitialAddMatch,InitialAddNewStad,InitialEditProfile} from "./forms"
import {SignedInState,UserState} from "./userState"
import {Matches} from "./matches"
import {Users} from "./users"
import { Teams } from "./teams";
import { Staduims } from "./staduims";
import { Tickets } from "./tickets";
function saveState(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);
    } catch (error) {
      //
    }
  }
function loadState() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) { }
}
const persistState = loadState();
  
export const ConfigureStore = () => {
    const store = createStore(
      combineReducers({
        userstate:UserState,
            isSignedIn:SignedInState,
            matches:Matches,
            users:Users,
            staduims:Staduims,
            teams:Teams,
            tickets:Tickets,
        // playlist_BE:PlayList_BE,
        ...createForms({
            signup:InitialSignup,
            signin:InitialSignIn,
            addmatch:InitialAddMatch,
            addstad:InitialAddNewStad,
            editmatch:InitialAddMatch,
            editprofile:InitialEditProfile
        }),
      }),
      persistState,
      applyMiddleware(thunk, logger)
    );
    store.subscribe(() => saveState(store.getState()));
    return store;
  };

