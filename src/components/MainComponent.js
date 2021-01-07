/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import Home from "./HomeComponent";
import{actions} from "react-redux-form";
import {postFeedback,SignInAction,GetUsers,PendRequest} from "../redux/ActionCreators"
import SignUp from "./SignUpComponent"
import Signin from "./SignInComponent"
const mapStateToProps = state => {
  return {
    userstate:state.userstate,
    isSignedIn:state.isSignedIn,
    users:state.users
  }
}
const mapDispatchToProps = dispatch => ({
  resetSignUpForm: () => { dispatch(actions.reset('signup'))},
  resetSignInForm: () => { dispatch(actions.reset('signin'))},
  postFeedback: (object) =>
    dispatch(
      postFeedback(object)
    ),
    SignInAction: (object) =>
    dispatch(
      SignInAction(object)
    ),
    GetUsers: () =>
    dispatch(
      GetUsers()
    ),
    PendRequest: (obj) =>
    dispatch(
      PendRequest(obj)
    )
});

class Main extends Component{


  componentDidMount(){
    this.props.GetUsers();
  }
  render(){
  return (
    <div className="App">
      <TransitionGroup>
        <Switch>
            <Route exact path="/home" component={()=>
                <Home   resetFeedbackForm={this.props.resetSignUpForm}
                        postFeedback={this.props.postFeedback}
                        isSignedIn={this.props.isSignedIn}
                        userstate={this.props.userstate}
                        GetUsers={this.props.GetUsers}
                        users={this.props.users}
                        PendRequest={this.props.PendRequest}
                />}>

            </Route>
            <Route exact path="/signup" component={()=>
                <SignUp resetFeedbackForm={this.props.resetSignUpForm}
                        postFeedback={this.props.postFeedback}
                />}>

            </Route>
            <Route exact path="/signin" component={()=>
                <Signin resetSignInForm={this.props.resetSignInForm}
                        SignInAction={this.props.SignInAction}
                        isSignedIn={this.props.isSignedIn}
                        userstate={this.props.userstate}
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