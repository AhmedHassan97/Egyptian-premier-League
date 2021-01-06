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



class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
   
    };
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount(){
    // this.props.resetFeedbackForm()
  }
  handleSubmit(values) {
    // this.props.resetFeedbackForm();
    if (
      values.email !== "" &&
      values.password !== "" &&
      values.firstName !== "" &&
      values.lastName !== "" &&
      values.userName !== "" &&
      values.day !== "" &&
      values.month !== "" &&
      values.year !== "" &&
      values.sex !== ""&&
      values.role !== ""&&
      values.city !== "" 
      )
     {
      const date=new Date(parseInt( values.year), parseInt(values.month), parseInt( values.day))

       const form={
         email:values.email,
         password:values.password,
         firstname:values.firstName,
         lastname:values.lastName,
         username:values.userName,
         date:date,
         sex:values.sex,
         role: (values.role == "fan" ? 1:0),
         city:values.city,
         address:values.address,
         approved:false
       }
       this.props.postFeedback(form)
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
            <h3 style={{marginLeft:"10px"}}> Register your Account</h3>
          </Col>
          
        </div>
        <div className="row signup-field">
          <div>
            <Form
              model="signup"
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
                    className="form-control"
                    model=".firstName"
                    placeholder="First Name"
                    id="firstName" 
                    name="firstName"
                    validators={{
                      required
                    }}
                  />
                  <Row className="ml-2">
                    <Errors
                      className="text-danger error"
                      model=".firstName"
                      show="touched"
                      messages={{
                        required: "Enter your First Name,"
                      }}
                    />
                  </Row>
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={12} md={{ size: 6, offset: 3 }}>
                  <Control.text
                    className="form-control"
                    model=".lastName"
                    placeholder="Last Name"
                    id="lastName" 
                    name="lastName"
                    validators={{
                      required
                    }}
                  />
                  <Row className="ml-2">
                    <Errors
                      className="text-danger error"
                      model=".lastName"
                      show="touched"
                      messages={{
                        required: "Enter your Last Name,"
                      }}
                    />
                  </Row>
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={12} md={{ size: 6, offset: 3 }}>
                  <Control.text
                    className="form-control"
                    model=".email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    validators={{
                      required,
                      validEmail
                    }}
                  />
                  <Row className="ml-2">
                    <Errors
                      className="text-danger error"
                      model=".email"
                      show="touched"
                      messages={{
                        required: "Enter your Email address ,",
                        validEmail: " Invalid Email Address"
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
                        required: "Enter your password to continue, ",
                        minLength: " Your password is too short"
                      }}
                    />
                  </Row>
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={4} md={{ size: 2, offset: 3 }}>
                  <Control.text
                    className="form-control"
                    model=".day"
                    placeholder="Day"
                    id="day"
                    name="day"
                    validators={{
                      required,
                      validDay
                    }}
                  />
                  <Errors
                    className="text-danger error"
                    model=".day"
                    show="touched"
                    messages={{
                      validDay: "Enter a valid day of the month"
                    }}
                  />
                </Col>
                <Col xs={4} md={2}>
                  <Control.select
                    className="form-control"
                    model=".month"
                    name="month"
                    validators={{
                      monthSelected,
                      required
                    }}
                  >
                    <option value="null">Month</option>
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                  </Control.select>
                  <Errors
                    className="text-danger error"
                    model=".month"
                    show="touched"
                    messages={{
                      required: "Required",
                      monthSelected: "Enter the month"
                    }}
                  />
                </Col>
                <Col xs={4} md={2}>
                  <Control.text
                    className="form-control"
                    model=".year"
                    placeholder="Year"
                    id="year"
                    name="year"
                    validators={{
                      required,
                      validYear
                    }}
                  />
                  <Errors
                    className="text-danger error"
                    model=".year"
                    show="touched"
                    messages={{
                      required: "Enter a year to continue",
                      validYear: " Enter a valid year"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={12} md={{size:5, offset:3}}>
                  <div>
                    <label className="p-3">
                      <Control.radio
                        model=".sex"
                        value="male"
                        id="sex"
                        name="sex"
                        validators={{
                          typeSelected
                        }}
                      />{" "}
                      Male
                    </label>
                    <label className="p-3">
                      <Control.radio
                        model=".sex"
                        value="female"
                        id="sex"
                        name="sex"
                        validators={{
                          typeSelected
                        }}
                      />{" "}
                      Female
                    </label>
                    <Errors
                      className="text-danger error"
                      model=".sex"
                      show="touched"
                      messages={{
                        typeSelected: "Enter your gender"
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={12} md={{ size: 6, offset: 3 }}>
                  <Control.text
                    type="city "
                    className="form-control"
                    model=".city"
                    placeholder="City"
                    id="city"
                    name="city"
                    validators={{
                      required
                    }}
                  />
                  <Row className="ml-2">
                    <Errors
                      className="text-danger error"
                      model=".ciyt"
                      show="touched"
                      messages={{
                        required: "Enter your City to continue "
                      }}
                    />
                  </Row>
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={12} md={{ size: 6, offset: 3 }}>
                  <Control.text
                    type="text"
                    className="form-control"
                    model=".address"
                    placeholder="Address"
                    id="address"
                    name="address"
                    ></Control.text>
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={12} md={{size:5, offset:3}}>
                  <div>
                    <label className="p-3">
                      <Control.radio
                        model=".role"
                        value="manager"
                        id="role"
                        name="role"
                        validators={{
                          roleSelected
                        }}
                      />{" "}
                      Manager
                    </label>
                    <label className="p-3">
                      <Control.radio
                        model=".role"
                        value="fan"
                        id="role"
                        name="role"
                        validators={{
                          roleSelected
                        }}
                      />{" "}
                      Fan
                    </label>
                    <Errors
                      className="text-danger error"
                      model=".role"
                      show="touched"
                      messages={{
                        roleSelected: "Select your role"
                      }}
                    />
                  </div>
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
                <Col xs={12} md={{size:6, offset:5}}>
                  <Label>Already have an account ?</Label><Link className="text-green" to="/signin"> LogIn</Link>
                </Col>
              </Row>
            </Form>

          </div>
        </div>
      </div>
    );
  }
}
export default SignUp;
