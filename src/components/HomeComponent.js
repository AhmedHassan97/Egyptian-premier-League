import React, {Component} from "react";
import "./cssFiles/home.css";
import Header from "./HeaderComponent"
import Footer from "./FooterComponent"
import {Tabs,Tab,Card,Button} from "react-bootstrap"
import {Loading} from "./LoadingComponent"
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            key:3
        };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleApproval = this.handleApproval.bind(this);
    this.handleDisapproval = this.handleDisapproval.bind(this);


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
    render(){
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

        <div className="">
            <Header />
            <div className="bodyHome backGround">
            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
                <Tab eventKey={1} title="Home">
                    <div className="bodyHome">
                    </div>
                </Tab>
                <Tab eventKey={2} title="Matches">
                    <div className="bodyHome">
                    <div class="DateandTitle">
                        <h3 class="DateandTitleHeader">
                            Saturday 13 February 2021
                        </h3>
                        <img class="DateandTitleImage" src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png"/>              
                    </div>
                    <div type="button" onclick="alert('Hello world!')" class="BelowDateandTitle" >
                        <div class="BelowDateandTitleFirst">
                            <span class="BelowDateandTitleFirstText">Burnly</span>
                            <span>
                                <img class="BelowDateandTitleFirstImage" src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png"/>  
                            </span>
                            <span class="BelowDateandTitleFirstTime">
                                22:00
                            </span>
                            <span>
                                <img class="BelowDateandTitleFirstImage" src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png"/>  
                            </span>
                            <span class="BelowDateandTitleFirstText">Man Utd</span>
                        </div>  
                        <div class="BelowDateandTitleSecond">
                            <img class="BelowDateandTitleSecondImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Soccer_field_-_empty.svg/1024px-Soccer_field_-_empty.svg.png"/>  
                            Turf Moor, <strong>London</strong>
                        </div> 
                       
                    </div>
                </div>
                </Tab>
                    <Tab eventKey={3} title="Approve Users" >
                        <div className="bodyHome">
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
                    </Tab>   
                
                </Tabs>
            </div>
            <Footer/>
        </div>   
    );
    

    }
}

export default Home;
