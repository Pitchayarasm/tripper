import React, { Component } from 'react';
import Home from "./component/Pages/Home.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Journal from './component/Pages/Journal.js';


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" render={(props) => <Home {...props} />} />
                    <Route exact path="/journal" render={(props) => <Journal {...props} />} />

                </div>
            </Router>
        );
    }
}
export default App;
