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
      
          alert((response.request.responseText))
      }) 
      .catch((error) => {
        console.log(error);
      });
  };
  export const addUser = (data) => ({
    type: ActionTypes.ADD_LOGIN,
    payload: data,
  });