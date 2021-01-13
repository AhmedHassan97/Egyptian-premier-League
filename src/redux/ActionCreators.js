import * as ActionTypes from "./ActionTypes";
import { baseUrl } from './baseUrl';
import axios from "axios";
import _ from 'lodash';


// /////////////////////////////////////////////////////////////////// SIGN UP /////////////////////////////////////////////////////////
export const postFeedback = (
    newFeedback
  ) => (dispatch) => {
    console.log(newFeedback)
    // dispatch(usersLoading(true));

    axios
      .post(`${baseUrl}/insert.php`,newFeedback)
      .then((response) => {
        if(response.request.responseText == true){
          alert("Congratulation, now go to the Sign in Page to Sign In")
          dispatch(GetUsers());
        }
        // else
        //   alert(response.request.responseText)
      }) 
      .catch((error) => {
        console.log(error);
      });
  };

// /////////////////////////////////////////////////////////////////// SIGN IN /////////////////////////////////////////////////////////
  export const SignInAction = (
    newFeedback
  ) => (dispatch) => {
    axios
      .post(`${baseUrl}/getUser.php`,newFeedback)
      .then((response) => {
        try {
          if(JSON.parse(response.request.responseText)["approved"]==="0")
          {
            // dispatch(addUser(JSON.parse( response.request.responseText)))
            alert("Your Account is Not Approved Yet")
          }
          else{
            dispatch(addUser(JSON.parse( response.request.responseText)))
            console.log(JSON.parse(response.request.responseText))
          }  
        } catch (error) {
          alert("Wrong username or password")
        }
        
     
    }
      )
      .catch((error) => {
        console.log(error);
      });
  };
  export const addUser = (data) => ({
    type: ActionTypes.ADD_LOGIN,
    payload: data,
  });

// /////////////////////////////////////////////////////////////////// Matches /////////////////////////////////////////////////////////
  export const GetMatches = (
  ) => (dispatch) => {
    dispatch(matchesLoading());
    axios
      .get(`${baseUrl}/getMatches.php`)
      .then((response) => {
        dispatch(addMatches(JSON.parse( response.request.responseText)))
    }
      )
      .catch((error) => {
        console.log(error);
      });
  };
  export const addMatches = (data) => ({
    type: ActionTypes.ADD_MATCHES,
    payload: data,
  });
  export const matchesLoading = () => ({
    type: ActionTypes.MATCHES_LOADING
});
// /////////////////////////////////////////////////////////////////// Get All USERS /////////////////////////////////////////////////////////
  export const GetUsers = (
    ) => (dispatch) => {
      dispatch(usersLoading(true));
      axios
        .get(`${baseUrl}/getAllUsers.php`)
        .then((response) => {
            // console.log(JSON.parse(response.request.responseText))
          dispatch(addUsers(JSON.parse(response.request.responseText)))
      }
        )
        .catch((error) => {
          console.log(error);
        });
    };
    export const addUsers = (data) => ({
      type: ActionTypes.ADD_USERS,
      payload: data,
    });

    export const usersLoading = () => ({
      type: ActionTypes.USERS_LOADING
  });
  // /////////////////////////////////////////////////////////////////// Approve Or diapprove /////////////////////////////////////////////////////////
    export const PendRequest = (
      newFeedback
    ) => (dispatch) => {
      dispatch(usersLoading(true));

      axios
        .post(`${baseUrl}/alterApproval.php`,newFeedback)
        .then((response) => {
          // alert(response.request.responseText)
            dispatch(GetUsers());
      }
        )
        .catch((error) => {
          console.log(error);
        });
    };
  // /////////////////////////////////////////////////////////////////// TEAMS /////////////////////////////////////////////////////////
  export const GetTeams = (
    ) => (dispatch) => {
      dispatch(teamsLoading());
      axios
        .get(`${baseUrl}/getAllTeams.php`)
        .then((response) => {
          // alert(response.request.responseText)

            // console.log(JSON.parse(response.request.responseText))
          dispatch(addTeams(JSON.parse(response.request.responseText)))
      }
        )
        .catch((error) => {
          console.log(error);
        });
    };
    export const addTeams = (data) => ({
      type: ActionTypes.GET_TEAMS,
      payload: data,
    });
    export const teamsLoading = () => ({
      type: ActionTypes.TEAMS_LOADING
  });
  
  export const GetStaduims = (
    ) => (dispatch) => {
      dispatch(stadLoading(true));
      axios
        .get(`${baseUrl}/getAllStad.php`)
        .then((response) => {
          // alert(response.request.responseText)

            // console.log(JSON.parse(response.request.responseText))
          dispatch(addStad(JSON.parse(response.request.responseText)))
      }
        )
        .catch((error) => {
          console.log(error);
        });
    };
    export const addStad = (data) => ({
      type: ActionTypes.GET_STADUIMS,
      payload: data,
    });
    export const stadLoading = () => ({
      type: ActionTypes.STADUIMS_LOADING
  });
    // /////////////////////////////////////////////////////////////////// Add new match by the manger /////////////////////////////////////////////////////////
  export const postMatch = (
    newFeedback
  ) => (dispatch) => {
    console.log(newFeedback)
    dispatch(matchesLoading());
    axios
      .post(`${baseUrl}/addMatch.php`,newFeedback)
      .then((response) => {
          if (response.request.responseText != true){
            alert("You cant choose the away team and the home team the same")
            dispatch(GetMatches());  
          }
          else{
            alert("Match added Successfuly")
            dispatch(GetMatches());
          }
           
      }) 
      .catch((error) => {
        console.log(error);
      });
  };
    // /////////////////////////////////////////////////////////////////// Add new staduim by the manger /////////////////////////////////////////////////////////

    export const postStad = (
      newFeedback
    ) => (dispatch) => {
      console.log(newFeedback)
      dispatch(stadLoading(true));
      axios
        .post(`${baseUrl}/addStad.php`,newFeedback)
        .then((response) => { dispatch(GetStaduims());  
          // alert(response.request.responseText)  

        }) 
        .catch((error) => {
          console.log(error);
        });
    };
     // /////////////////////////////////////////////////////////////////// Edit match by the manger /////////////////////////////////////////////////////////
  export const EditMatch = (
    newFeedback
  ) => (dispatch) => {
    console.log(newFeedback)
    dispatch(matchesLoading());
    axios
      .post(`${baseUrl}/alterMatch.php`,newFeedback)
      .then((response) => {
          //  alert(response.request.responseText)  
           dispatch(GetMatches())       
           
      }) 
      .catch((error) => {
        console.log(error);
      });
  };
       // /////////////////////////////////////////////////////////////////// Edit profile  /////////////////////////////////////////////////////////
       export const EditProfile = (
        newFeedback
      ) => (dispatch) => {
        // dispatch(UserLoading());
        axios
          .post(`${baseUrl}/alterUser.php`,newFeedback)
          .then((response) => {
            // alert("here")
            //    alert((response.request.responseText))  
               dispatch(addEditedUser(JSON.parse(response.request.responseText)))
               dispatch(GetUsers())       
               
          }) 
          .catch((error) => {
            console.log(error);
          });
      };
      export const addEditedUser = (data) => ({
        type: ActionTypes.EDIT_PROFILE,
        payload: data,
      });
      export const UserLoading = () => ({
        type: ActionTypes.EDIT_PROFILE_LOADING,
      });
      // /////////////////////////////////////////////////////////////////// Tickets /////////////////////////////////////////////////////////
  export const GetTickets = (
    ) => (dispatch) => {
      dispatch(ticketsLoading());
      axios
        .get(`${baseUrl}/getTickets.php`)
        .then((response) => {
          // if (_.isEqual(props, JSON.parse( response.request.responseText))) {
          // }
          // else{
            dispatch(addTickets(JSON.parse( response.request.responseText)))
          // }
          
      }
        )
        .catch((error) => {
          console.log(error);
        });
    };
    export const addTickets = (data) => ({
      type: ActionTypes.GET_TICKETS,
      payload: data,
    });
    export const ticketsLoading = () => ({
      type: ActionTypes.TICKETS_LOADING
  });
/////////////////////////////////////////////////////////////////////Reserve or Delete Tickets/////////////////////////////////////////////////
  export const ReserveOrDeleteTicket = (
    newFeedback) => (dispatch) => {
      if (newFeedback.delete===true) {
        axios
        .post(`${baseUrl}/getMatch.php`,newFeedback)
        .then((response) => {
          // response=JSON.parse(response.request.responseText)
          var dateSmall= new Date()
          var datebig=  new Date(JSON.parse(response.request.responseText)[0].matchDate)
          
          if(Math.floor((dateSmall-datebig)/ (1000 * 3600 * 24)) > 3)
          {
            axios
            .post(`${baseUrl}/reserveTicket.php`,newFeedback)
            .then((response) => {
              // alert(( response.request.responseText))
              dispatch(GetTickets())
          }
            )
            .catch((error) => {
              console.log(error);
            });
          }
          else {
            alert(" you can't cancel the reservation (maximum 3 days before the match)")
          }
        }
        )
        .catch((error) => {
          console.log(error);
        });  
      }
      else{
        axios
            .post(`${baseUrl}/reserveTicket.php`,newFeedback)
            .then((response) => {
              // alert(( response.request.responseText))
              dispatch(GetTickets())
          }
            )
            .catch((error) => {
              console.log(error);
            });
      }
     
};
 /////////////////////////////////////////////////////////////////////Logout/////////////////////////////////////////////////
 export const Logout = (
  ) => (dispatch) => {
   dispatch(logout())
};
export const logout = () => ({
  type: ActionTypes.ADD_LOGOUT
});
  