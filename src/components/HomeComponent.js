import React, {Component} from "react";
import "./cssFiles/home.css";
import Header from "./HeaderComponent"
import Footer from "./FooterComponent"
import {Tabs,Tab,Card,Button,Accordion,ListGroup,ListGroupItem,Carousel} from "react-bootstrap"
import {Loading} from "./LoadingComponent"
import {
Col, Row, Label
} from 'reactstrap';
import {
Control, Form, Errors,
} from 'react-redux-form';
import { Link, Redirect } from 'react-router-dom';
import SeatPicker from 'react-seat-picker'
import axios from "axios";
import _ from 'lodash';
import { baseUrl } from '../redux/baseUrl';


const required = val => val && val.length;
const TeamSelected = val => val !== "null";
const TeamSelected2 = val => val !== "null";
const TeamSelected3 = val => val !== "null";
const monthSelected = val => val !== "null";

  
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            key:1,
            loading:false,
            match:[],
            rows:[],
            time:0,
            load:false,
            isSuccessful:false,
          };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleApproval = this.handleApproval.bind(this);
    this.handleDisapproval = this.handleDisapproval.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditMatch = this.handleEditMatch.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.handleSeatsRender = this.handleSeatsRender.bind(this);

    }
  
    //  GetTickets = (
    //   )  => {
    //     axios
    //       .get(`${baseUrl}/getTickets.php`)
    //       .then((response) => {
    //         if (_.isEqual(this.props.tickets.tickets, JSON.parse( response.request.responseText))) {
    //         }
    //         else if(this.state.key == 2){
    //           alert("Another User changed his Reservation")
    //           this.props.GetTickets()
    //         }
    //     }
    //       )
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   };
    // componentWillUnmount() {
    //   clearInterval(this.interval);

    // }
    // componentDidMount()
    // {
    //   // this.props.resetAddStadForm()
    //   this.interval = setInterval(() => this.GetTickets(), 1000);

    // }
    componentDidMount(){
      this.props.resetAddStadForm()
      this.props.resetAddMatchForm();

    }
    handleSubmit(values) {
      // alert(values.time)
      // const date=new Date(values.day,values.month,values.year)
      var obj={
        mainrefree:values.mainrefree,
        lineman1:values.lineman1,
        lineman2:values.lineman2,
        date:values.date,
        time:values.time,
        awayteam: values.awayteam,
        hometeam: values.hometeam,
        stad: values.stad,
      }
      this.props.postMatch(obj)
    }
    handleAddStaduim(values){
      if (values.stadname === "" &&
        values.app==="" &&
        values.seatsPerRow==="" &&
        values.noOfRows==="") {
       this.props.resetAddStadForm() 
      }
      else{
        var obj={
          stadname:values.stadname,
          approved:values.app,
          seatsPerRow:values.seatsPerRow,
          noOfRows:values.noOfRows,
          load:false
  
        }
        this.props.postStad(obj);

      }
      
    }
    handleSelect(key) {
        console.log('selected' + key);
        this.setState({ key: key });
    }
    handleApproval(username){
        var obj={
            username:username,
            approved:"yes"
        }
        this.props.PendRequest(obj)
    }
    handleDisapproval(username){
      var obj={
            username:username,
            approved:"no"
        }
        this.props.PendRequest(obj)
    }
    handleEditMatch(values,id,oldHome,oldAway){
       var obj={
        id:id,
        mainrefree:values.mainrefree,
        lineman1:values.lineman1,
        lineman2:values.lineman2,
        date:values.date,
        time:values.time,
        awayteam: values.awayteam,
        hometeam: values.hometeam,
        stad: values.stad,
      }
      if (values.hometeam === "" && values.awayteam === "") {
        this.props.EditMatch(obj)  
        alert("valid")
      }
      else if (values.hometeam === values.awayteam) {
        alert("invalid")
      }
      else if (values.hometeam === "" && values.awayteam !== "" && oldHome === values.awayTeam) {
        alert("invalid")
      }
      else if (values.hometeam !== "" && values.awayteam === "" && oldAway === values.hometeam) {
        alert("invalid")
      }
      else{
        this.props.EditMatch(obj)  
      }
      this.props.resetEditMatchForm();
    }
    handleEditProfile(values){
      // alert(this.props.userstate.userstate.username)
      // alert(values.email)
      const form={
        username:this.props.userstate.userstate.username,
        password:values.password,
        firstname:values.firstName,
        lastname:values.lastName,
        date: values.date,
        sex:values.sex,
        city:values.city,
        address:values.address,
      }
      this.props.EditProfile(form)
    }
    addSeatCallback = ({ row, number, id }, addCb) => {
      this.setState({
        loading: true
      }, async () => {
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log(`Added seat ${number}, row ${row}, id ${id}`)
        const obj={
          matchId_Ticket:this.state.match.Matchid,
          userName_Ticket:this.props.userstate.userstate.username,
          seatNumber:id,
          staduim_Name_Ticket:this.state.match.staduim_Name_Match,
          reserve:true
        }
        // alert(id)
        this.props.ReserveOrDeleteTicket(obj)
        const newTooltip = `tooltip for id-${id} added by callback`
        addCb(row, number, id, newTooltip)
        this.setState({ loading: false })
      })
    }
    removeSeatCallback = ({ row, number, id }, removeCb) => {
      this.setState({
        loading: true
      }, async () => {
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log(`Removed seat ${number}, row ${row}, id ${id}`)
        // const obj={
        //   matchId_Ticket:this.state.match.Matchid,
        //   userName_Ticket:this.props.userstate.userstate.username,
        //   seatNumber:id,
        //   staduim_Name_Ticket:this.state.match.staduim_Name_Match,
        //   reserve:false
        // }
        // this.props.ReserveOrDeleteTicket(obj)
        // A value of null will reset the tooltip to the original while '' will hide the tooltip
        const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
        removeCb(row, number, newTooltip)
        this.setState({ loading: false })
      })
    }
    handleSeatsRender(match){
      
      this.setState({
        isSuccessful: true
      },async()=>{
        this.props.AddSingleMatch(match)
      })
      // alert(this.state.key)
      // this.setState({
      //   match:match,
      //   load:false
      // },async()=>
      // {
      //   var noOfRows=0
      //   var noOfCols=0
      //   this.props.staduims.staduims.map((stad)=>{
      //     if(this.state.match.staduim_Name_Match === stad.staduimname)
      //     {
      //       // console.log("1")
      //       noOfRows=stad.noOfRows
      //       noOfCols=stad.seatsPerRow

      //     }
      //   })
      //   var allrows = new Array(parseInt( noOfRows));
        
      //   for (var i = 0; i < parseInt(noOfRows); i++) {
      //     // console.log(noOfCols)
      //     allrows[i] = new Array(parseInt( noOfCols));
      //     allrows[i].length=0
      //   } 
      //   var seatnumber=1;

      //   for (let index = 0; index < parseInt(noOfRows); index++) {
      //     for( let j =0; j < parseInt(noOfCols); j++){
      //       // console.log("2")
      //       allrows[index].push({id: seatnumber, number: seatnumber,isReserved:false})
      //       seatnumber++
      //     }
          
      //   }
        
      //   // console.log("Allrows",allrows);
      //   this.props.tickets.tickets.map((ticket)=>{
      //     if (this.state.match.Matchid === ticket.matchId_Ticket) {
      //       // alert("match occur")
      //       for (const outElem of allrows) {
      //         // console.log('======== outter ========');
      //         for (const inElem of outElem) {
      //           // alert(inElem)
      //           if (ticket.seatNumber == inElem.id ) {
      //             // alert(true)
      //             inElem.isReserved=true
      //           }
      //         }
      //       }
      //     }
      //     console.log("Allrows",allrows);
      //   })
      //   console.log(allrows)
      //   this.setState({
      //     rows:allrows
      //   })
      // }

      // )
    }
    handleCancelReservation(seatnumber,username,stad,matchid){
      const obj={
          matchId_Ticket:matchid,
          userName_Ticket:username,
          seatNumber:seatnumber,
          staduim_Name_Ticket:stad,
          reserve:false,
          delete:true
        }
        this.props.ReserveOrDeleteTicket(obj)
    }
    render(){
      let redirect = null;
      if (this.state.isSuccessful === true) {
        redirect = <Redirect to="/reserve"></Redirect>;
      }
            /////////////////////////////////////////////////////////////cancel reservation//////////////////////////////////////////////////////////////
      var ReservedTickets=null;
      if (this.props.tickets.isLoading===true) {
        ReservedTickets= <Loading/>
      }
      else if(this.props.userstate.userstate){
        ReservedTickets=this.props.tickets.tickets.map((ticket)=>{
              if(ticket.userName_Ticket === this.props.userstate.userstate.username){
                  return(
                      <Card className="cardPadding">
                          <Card.Header> <b>User Name:</b> {ticket.userName_Ticket}</Card.Header>
                          <Card.Body>
                            {this.props.matches.matches.map((match)=>{
                              if (match.Matchid === ticket.matchId_Ticket) {
                                return(
                                  <Card.Title>{match.homeTeam}<b style={{color:'red'}}> VS </b>{match.awayTeam} <b style={{color:'red'}}> At </b>{ticket.staduim_Name_Ticket} <b style={{color:'red'}} className='ml-auto'><i class="fa fa-calendar"></i>{match.matchDate} </b></Card.Title>
                                )
                              }
                            })}
                              <Button className="cardPadding" variant="danger" onClick={()=>this.handleCancelReservation(ticket.seatNumber,ticket.userName_Ticket,ticket.staduim_Name_Ticket,ticket.matchId_Ticket)}>Cancel Reservation</Button>
                          </Card.Body>
                      </Card>
                  )
                  }
              
          })
      }
      /////////////////////////////////////////////////////////////Edit User Profile//////////////////////////////////////////////////////////////
      var EditProfile = () => {
        return(
          <Form
          model="editprofile"
          onSubmit={values => this.handleEditProfile(values)}
          id=""
        >
          <Row className="form-group">
            <Col xs={12} md={{ size: 6, offset: 3 }}>
              <Control.text
                className="form-control"
                model=".firstName"
                placeholder="First Name"
                id="firstName" 
                name="firstName"
                validators={{
                }}
              />
              <Row className="ml-2">
                <Errors
                  className="text-danger error"
                  model=".firstName"
                  show="touched"
                  messages={{
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
                }}
              />
              <Row className="ml-2">
                <Errors
                  className="text-danger error"
                  model=".lastName"
                  show="touched"
                  messages={{
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
                }}
              />
              <Row className="ml-2">
                <Errors
                  className="text-danger error"
                  model=".password"
                  show="touched"
                  messages={{
                  }}
                />
              </Row>
            </Col>
          </Row>
          <Row className="form-group">
            <Col xs={12} md={{size:3, offset:3}}>
              <div>
                <label className="p-3">
                  <Control.radio
                    model=".sex"
                    value="male"
                    id="sex"
                    name="sex"
                    validators={{
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
                    }}
                  />{" "}
                  Female
                </label>
                <Errors
                  className="text-danger error"
                  model=".sex"
                  show="touched"
                  messages={{
                  }}
                />
              </div>
            </Col>
            <Col xs={4} md={3}>
              <Label> Birth date:</Label>
              <Control
                className="form-control"
                type="date"
                model=".date"
                name="date"
                validators={{
                }}
              />
              <Errors
                className="text-danger error"
                model=".date"
                show="touched"
                messages={{
                }}
              />
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
                }}
              />
              <Row className="ml-2">
                <Errors
                  className="text-danger error"
                  model=".ciyt"
                  show="touched"
                  messages={{
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
            <Col xs={12} md={{ size: 6, offset: 3 }}>
              <Button model="submit" className="signupbtn" type="submit">
                {/* <Button onClick={this.testbackend()} className="signupbtn"> */}
                Edit 
              </Button>
            </Col>
          </Row>
        </Form>
        )
    }
      /////////////////////////////////////////////////////// Edit match ///////////////////////////////////////////////
      var EditMatch = (id,oldHome,oldAway) => {
        return(
        <Form
          model="editmatch"
          onSubmit={values => this.handleEditMatch(values,id,oldHome,oldAway)}
          id=""
          className="editpadding"
        >
        {/* *********************************************Main Refree****************************************************************** */}
          <Row className="form-group">
            <Col xs={12} md={{ size: 2 }}>
              <Control.text
                className="form-control"
                model=".mainrefree"
                placeholder="Main Refree"
                id="mainrefree" 
                name="mainrefree"
                validators={{
                }}
              />
              <Row className="ml-2">
                <Errors
                  className="text-danger error"
                  model=".mainrefree"
                  show="touched"
                  messages={{
                  }}
                />
              </Row>
            </Col>
            <Col xs={12} md={{ size: 2 }}>
              <Control.text
                className="form-control"
                model=".lineman1"
                placeholder="Lineman 1"
                id="lineman1" 
                name="lineman1"
                validators={{
                }}
              />
              <Row className="ml-2">
                <Errors
                  className="text-danger error"
                  model=".lineman1"
                  show="touched"
                  messages={{
                  }}
                />
              </Row>
            </Col>
            <Col xs={12} md={{ size:2 }}>
              <Control.text
                className="form-control"
                model=".lineman2"
                placeholder="Lineman 2"
                id="lineman2" 
                name="lineman2"
                validators={{
                  
                }}
              />
              <Row className="ml-2">
                <Errors
                  className="text-danger error"
                  model=".lineman2"
                  show="touched"
                  messages={{
                  }}
                />
              </Row>
            </Col>
          </Row>
            
            <Row className="form-group">
            
             {/* *****************************************************Home Team********************************************************** */}
            <Col xs={4} md={2}>
              <Control.select
                className="form-control"
                model=".hometeam"
                name="hometeam"
                validators={{
                }}
              >
                <option value="">Home Team</option>
                {teams}
                </Control.select>
              <Errors
                className="text-danger error"
                model=".hometeam"
                show="touched"
                messages={{
                }}
              />
            </Col>
            {/* *****************************************************Away Team********************************************************** */}
            <Col xs={4} md={2}>
            <Control.select
                className="form-control"
                model=".awayteam"
                name="awayteam"
                validators={{
                }}
              >
                <option value="">Away Team</option>
                {teams}
            </Control.select>
              <Errors
                className="text-danger error"
                model=".awayteam"
                show="touched"
                messages={{
                }}
              />
            </Col>
          </Row>
          <Row className="form-group">
             {/* *****************************************************Staduim********************************************************** */}
             <Col xs={4} md={2}>
              <Control.select
                className="form-control"
                model=".stad"
                name="stad"
                validators={{
                }}
              >
                <option value="">Staduim</option>
                {staduims}
                </Control.select>
              <Errors
                className="text-danger error"
                model=".stad"
                show="touched"
                messages={{
                }}
              />
            </Col>
          </Row>
          <Row className="form-group">
             {/* *****************************************************date********************************************************** */}
            <Col xs={4} md={2}>
              <Control
                className="form-control"
                type="date"
                model=".date"
                name="date"
                validators={{
                }}
              />
              <Errors
                className="text-danger error"
                model=".time"
                show="touched"
                messages={{
                }}
              />
            </Col>
            {/* *****************************************************time********************************************************** */}
             <Col xs={4} md={2}>
              <Control
                className="form-control"
                type="time"
                model=".time"
                name="time"
                validators={{
                }}
              />
                
              <Errors
                className="text-danger error"
                model=".time"
                show="touched"
                messages={{
                }}
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Col xs={12} md={{ size: 6, offset: 3 }}>
              <Button model="submit" className="signupbtn" type="submit">
                {/* <Button onClick={this.testbackend()} className="signupbtn"> */}
                edit Match
              </Button>
            </Col>
          </Row>
        </Form>
        )
    }
      //////////////////////////////////////////////////////////////////////Add New Stad///////////////////////////////////////
      var AddStad = () => {
        return(
        <Form
          model="addstad"
          onSubmit={values => this.handleAddStaduim(values)}
          id=""
        >
            {/* *********************************************Staduim Name****************************************************************** */}
          <Row className="form-group">
            <Col xs={12} md={{ size: 2 }}>
              <Control.text
                className="form-control"
                model=".stadname"
                placeholder="Staduim Name"
                id="stadname" 
                name="stadname"
                validators={{
                  required
                }}
              />
              <Row className="ml-2">
                <Errors
                  className="text-danger error"
                  model=".stadname"
                  show="touched"
                  messages={{
                    required: "Enter The Staduim Name "
                  }}
                />
              </Row>
            </Col>
          </Row>
            {/* *********************************************rows****************************************************************** */}
            <Row className="form-group">
            <Col xs={12} md={{ size: 2 }}>
              <Control.text
                className="form-control"
                model=".noOfRows"
                type='number'
                min='1'
                placeholder="Number of Rows"
                id="noOfRows" 
                name="noOfRows"
                validators={{
                  required
                }}
              />
              <Row className="ml-2">
                <Errors
                  className="text-danger error"
                  model=".noOfRows"
                  show="touched"
                  messages={{
                    required: "Enter the number of rows "
                  }}
                />
              </Row>
            </Col>
          </Row>
            {/* *********************************************no of seats per row ****************************************************************** */}
            <Row className="form-group">
            <Col xs={12} md={{ size: 2 }}>
              <Control
                className="form-control"
                type="number"
                min='1'
                model=".seatsPerRow"
                placeholder="No of Seats per Row"
                id="seatsPerRow" 
                name="seatsPerRow"
                validators={{
                  required
                }}
              />
              <Row className="ml-2">
                <Errors
                  className="text-danger error"
                  model=".seatsPerRow"
                  show="touched"
                  messages={{
                    required: "Enter The Number of seats Per Row "
                  }}
                />
              </Row>
            </Col>
          </Row>
          <Row className="form-group">
           {/* **************************************************Approved or  not ************************************************************* */}
            <Col xs={4} md={2}>
              <Control.select
                className="form-control"
                model=".app"
                name="app"
                validators={{
                  required,
                  monthSelected,
                }}
              >
                <option value="null">Approved Or not</option>
                <option value={true} >Approved</option>
                <option value={false}>Not Approved</option>
              </Control.select>
              <Errors
                className="text-danger error"
                model=".app"
                show="touched"
                messages={{
                  required: "Required",
                  monthSelected: "Enter Approved or not"
                }}
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Col xs={12} md={{ size: 6, offset: 3 }}>
              <Button model="submit" className="signupbtn" type="submit">
                {/* <Button onClick={this.testbackend()} className="signupbtn"> */}
                Add staduim
              </Button>
            </Col>
          </Row>
        </Form>
        )
    }
      //////////////////////////////////////////////////////////// Add new Match///////////////////////////////////////////////////
      var staduims=null;
      if(this.props.staduims.isLoading === true)
        {
          <Loading/>  
        }
        else if(this.props.staduims.staduims){
          staduims=this.props.staduims.staduims.map((staduim)=>{
              return(
                  <option value={staduim.staduimname}>{staduim.staduimname}</option>
              )
              
          })
        }
      var teams=null;
      if(this.props.teams.isLoading === true)
        {
          <Loading/>  
        }
        else if(this.props.teams.teams){
          teams=this.props.teams.teams.map((team)=>{
              return(
                  <option value={team.teamname}>{team.teamname}</option>
              )
              
          })
        }
   
        const {loading} = this.state
        var AddMatch = () => {
            return(
            <Form
              model="addmatch"
              onSubmit={values => this.handleSubmit(values)}
              id=""
            >
                {/* *********************************************Main Refree****************************************************************** */}
              <Row className="form-group">
                <Col xs={12} md={{ size: 2 }}>
                  <Control.text
                    className="form-control"
                    model=".mainrefree"
                    placeholder="Main Refree"
                    id="mainrefree" 
                    name="mainrefree"
                    validators={{
                      required
                    }}
                  />
                  <Row className="ml-2">
                    <Errors
                      className="text-danger error"
                      model=".mainrefree"
                      show="touched"
                      messages={{
                        required: "Enter The Main REfree "
                      }}
                    />
                  </Row>
                </Col>
                <Col xs={12} md={{ size: 2 }}>
                  <Control.text
                    className="form-control"
                    model=".lineman1"
                    placeholder="Lineman 1"
                    id="lineman1" 
                    name="lineman1"
                    validators={{
                      required
                    }}
                  />
                  <Row className="ml-2">
                    <Errors
                      className="text-danger error"
                      model=".lineman1"
                      show="touched"
                      messages={{
                        required: "Enter The Line man 1 "
                      }}
                    />
                  </Row>
                </Col>
                <Col xs={12} md={{ size:2 }}>
                  <Control.text
                    className="form-control"
                    model=".lineman2"
                    placeholder="Lineman 2"
                    id="lineman2" 
                    name="lineman2"
                    validators={{
                      required
                    }}
                  />
                  <Row className="ml-2">
                    <Errors
                      className="text-danger error"
                      model=".lineman2"
                      show="touched"
                      messages={{
                        required: "Enter The Line man 2 "
                      }}
                    />
                  </Row>
                </Col>
              </Row>
                {/* *****************************************************Away Team********************************************************** */}
                <Row className="form-group">
                <Col xs={4} md={2}>
                <Control.select
                    className="form-control"
                    model=".awayteam"
                    name="awayteam"
                    validators={{
                      required,
                      TeamSelected
                    }}
                  >
                    <option value="null">Away Team</option>
                    {teams}
                </Control.select>
                  <Errors
                    className="text-danger error"
                    model=".awayteam"
                    show="touched"
                    messages={{
                      required: "Required",
                      TeamSelected: "Select the Away Team"
                    }}
                  />
                </Col>
                 {/* *****************************************************Home Team********************************************************** */}
                <Col xs={4} md={2}>
                  <Control.select
                    className="form-control"
                    model=".hometeam"
                    name="hometeam"
                    validators={{
                      required,
                      TeamSelected2
                    }}
                  >
                    <option value="null">Home Team</option>
                    {teams}
                    </Control.select>
                  <Errors
                    className="text-danger error"
                    model=".hometeam"
                    show="touched"
                    messages={{
                      required:"Required",
                      TeamSelected2: "Select the Home Team"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                 {/* *****************************************************Staduim********************************************************** */}
                 <Col xs={4} md={2}>
                  <Control.select
                    className="form-control"
                    model=".stad"
                    name="stad"
                    validators={{
                      required,
                      TeamSelected3
                    }}
                  >
                    <option value="null">Staduim</option>
                    {staduims}
                    </Control.select>
                  <Errors
                    className="text-danger error"
                    model=".stad"
                    show="touched"
                    messages={{
                      required:"Required",
                      TeamSelected3: "Select the staduim"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
              {/* *****************************************************date********************************************************** */}
                <Col xs={4} md={2}>
                  <Control
                    className="form-control"
                    type="date"
                    model=".date"
                    name="date"
                    validators={{
                      required
                    }}
                  />
                    
                  <Errors
                    className="text-danger error"
                    model=".date"
                    show="touched"
                    messages={{
                      required:"Required"
                    }}
                  />
                </Col>
                 {/* *****************************************************time********************************************************** */}
                 <Col xs={4} md={2}>
                  <Control
                    className="form-control"
                    type="time"
                    model=".time"
                    name="time"
                    validators={{
                      required
                    }}
                  />
                    
                  <Errors
                    className="text-danger error"
                    model=".time"
                    show="touched"
                    messages={{
                      required:"Required"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={12} md={{ size: 6, offset: 3 }}>
                  <Button model="submit" className="signupbtn" type="submit">
                    {/* <Button onClick={this.testbackend()} className="signupbtn"> */}
                    AddMatch
                  </Button>
                </Col>
              </Row>
            </Form>
            )
        }
       /////////////////////////////////////////////
        var ViewMatches=null;
        if (this.props.matches.isLoading===true) {
            ViewMatches= <Loading/>
        }        
        else if(this.props.matches.matches.length){
            ViewMatches=this.props.matches.matches.map((match)=>{
                return(
                    <div className="bodyHome">
                        <div class="DateandTitle">
                            <h3 class="DateandTitleHeader">
                                {match.matchDate}
                            </h3>
                            <img class="DateandTitleImage" src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png"/>              
                        </div>
                        <div type="button"  class="BelowDateandTitle" >
                            <div class="BelowDateandTitleFirst">
                                <span class="BelowDateandTitleFirstText">{match.homeTeam}</span>
                                <span>
                                    <img class="BelowDateandTitleFirstImage" src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png"/>  
                                </span>
                                <span class="BelowDateandTitleFirstTime" style={{color:'black'}}>
                                    {match.matchTime}
                                </span>
                                <span>
                                    <img class="BelowDateandTitleFirstImage" src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png"/>  
                                </span>
                                <span class="BelowDateandTitleFirstText">{match.awayTeam}</span>
                            </div>  
                            <div class="BelowDateandTitleSecond">
                                <img class="BelowDateandTitleSecondImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Soccer_field_-_empty.svg/1024px-Soccer_field_-_empty.svg.png"/>  
                                {match.staduim_Name_Match}, <strong>London</strong>
                            </div> 
                           
                        </div>
                        <Accordion>
                          {this.props.isSignedIn.isSignedIn===true ? (
                            <div>
                            {this.props.userstate.userstate.role === '1' ? (
                              <Card>
                            <Card.Header>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <h5>Edit This match</h5>
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                  {EditMatch(match.Matchid,match.homeTeam,match.awayTeam)}
                            </Accordion.Collapse>
                          </Card>
                            ):(
                              <div></div>
                            )}
                            </div>
                            ):(<div></div>)}
                          
                        
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                              <h5>More Details</h5>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="1">
                          <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://images.buyagift.co.uk/common/client/Images/Product/Extralarge/en-GB/11863033-1_extralarge.jpg" />
                            <Card.Body>
                              <Card.Title ><b>{match.homeTeam}</b> vs <b>{match.awayTeam}</b></Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                              <ListGroupItem><b>Main Refree: </b>{match.mainRefree}</ListGroupItem>
                              <ListGroupItem><b>Line man 1: </b>{match.lineman1}</ListGroupItem>
                              <ListGroupItem><b>Line man 2: </b>{match.lineman2}</ListGroupItem>
                            </ListGroup>
                            </Card>
                          </Accordion.Collapse>
                        </Card>
                        {this.props.isSignedIn.isSignedIn === true ? (
                          <div>
                            {this.props.userstate.userstate.role === "0" && this.props.userstate.userstate.admin !=="1"? (
                              <Card>
                              <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                  <button className="editButton" onClick={()=>this.handleSeatsRender(match)}>
                                    <h5>Reserve Tickets for this match</h5>
                                  </button>
                                </Accordion.Toggle>
                              </Card.Header>
                              <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                  
                                {/* <div>  
                                    <h1>Seat Picker</h1>
                                    <div style={{marginTop: '100px'}}>
                                      <button onClick={()=>this.setState({load:true})}>Load Seats</button>
                                      <button onClick={()=>this.setState({load:false})}> Unload Seats</button>
                                      {
                                        this.state.load === true ?
                                        (
                                          <div>
                                      <SeatPicker
                                        addSeatCallback={this.addSeatCallback}
                                        removeSeatCallback={this.removeSeatCallback}
                                        rows={this.state.rows}
                                        maxReservableSeats={3}
                                        alpha
                                        visible
                                        selectedByDefault
                                        loading={loading}
                                        // tooltipProps={{multiline: true}}
                                      />
                                      </div>
                                        ):
                                        (
                                          <div></div>
                                        )
                                      }
                                      
                                    </div>
                                </div> */}
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                            ):(
                              <div></div>
                            )} 
                          
                        </div>
                        ):(
                          <div></div>
                        )}
                        
                        
                    </Accordion>
                    </div>
                )   
            })
            
        }
        /////////////////////////////////////////////////////////////////////////////////////
        var AllUsers=null;
        if (this.props.users.isLoading==true) {
            AllUsers= <Loading/>
        }
        else{
            AllUsers=this.props.users.users.map((user)=>{
                if(user.admin == '0' && user.approved === "1"){
                    return(
                    
                        <Card className="cardPadding">
                            <Card.Header> <b>User Name:</b> {user.username}</Card.Header>
                            <Card.Body>
                                <Card.Title>{user.firstname} {user.lastname}</Card.Title>
                                <Card.Text>
                                    <b>Role</b> {user.role == '0' ? "Fan":"Manager"}
                                </Card.Text>
                                <Button className="cardPadding" variant="danger" onClick={()=>this.handleDisapproval(user.username)}>Remove User</Button>
                            </Card.Body>
                        </Card>
                    )
                    }
                
            })
        }
        // /////////////////////////////////////////////////////////////////////////////////////////////////////////
        var PendingUsers=null;
        if (this.props.users.isLoading==true) {
           PendingUsers= <Loading/>
        }
        else{
             PendingUsers=this.props.users.users.map((user)=>{
                if(user.approved == '0'){
                    return(
                        <Card className="cardPadding">
                            <Card.Header> <b>User Name:</b> {user.username}</Card.Header>
                            <Card.Body>
                                <Card.Title>{user.firstname} {user.lastname}</Card.Title>
                                <Card.Text>
                                    <b>Role</b> {user.role == '0' ? "Fan":"Manager"}
                                </Card.Text>
                                <Button className="cardPadding" variant="primary" onClick={()=>this.handleApproval(user.username)}>Approve</Button>
                                <Button className="cardPadding" variant="danger" onClick={()=>this.handleDisapproval(user.username)}>Disapprove</Button>
                            </Card.Body>
                        </Card>
                    )
                }
                
            })
        }

        return(

        <div>
            {redirect}
            <Header userstate={this.props.userstate}
                    isSignedIn={this.props.isSignedIn}
                    Logout={this.props.Logout}
                    />
            <div className="bodyHome backGround">
            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
                <Tab eventKey={1} title="Home">
                    <div className="bodyHome">
                    <Carousel>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src="https://resources.premierleague.com/photos/2020/10/14/58bbebee-0a13-48b7-9c81-de3b1014e063/KOTM_HomePageAssets-NewKOTM-Asset-16_9-1-.png?width=1600"
                          alt="First slide"
                        />
                        <Carousel.Caption>
                    
                        </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src="https://ist.cyou/wp-content/uploads/2020/05/header-football.jpg"
                          alt="Third slide"
                          // style={{height:"700px" ,width:"400px"}}

                        />
                        <Carousel.Caption>
                        </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src="https://footballqueensland.com.au/wp-content/uploads/2017/09/D1709001-FQ-EDM-Lead-Article-Img-1600x600.jpg"
                          alt="Third slide"

                        />

                        <Carousel.Caption>
                         
                        </Carousel.Caption>
                      </Carousel.Item>
                    </Carousel>
                    </div>
                </Tab>
                <Tab eventKey={2} title="Matches">
                    {ViewMatches}
                    
                </Tab>
                    <Tab eventKey={3} title="Approve Users" >
                        <div className="bodyHome">
                        {this.props.isSignedIn.isSignedIn === true ? (
                          <div>
                            {this.props.userstate.userstate.admin === "1" ? 
                            <div>  
                                {PendingUsers}
                                
                            </div>
                            :
                            <div>
                                <h1>you are not an admin</h1>        
                            </div>
                        }
                          </div>
                        ):(
                          <div>
                            <h6>You are not Signed In, Register now for free <Link to='/signup'>Sign up</Link>, Already have an account <Link to='/signin'>Sign In</Link></h6> 
                          </div>
                        )}  
                        
                        </div>
                    </Tab> 
                    <Tab eventKey={4} title="All Users" >
                    <div className="bodyHome">
                        {this.props.isSignedIn.isSignedIn === true ? (
                          <div>
                            {this.props.userstate.userstate.admin === "1" ? 
                            <div>  
                                {AllUsers}
                                
                            </div>
                            :
                            <div>
                                <h1>you are not an admin</h1>        
                            </div>
                        }
                          </div>
                        ):(
                          <div>
                            <h6>You are not Signed In, Register now for free <Link to='/signup'>Sign up</Link>, Already have an account <Link to='/signin'>Sign In</Link></h6> 
                          </div>
                        )}  
                        
                        </div>
                    </Tab>  
                    <Tab eventKey={5} title="Add Match" >
                        <div className="bodyHome">
                        {this.props.isSignedIn.isSignedIn === true ? (
                          <div>
                            {this.props.userstate.userstate.role === "1" ? 
                            <div>  
                                {AddMatch()}
                                
                            </div>
                            :
                            <div>
                                <h1>you are not a manger</h1>        
                            </div>
                        }
                          </div>
                        ):(
                          <div>
                            <h6>You are not Signed In, Register now for free <Link to='/signup'>Sign up</Link>, Already have an account <Link to='/signin'>Sign In</Link></h6> 
                          </div>
                        )}  
                        
                        </div>
                    </Tab>    
                    <Tab eventKey={6} title="Add Staduim" >
                    <div className="bodyHome">
                        {this.props.isSignedIn.isSignedIn === true ? (
                          <div>
                            {this.props.userstate.userstate.role === "1" ? 
                            <div>  
                                {AddStad()}
                                
                            </div>
                            :
                            <div>
                                <h1>you are not a Manager</h1>        
                            </div>
                        }
                          </div>
                        ):(
                          <div>
                            <h6>You are not Signed In, Register now for free <Link to='/signup'>Sign up</Link>, Already have an account <Link to='/signin'>Sign In</Link></h6> 
                          </div>
                        )}  
                        
                        </div>
                    </Tab>  
                    <Tab eventKey={7} title="Edit Profile" >
                        <div className="bodyHome">
                        <div className="bodyHome">
                        {this.props.isSignedIn.isSignedIn === true ? (
                          <div>
                            {this.props.isSignedIn.isSignedIn === true ? 
                            <div>  
                                {EditProfile()}
                                
                            </div>
                            :
                            <div>
                                    
                            </div>
                        }
                          </div>
                        ):(
                          <div>
                            <h6>You are not Signed In, Register now for free <Link to='/signup'>Sign up</Link>, Already have an account <Link to='/signin'>Sign In</Link></h6> 
                          </div>
                        )}  
                        
                        </div>
                        </div>
                    </Tab>  
                    <Tab eventKey={8} title="Reserved Tickets" >
                        <div className="bodyHome">
                        <div className="bodyHome">
                        {this.props.isSignedIn.isSignedIn === true ? (
                          <div>
                            {this.props.userstate.userstate.role === "0" ? 
                            <div>  
                                {ReservedTickets}
                                
                            </div>
                            :
                            <div>
                                <h1>you are not a Fan (customer)</h1>        
                            </div>
                        }
                          </div>
                        ):(
                          <div>
                            <h6>You are not Signed In, Register now for free <Link to='/signup'>Sign up</Link>, Already have an account <Link to='/signin'>Sign In</Link></h6> 
                          </div>
                        )}  
                        
                        </div>
                        </div>
                    </Tab>            
                </Tabs>
            </div>
            <Footer/>
        </div>   
    );

    }
}

export default Home;
