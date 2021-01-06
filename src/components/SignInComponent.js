/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import {
  Col, Button, Row, Label, NavLink, ModalBody,Modal
} from 'reactstrap';
import {
  Control, Form, Errors,
} from 'react-redux-form';
import { Link, Redirect } from 'react-router-dom';
import "./cssFiles/SignUp.css"

const required = val => val && val.length;
const minLength = len => val => val && val.length >= len;
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const validDay = val => /^([1-9]|0[1-9]|[12]\d|3[01])$/i.test(val);
const validYear = val =>
  /^(181[2-9]|18[2-9]\d|19\d\d|2\d{3}|30[0-3]\d|304[0-8])$/i.test(val); //1812 - 3048
const confEmail = val => val2 => val === val2;
const typeSelected = val => val === "male" || val === "female";
const roleSelected = val => val === "fan" || val === "manager";

const monthSelected = val => val !== "null";



class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
   
    };
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(values) {
    // this.props.resetFeedbackForm();
    if (
      values.password !== "" &&
      values.userName !== "" 
      )
     {
         var signindata={
            username:values.userName,
            password:values.password
         }
         this.props.SignInAction(signindata)
     }
    }
  render() {
    return (
      <div className="container signup">
        <div className="row somepadding">
          <Col xs={12} md={{ size: 6, offset: 5 }}>
            <Link to="/home">
              <img
                src="https://dneegypt.nyc3.digitaloceanspaces.com/2020/03/7-2-2-750x430.jpg"
                height="90"
                width="172"
                alt="EGP Premiere league"
              />
            </Link>
          </Col>
          <Col xs={12} md={{ size: 8, offset: 4 }}>
            <h3 style={{marginLeft:"10px"}}> Sign In your Account</h3>
          </Col>
          
        </div>
        <div className="row signup-field">
          <div>
            <Form
              model="signin"
              onSubmit={values => this.handleSubmit(values)}
              id="myform"
            >
              <Row className="form-group">
                <Col xs={12} md={{ size: 6, offset: 3 }}>
                  <Control.text
                    className="form-control"
                    model=".userName"
                    placeholder="User Name"
                    id="userName" 
                    name="userName"
                    validators={{
                      required
                    }}
                  />
                  <Row className="ml-2">
                    <Errors
                      className="text-danger error"
                      model=".userName"
                      show="touched"
                      messages={{
                        required: "Enter your User Name,"
                      }}
                    />
                  </Row>
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={12} md={{ size: 6, offset: 3 }}>
                  <Control.text
                    type="password"
                    className="form-control"
                    model=".password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    validators={{
                      required,
                      minLength: minLength(7)
                    }}
                  />
                  <Row className="ml-2">
                    <Errors
                      className="text-danger error"
                      model=".password"
                      show="touched"
                      messages={{
                        required: "Enter your password to continue, "
                      }}
                    />
                  </Row>
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={12} md={{ size: 6, offset: 3 }}>
                  <Button model="submit" className="signupbtn" type="submit">
                    {/* <Button onClick={this.testbackend()} className="signupbtn"> */}
                    SignUp
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={{size:6, offset:4}}>
                  <Label>Don't have an account ?, Register Now</Label><Link className="text-green" to="/signup"> Sign Up</Link>
                </Col>
              </Row>
            </Form>

          </div>
        </div>
      </div>
    );
  }
}
export default Signin;
