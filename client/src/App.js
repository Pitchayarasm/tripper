import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Redirect,Switch} from "react-router-dom";
import Nav from "./component/Nav";
import Chat from "./component/Chat";
import Home from "./component/Pages/Home.js";
import Journal from './component/Pages/Journal.js';
import Profile from "./component/Pages/Profile.js";
import FriendProfile from "./component/Pages/Friend_Profile.js";
import SearchFriends from "./component/Pages/Friends.js";
import TopHH from "./component/Pages/TopHH.js";
import axios from "axios";

//Compiled SASS into the main style.css file
import "../src/css/style.css";

class App extends Component {
  
    state = {
        chat: {
            user1: "",
            user2: "",
            active: false,
            user1_Id: "",
            user2_Id: ""
        },
        user: null
    };

    setUser = (data) => {
        if (data) {
            this.setState({
                user: data
            });
        }
    };

    componentDidMount() {
        axios.get("/isLogin").then(res => {
            if (res.data) {
                this.setState({
                    user : res.data
                }); 
            };
        });
    };

    // CHAT FUNCTIONS
    // Fn to start chat. Communicating with Nav.js.
    startChat = (chatStatus) => {
        console.log(chatStatus);
        let chat = {...this.state.chat};
            chat.active = chatStatus;
        this.setState({chat});
    };

    // Fn to end chat. Communicating with Chat.js.
    endChat = (chatStatus) => {
        console.log(chatStatus);
        let chat = {...this.state.chat};
            chat.active = chatStatus;
        this.setState({chat});
    };

    render() {

        return (
            <Router>
                <>
                    <Nav user={this.state.user} startChat={this.startChat} setUser={this.setUser}></Nav>
                    <Switch>
                        <Route exact path="/" render={(props) => <Home {...props} user={this.state.user} setUser={this.setUser} />} />
                        {/* {!this.state.user ? <Redirect to="/" /> : null } */}
                        <Route exact path="/journal" render={(props) => <Journal {...props} user={this.state.user}/>} />
                        <Route exact path="/profile" render={(props) => <Profile {...props} user={this.state.user}/>} />
                        <Route exact path="/friend_profile" render={(props) => <FriendProfile {...props} user={this.state.user}/>} />
                        <Route exact path="/friends" render={(props) => <SearchFriends {...props} user={this.state.user}/>} />
                        <Route exact path="/top_hikers" render={(props) => <TopHH {...props} user={this.state.user}/>} />
                    </Switch>
                    <Chat endChat={this.endChat} chatStatus={this.state.chat.active}></Chat>
                </>
            </Router>
        );
    }
}

export default App;
