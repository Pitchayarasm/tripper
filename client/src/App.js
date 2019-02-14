import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import io from "socket.io-client";
import {Redirect,Switch} from "react-router-dom";
import Nav from "./component/Nav";
import Footer from "./component/Footer/Footer.js";
import Chat from "./component/Chat";
import Home from "./component/Pages/Home.js";
import Entry from './component/Pages/Entry';
import Profile from "./component/Pages/Profile.js";
import FriendProfile from "./component/Pages/Friend_Profile.js";
import SearchFriends from "./component/Pages/Friends.js";
import Journal from "./component/Pages/Journal.js";
import TopHH from "./component/Pages/TopHH.js";
import axios from "axios";

//Compiled SASS into the main style.css file
import "../src/css/style.css";

class App extends Component {
  
    state = {
        chat: {
            user1: null,
            user1_id: null,
            user2: "",
            active: false,
            chatroom: "",
            notification: false
        },
        user: {}
    };

    setUser = (data) => {
        if (data) {

            let chat = {...this.state.chat};
                chat.user1 = data.firstName + " " + data.lastName;
                chat.user1_id = data._id;
            this.setState({
                chat,
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
    startChat = (chatStatus, chattingWith) => {

        // this.socket = io("localhost:3001");

        let chat = {...this.state.chat};
            chat.active = chatStatus;
            chat.user2 = chattingWith;
            chat.chatroom = chat.user1.split(" ")[1] + chat.user2.split(" ")[1];
            chat.notification = false;
        
        this.setState({chat});
    };

    newMessage = () => {
        let chat = {...this.state.chat};
            chat.notification = true;

        this.setState({chat});
    };

    messageRead = () => {
        let chat = {...this.state.chat};
            chat.notification = false;
        
        this.setState({chat});
    };

    // Fn to end chat. Communicating with Chat.js.
    endChat = (chatStatus) => {
        console.log(chatStatus);
        let chat = {...this.state.chat};
            chat.active = chatStatus;
            chat.notification = false;
        this.setState({chat});
    };

    render() {

        return (
            <Router>
                <>
                    <Nav user={this.state.user} startChat={this.startChat} setUser={this.setUser} chat={this.state.chat}></Nav>
                    <Switch>
                        <Route exact path="/" render={(props) => <Home {...props} user={this.state.user} setUser={this.setUser} />} />
                        {/* {!this.state.user.firstName ? <Redirect to="/" /> : null } */}
                        <Route exact path="/entry" render={(props) => <Entry {...props} user={this.state.user} setUser={this.setUser}/>} />
                        <Route exact path="/journal" render={(props) => <Journal {...props} user={this.state.user} setUser={this.setUser}/>} />
                        <Route exact path="/profile" render={(props) => <Profile {...props} user={this.state.user} setUser={this.setUser}/>} />
                        <Route exact path="/friend_profile" render={(props) => <FriendProfile {...props} user={this.state.user}/>} />
                        <Route exact path="/friends" render={(props) => <SearchFriends {...props} user={this.state.user}/>} />
                        <Route exact path="/top_hikers" render={(props) => <TopHH {...props} user={this.state.user}/>} />
                    </Switch>
                    <Chat endChat={this.endChat} chatStatus={this.state.chat.active} chat={this.state.chat} user={this.state.user} newMessage={this.newMessage} messageRead={this.messageRead}></Chat>
                    <Footer></Footer>
                </>
            </Router>
        );
    }
}

export default App;