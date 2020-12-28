import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import Home from "./HomeComponent";

const mapStateToProps = state => {
  return {
  
  }
}
const mapDispatchToProps = dispatch => ({

});

class Main extends Component{

  render(){
  return (
    <div className="App">
      
     
      <TransitionGroup>
        <Switch>
            <Route to="/home" component={Home}></Route>
            <Redirect to="/home" component={Home}></Redirect>
        </Switch>
        </TransitionGroup>
      

    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));