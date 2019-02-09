import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./component/Nav/Nav.js";
import Profile from "./component/Pages/Profile.js";


class App extends Component {
  
    state = {

    }

    render() {

        return (
            <Router>
                <>
                    <Nav></Nav>
                    <Route exact path="/profile" render={(props) => <Profile {...props} />} />
                </>
            </Router>
        );
    }
}

export default App;
