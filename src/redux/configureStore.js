import {createStore, combineReducers, applyMiddleware } from 'redux';
import {createForms} from "react-redux-form"
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {InitialSignup,InitialSignIn} from "./forms"
import {SignedInState,UserState} from "./userState"
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            userstate:UserState,
            isSignedIn:SignedInState,
            ...createForms({
                signup:InitialSignup,
                signin:InitialSignIn

            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}