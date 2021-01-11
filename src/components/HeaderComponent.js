import React, {Component} from "react";
import { Navbar , NavbarBrand,Jumbotron, Nav,NavItem,NavbarToggler,Collapse
    ,Form,FormGroup,Modal,ModalBody,ModalHeader,Button,Label,Input} from 'reactstrap'; 
import {NavLink} from "react-router-dom";
import "./cssFiles/header.css"
class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false,
            isNavOpen:false,

        };
        this.state.toggleNav=this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        // this.handleLogin=this.handleLogin.bind(this);


    }
    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
        
    }
    // handleLogin(event) {
    //     this.toggleModal();
    //     alert("Username: " + this.username.value + " Password: " + this.password.value
    //         + " Remember: " + this.remember.checked);
    //     event.preventDefault();

    // }
    render(){
        return(
          <div >
              {/* <NavbarHome /> */}
            <Navbar dark expand="md" className="headerClass">
                    <div className="container">
                        <NavbarToggler onClick={this.state.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img className="logo" src='https://www.kingfut.com/wp-content/uploads/2014/06/518px-Egyptian_Football_Association.svg_.png' width="40" height="40" alt='Egyption Premieure League' /></NavbarBrand>
                <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar className="headerClass">
                        <NavItem>
                            <NavLink className="nav-link" to="/home">
                                <span class="fa fa-home fa-lg"></span>Home
                            </NavLink>
                        </NavItem>
                        
                    </Nav>
                    <Nav className="headerClass" navbar>
                        {this.props.isSignedIn.isSignedIn == false ? (
                            <div>
                        <NavItem>
                            <NavLink className="nav-link" to="/signin">
                                <span class="fa fa-sign-in fa-lg"></span>Sign In
                            </NavLink>
                        </NavItem>
                            </div>
                        ):(
                            <div>
                               
                            </div>
                        )}

                    </Nav>
                    <Nav className="ml-auto" navbar>
                        {this.props.isSignedIn.isSignedIn == false ? (
                            <div>
                        <NavItem>
                            <NavLink className="nav-link" to="/signup">
                                <span class="fa fa-sign-in fa-lg"></span>Sign up
                            </NavLink>
                        </NavItem>
                            </div>
                        ):(
                            <div style={{padding:'2px'}}>
                                {this.props.isSignedIn.isSignedIn===true ? (
                                    <div style={{color: 'white',padding:'2px'}}><span class="fa fa-user fa-lg"></span><b>{this.props.userstate.userstate.username}</b>
                                    <button style={{margin:"5px",color:'white', backgroundColor:'black'}} onClick={()=>this.props.Logout()}><b>Logout</b></button>
                                    </div>
                                ):(
                                    <div></div>
                                )}
                            </div>
                        )}

                    </Nav>
                    
                </Collapse>
            </div>
            </Navbar>
            <Jumbotron>
            <div className="container">
               <div className="row row-header">
                   <div className="col-12 col-sm-6">
                       <h1>Egyptian Premier League</h1>
                       <p>The Egyptian Premier League is a professional association football league in Egypt and the top level of the Egyptian football league system</p>
                   </div>
               </div>
            </div>
            </Jumbotron>
        </div>      
              );
    }
}

export default Header;
