import React, {Component} from "react";
import "./cssFiles/home.css";
import Header from "./HeaderComponent"
import Footer from "./FooterComponent"

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
           
        };

    }
    render(){
        return(

        <div className="">
            <Header />
            <Footer/>
        </div>      
              );
    

    }
}

export default Home;
