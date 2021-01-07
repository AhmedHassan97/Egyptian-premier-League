import * as ActionTypes from "./ActionTypes";
import { baseUrl } from './baseUrl';
import axios from "axios";



export const postFeedback = (
    newFeedback
  ) => (dispatch) => {
    console.log(newFeedback)
    axios
      .post(`${baseUrl}/insert.php`,newFeedback)
      .then((response) => {
        if(response.request.responseText == true){
          alert("Congratulation, now go to the Sign in Page to Sign In")
        }
        else
          alert(response.request.responseText)
      }) 
      .catch((error) => {
        console.log(error);
      });
  };


  export const SignInAction = (
    newFeedback
  ) => (dispatch) => {
    
    axios
      .post(`${baseUrl}/getUser.php`,newFeedback)
      .then((response) => {
        // alert(response.request.responseText)
        // alert(newFeedback)
          if(JSON.parse(response.request.responseText)["approved"]==="0")
          {
            dispatch(addUser(JSON.parse( response.request.responseText)))

            alert("Your Account is Not Approved Yet")
          }
          else{
            dispatch(addUser(JSON.parse( response.request.responseText)))
            console.log(JSON.parse(response.request.responseText))
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


  export const GetMatches = (
  ) => (dispatch) => {
    
    axios
      .get(`${baseUrl}/getMatches.php`)
      .then((response) => {
          if(JSON.parse(response.request.responseText)["approved"]==="0")
          {
            dispatch(addUser(JSON.parse( response.request.responseText)))
            alert("Your Account is Not Approved Yet")
          }
          else{
            dispatch(addUser(JSON.parse( response.request.responseText)))
            console.log(JSON.parse(response.request.responseText))
          }
     
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


  export const GetUsers = (
    ) => (dispatch) => {
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

    
    export const PendRequest = (
      newFeedback
    ) => (dispatch) => {
      dispatch(usersLoading(true));

      axios
        .post(`${baseUrl}/alterApproval.php`,newFeedback)
        .then((response) => {
          alert(response.request.responseText)
            dispatch(GetUsers());
      }
        )
        .catch((error) => {
          console.log(error);
        });
    };
    export const usersLoading = () => ({
      type: ActionTypes.USERS_LOADING
  });
  