/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import Home from "./HomeComponent";
import{actions} from "react-redux-form";
import {postFeedback,SignInAction,GetUsers,PendRequest,GetMatches,GetStaduims,GetTeams,postMatch,postStad,EditMatch,EditProfile,GetTickets,ReserveOrDeleteTicket,Logout} from "../redux/ActionCreators"
import SignUp from "./SignUpComponent"
import Signin from "./SignInComponent"
import ReserveTickets  from "./ReserveTickets";
const mapStateToProps = state => {
  return {
    userstate:state.userstate,
    isSignedIn:state.isSignedIn,
    users:state.users,
    teams:state.teams,
    staduims:state.staduims,
    matches:state.matches,
    tickets:state.tickets
  }
}
const mapDispatchToProps = dispatch => ({
  resetSignUpForm: () => { dispatch(actions.reset('signup'))},
  resetSignInForm: () => { dispatch(actions.reset('signin'))},
  resetAddMatchForm: () => { dispatch(actions.reset('addmatch'))},
  resetAddStadForm: () => { dispatch(actions.reset('addstad'))},
  resetEditMatchForm: () => { dispatch(actions.reset('editmatch'))},
  resetEditProfileForm: () => { dispatch(actions.reset('editprofile'))},

  postFeedback:          (object) => dispatch(postFeedback(object)),
  SignInAction:          (object) =>dispatch(SignInAction(object)),
  GetUsers:               () =>dispatch(GetUsers()),
  PendRequest:           (obj) =>dispatch(PendRequest(obj)),
  GetStaduims:           (obj) =>dispatch(GetStaduims(obj)),
  GetMatches:            (obj) =>dispatch(GetMatches(obj)),
  GetTeams:              (obj) =>dispatch(GetTeams(obj)),
  postMatch:             (obj) =>dispatch(postMatch(obj)),
  postStad:              (obj) =>dispatch(postStad(obj)),
  EditMatch:             (obj) =>dispatch(EditMatch(obj)),
  EditProfile:           (obj) =>dispatch(EditProfile(obj)),
  GetTickets:            (obj) =>dispatch(GetTickets(obj)),
  ReserveOrDeleteTicket: (obj) =>dispatch(ReserveOrDeleteTicket(obj)),
  Logout:                (obj) =>dispatch(Logout(obj)),
  
  
});

class Main extends Component{


  componentDidMount(){
    this.props.GetUsers();
    this.props.GetStaduims();
    this.props.GetTeams();
    this.props.GetMatches();
    this.props.GetTickets();
    this.props.resetAddMatchForm();
    this.props.resetSignUpForm();
    this.props.resetSignInForm();
    this.props.resetAddStadForm();
    this.props.resetEditMatchForm();
    this.props.resetEditProfileForm();
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
                        matches={this.props.matches}
                        teams={this.props.teams}
                        staduims={this.props.staduims}
                        resetAddMatchForm={this.props.resetAddMatchForm}
                        postMatch={this.props.postMatch}
                        postStad={this.props.postStad}
                        EditMatch={this.props.EditMatch}
                        resetEditMatchForm={this.props.resetEditMatchForm}
                        resetEditProfileForm={this.props.resetEditProfileForm}
                        EditProfile={this.props.EditProfile}
                        ReserveOrDeleteTicket={this.props.ReserveOrDeleteTicket}
                        tickets={this.props.tickets}
                        Logout={this.props.Logout}
                        resetAddStadForm={this.props.resetAddStadForm}
                        GetTickets={this.props.GetTickets}

                />}>

            </Route>
            <Route exact path="/signup" component={()=>
                <SignUp resetFeedbackForm={this.props.resetSignUpForm}
                        postFeedback={this.props.postFeedback}
                />}>

            </Route>
            <Route exact path="/reserve" component={()=>
                <ReserveTickets isSignedIn={this.props.isSignedIn}
                                userstate={this.props.userstate}
                                matches={this.props.matches}
                                teams={this.props.teams}
                                staduims={this.props.staduims}    
                                            />}>

            </Route>
            <Route exact path="/signin" component={()=>
                <Signin resetSignInForm={this.props.resetSignInForm}
                        SignInAction={this.props.SignInAction}
                        isSignedIn={this.props.isSignedIn}
                        userstate={this.props.userstate}
                />}>
            </Route>    
            <Redirect to="/home" component={Home}></Redirect>
        </Switch>
        </TransitionGroup>
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));