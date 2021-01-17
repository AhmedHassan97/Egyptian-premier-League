import React, {Component} from "react";
import SeatPicker from 'react-seat-picker'
import _ from 'lodash';
import { baseUrl } from '../redux/baseUrl';
import axios from "axios";
import {Card,Accordion} from "react-bootstrap"
import { Jumbotron,Row,Col} from 'reactstrap'; 
import "./cssFiles/reserveTickets.css"
import Footer from "./FooterComponent"
import {
   Button
} from 'reactstrap';
import {
  Control, Form, Errors
} from 'react-redux-form';
import "./cssFiles/SignUp.css"
import { Navbar , NavbarBrand, Nav,NavItem,NavbarToggler,Collapse} from 'reactstrap'; 
import {NavLink} from "react-router-dom";
const required = val => val && val.length;

class ReserveTickets extends Component{
    constructor(props){
        super(props);
        this.state={
            rows:[],
            loading:false,
            match:[],
            load:false,
            totalCost:0,
            seats:[],
            tickets:this.props.tickets.tickets
        };
    // this.handleSelect = this.handleSelect.bind(this);
    this.handleSeatsRender = this.handleSeatsRender.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);    
    }
    handleSubmit(){
       const obj={
            matchId_Ticket:this.props.match.match.Matchid,
            userName_Ticket:this.props.userstate.userstate.username,
            seats:this.state.seats,
            staduim_Name_Ticket:this.props.match.match.staduim_Name_Match,
            reserve:true
          }
          this.props.ReserveOrDeleteTicket(obj)
    }
    addCost(){
      this.setState({
        totalCost:this.state.totalCost + 15
      })
    }
    minusCost(){
      if(this.state.totalCost > 15)
      {
        this.setState({
          totalCost:this.state.totalCost - 15
        })
      }
      
    }
    addSeatCallback = ({ row, number, id }, addCb) => {
        this.setState({
          loading: true
        }, async () => {
          await new Promise(resolve => setTimeout(resolve, 1500))
          console.log(`Added seat ${number}, row ${row}, id ${id}`)
         
          this.addCost()
          this.setState({
            seats: this.state.seats.concat(id)
          })
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
          this.setState({seats: this.state.seats.filter(function(seat) { 
            return seat !==id 
        })});
        this.minusCost()
          const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
          removeCb(row, number, newTooltip)
          this.setState({ loading: false })
        })
      }
      GetTickets = async(
        )  => {
          axios
            .get(`${baseUrl}/getTickets.php`)
            .then((response) => {
              if (_.isEqual(this.state.tickets, JSON.parse( response.request.responseText))) {
              }
              else{
                this.setState({
                  tickets:JSON.parse( response.request.responseText),
                  load:false
                }, ()=>{
                  console.log("1")
                var tickets=JSON.parse( response.request.responseText)
                var noOfRows=0
                var noOfCols=0
                this.props.staduims.staduims.map((stad)=>{
                  if(this.state.match.staduim_Name_Match === stad.staduimname)
                  {
                    // console.log("1")
                    noOfRows=stad.noOfRows
                    noOfCols=stad.seatsPerRow
        
                  }
                })
              var allrows = new Array(parseInt( noOfRows));
              console.log("2")
              for (var i = 0; i < parseInt(noOfRows); i++) {
                // console.log(noOfCols)
                allrows[i] = new Array(parseInt( noOfCols));
                allrows[i].length=0
              } 
            
              var seatnumber=1;
      
              for (let index = 0; index < parseInt(noOfRows); index++) {
                for( let j =0; j < parseInt(noOfCols); j++){
                  // console.log("2")
                  allrows[index].push({id: seatnumber, number: seatnumber,isReserved:false})
                  seatnumber++
                }
                
              }
              console.log("3")
              // console.log("Allrows",allrows);
              tickets.map((ticket)=>{
                if (this.state.match.Matchid === ticket.matchId_Ticket) {
                  // alert("match occur")
                  for (const outElem of allrows) {
                    // console.log('======== outter ========');
                    for (const inElem of outElem) {
                      // alert(inElem)
                      if (ticket.seatNumber == inElem.id ) {
                        // alert(true)
                        inElem.isReserved=true
                      }
                    }
                  }
                }
                
              })
              console.log(allrows)
              console.log("4")
              this.setState({
                rows:allrows,
                load:true,
                totalCost:0,
                seats:[]

              })
              
                })
                
              }
          }
            )
            .catch((error) => {
              console.log(error);
            });
        };
      componentWillUnmount() {
        clearInterval(this.interval);
  
      }
      componentDidMount()
      {
        this.props.resetReservatioForm()
        this.interval = setInterval(() => this.GetTickets(), 1000);
  
      }
      handleSeatsRender(){
        this.setState({
          match:this.props.match.match,
          load:false
        },async()=>
        {
          var noOfRows=0
          var noOfCols=0
          this.props.staduims.staduims.map((stad)=>{
            if(this.state.match.staduim_Name_Match === stad.staduimname)
            {
              // console.log("1")
              noOfRows=stad.noOfRows
              noOfCols=stad.seatsPerRow
  
            }
          })
          var allrows = new Array(parseInt( noOfRows));
          
          for (var i = 0; i < parseInt(noOfRows); i++) {
            // console.log(noOfCols)
            allrows[i] = new Array(parseInt( noOfCols));
            allrows[i].length=0
          } 
         
          var seatnumber=1;
  
          for (let index = 0; index < parseInt(noOfRows); index++) {
            for( let j =0; j < parseInt(noOfCols); j++){
              // console.log("2")
              allrows[index].push({id: seatnumber, number: seatnumber,isReserved:false})
              seatnumber++
            }
            
          }
          
          // console.log("Allrows",allrows);
          this.props.tickets.tickets.map((ticket)=>{
            if (this.state.match.Matchid === ticket.matchId_Ticket) {
              // alert("match occur")
              for (const outElem of allrows) {
                // console.log('======== outter ========');
                for (const inElem of outElem) {
                  // alert(inElem)
                  if (ticket.seatNumber == inElem.id ) {
                    // alert(true)
                    inElem.isReserved=true
                  }
                }
              }
            }
            console.log("Allrows",allrows);
          })
          console.log(allrows)
          this.setState({
            rows:allrows
          })
        }
  
        )
      }
      render(){
        const {loading} = this.state

        
          return(
            <div>
              <Navbar dark expand="md" className="headerClass">
                    <div className="container-fluid">
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
            <Jumbotron className="new">
            <div className="container-fluid">
               <div className="row row-header">
                   <div className="col-12 col-sm-6">
                       <h1>Egyptian Premier League</h1>
                       <p>The Egyptian Premier League is a professional association football league in Egypt and the top level of the Egyptian football league system</p>
                   </div>
               </div>
            </div>
            </Jumbotron>
              <div className="container-fluid" style={{paddingBottom:"3em", padding: "3em"}} >
              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" onClick={()=>this.handleSeatsRender()}>
                    <h5 className="ediiiit">Reserve Tickets (15$ per ticket)</h5>                    
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <h1 style={{}}>{this.props.match.match.homeTeam}<b style={{color:'red'}}> VS </b>{this.props.match.match.awayTeam}  <b style={{color:'red'}} className='ml-auto'><i class="fa fa-calendar"></i>{this.props.match.match.matchDate} </b> </h1>
                      <div style={{marginTop: '100px'}}>
                        <Button onClick={()=>this.setState({load:true})} className="signupbtn" >
                        Load Seats
                        </Button>
                        <Button onClick={()=>this.setState({load:false})} className="signupbtn" >
                          Unload Seats
                        </Button>

                        {
                          this.state.load === true ?
                          (
                            <div style={{padding:"5em"}}>
                              <Row>
                                <Col xs={6} md={{ size: 3, offset: 3 }}>
                                  <h5>Number of seats Selected: {this.state.totalCost/15}</h5>
                                </Col>
                                <Col xs={6} md={{ size: 3, offset: 1 }}>
                                  <h5><i class="fa fa-money"></i>Totaal Cost: {this.state.totalCost}</h5>
                                </Col>
                                
                              </Row>
                              <Row>
                                <Col xs={12} md={{ size: 6, offset: 5 }}>
                                  <SeatPicker
                                    addSeatCallback={this.addSeatCallback}
                                    removeSeatCallback={this.removeSeatCallback}
                                    rows={this.state.rows}
                                    maxReservableSeats={100}
                                    alpha
                                    visible
                                    selectedByDefault
                                    loading={loading}
                                    // tooltipProps={{multiline: true}}
                                  />
                                </Col>
                              </Row>
                        <Row>
                          <Col xs={12} md={{ size: 6, offset: 3 }}>
                          <div className="row signup-field">
                            <div>
                              <Form
                                model="ticketreservation"
                                onSubmit={values => this.handleSubmit(values)}
                                id="myform"
                              >
                                <Row className="form-group">
                                  <Col xs={12} md={{ size: 6, offset: 3 }}>
                                    <Control.text
                                      className="form-control"
                                      model=". creditcardnumber"
                                      placeholder=" credit card number"
                                      id="creditcardnumber" 
                                      name="creditcardnumber"
                                      validators={{
                                        required
                                      }}
                                    />
                                    <Row className="ml-2">
                                      <Errors
                                        className="text-danger error"
                                        model=".creditcardnumber"
                                        show="touched"
                                        messages={{
                                          required: "Enter the Credit Card Number"
                                        }}
                                      />
                                    </Row>
                                  </Col>
                                </Row>
                                <Row className="form-group">
                                  <Col xs={12} md={{ size: 6, offset: 3 }}>
                                    <Control.text
                                      type="pin"
                                      className="form-control"
                                      model=".pin"
                                      placeholder="Pin"
                                      id="pin"
                                      name="pin"
                                      validators={{
                                        required
                                      }}
                                    />
                                    <Row className="ml-2">
                                      <Errors
                                        className="text-danger error"
                                        model=".pin"
                                        show="touched"
                                        messages={{
                                          required: "Enter the Pin "
                                        }}
                                      />
                                    </Row>
                                  </Col>
                                </Row>
                                <Row className="form-group">
                                  <Col xs={12} md={{ size: 6, offset: 3 }}>
                                    <Button model="submit" className="signupbtn" type="submit">
                                      {/* <Button onClick={this.testbackend()} className="signupbtn"> */}
                                      Reserve
                                    </Button>
                                  </Col>
                                </Row>
                              </Form>

                            </div>
                          </div>
                        
                          </Col>
                        </Row>
                        
                        </div>
                          ):
                          (
                            <div></div>
                          )
                        }
                        
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>  
              </div>
              <Footer/>
          </div>
          )
      }
}

export default ReserveTickets;