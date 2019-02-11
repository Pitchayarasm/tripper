import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./component/Nav";
import Chat from "./component/Chat";
import Home from "./component/Pages/Home.js";
import Journal from './component/Pages/Journal.js';
import Profile from "./component/Pages/Profile.js";


class App extends Component {
  
    state = {
        nav: {
            loggedIn: true
        },
        chat: {
            user1: "",
            user2: "",
            active: false,
            user1_Id: "",
            user2_Id: ""
        }
    }

    // CHAT FUNCTIONS
    // Fn to start chat. Communicating with Nav.js.
    startChat = (chatStatus) => {
        console.log(chatStatus);
        let chat = {...this.state.chat};
            chat.active = chatStatus;
        this.setState({chat});
    }

    // Fn to end chat. Communicating with Chat.js.
    endChat = (chatStatus) => {
        console.log(chatStatus);
        let chat = {...this.state.chat};
            chat.active = chatStatus;
        this.setState({chat});
    }

    render() {

        return (
            <Router>
                <>
                    <Nav loginStatus={this.state.nav.loggedIn} startChat={this.startChat}></Nav>
                    <Route exact path="/" render={(props) => <Home {...props} />} />
                    <Route exact path="/journal" render={(props) => <Journal {...props} />} />
                    <Route exact path="/profile" render={(props) => <Profile {...props} />} />
                    <Chat endChat={this.endChat} chatStatus={this.state.chat.active}></Chat>
                </>
            </Router>
        );
    }
}

export default App;
