import React, {Component} from "react";
import SeatPicker from 'react-seat-picker'
import {Loading} from "./LoadingComponent"

class ReserveTickets extends Component{
    constructor(props){
        super(props);
        this.state={
            rows:[],
            loading:false,
            
        };
    // this.handleSelect = this.handleSelect.bind(this);
    
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
          alert(id)
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
      render(){
        const {loading} = this.state
        var allrows=[]
        const rows = ()=> {
            allrows=
          [
          [{id: 1, number: 1,isReserved:true}, {id: 2, number: 2,isReserved:false}, {id: 3, number: '3',isReserved:false}, {id: 4, number: '4',isReserved:false},  {id: 5, number: 5,isReserved:false}, {id: 6, number: 6,isReserved:false}],
          [{id: 7, number: 1,isReserved:false}, {id: 8, number: 2,isReserved:false}, {id: 9, number: '3',isReserved:false}, {id: 10, number: '4',isReserved:false},  {id: 11, number: 5,isReserved:false}, {id: 12, number: 6,isReserved:false}],
          [{id: 7, number: 1,isReserved:false}, {id: 8, number: 2,isReserved:false},  {id: 9, number: '3',isReserved:false}, {id: 10, number: '4',isReserved:false},  {id: 11, number: 5,isReserved:false}, {id: 12, number: 6,isReserved:false}],
          [{id: 13, number: 1,isReserved:false}, {id: 14, number: 2,isReserved:false},  {id: 15, number: 3,isReserved:false}, {id: 16, number: '4',isReserved:false},  {id: 17, number: 5,isReserved:false}, {id: 18, number: 6,isReserved:false}],
          [{id: 19, number: 1,isReserved:false}, {id: 20, number: 2,isReserved:false},  {id: 21, number: 3,isReserved:false}, {id: 22, number: '4',isReserved:false}, {id: 23, number: 5,isReserved:false}, {id: 24, number: 6,isReserved:false}],
          [{id: 25, number: 1,isReserved:false}, {id: 26, number: 2,isReserved:false},  {id: 27, number:'3',isReserved:false}, {id: 28, number: '4',isReserved:false}, {id: 29, number: 5,isReserved:false}, {id: 30, number: 6,isReserved:false}]
        ]
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
            return allrows
          }
          return(
            <div>  
                <h1>Seat Picker</h1>
                <div style={{marginTop: '100px'}}>
                <SeatPicker
                    addSeatCallback={this.addSeatCallback}
                    removeSeatCallback={this.removeSeatCallback}
                    rows={rows()}
                    maxReservableSeats={3}
                    alpha
                    visible
                    selectedByDefault
                    loading={loading}
                    // tooltipProps={{multiline: true}}
                />
                </div>
        </div>
          )
      }
}
export default ReserveTickets