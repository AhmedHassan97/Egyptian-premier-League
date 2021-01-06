/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import Home from "./HomeComponent";
import{actions} from "react-redux-form";
import {postFeedback,SignInAction} from "../redux/ActionCreators"
import SignUp from "./SignUpComponent"
import Signin from "./SignInComponent"
const mapStateToProps = state => {
  return {
    userstate:state.userstate,
    isSignedIn:state.isSignedIn,
  }
}
const mapDispatchToProps = dispatch => ({
  resetSignUpForm: () => { dispatch(actions.reset('signup'))},
  resetFeedbackForm: () => { dispatch(actions.reset('signin'))},
  postFeedback: (object) =>
    dispatch(
      postFeedback(object)
    ),
    SignInAction: (object) =>
    dispatch(
      SignInAction(object)
    )
});

class Main extends Component{

  render(){
  return (
    <div className="App">
      <TransitionGroup>
        <Switch>
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/signup" component={()=>
                <SignUp resetFeedbackForm={this.props.resetSignUpForm}
                        postFeedback={this.props.postFeedback}
                />}>

            </Route>
            <Route exact path="/signin" component={()=>
                <Signin resetFeedbackForm={this.props.resetFeedbackForm}
                        SignInAction={this.props.SignInAction}
                />}>
            </Route>    
            <Redirect exact path="/home" component={Home}></Redirect>
        </Switch>
        </TransitionGroup>

    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));