import React from "react";
// import { NavLink } from "react-router-dom";
import { Button, Icon, Input } from "react-materialize";
import "./ChatStyles.css";

class Chat extends React.Component {

    state = {
        active: false
    }

    handleClick = (status) => {

        let setStatus = !status;
        this.setState({active: setStatus})
    }

    render() {

        let chatWindow;

        if (this.state.active) {
            chatWindow = (
                <div className="card horizontal chatActive">
                    <div className="card-stacked">
                    <span className="cardHeader" onClick={() => this.handleClick(true)}>Chat with Chris Cuomo...<Icon className="chatBtn">cancel</Icon></span>
                        <div className="card-content">
                            <p><strong>Chris Cuomo:</strong> Hey, Anderson!</p>
                        </div>
                        <div className="card-action">
                            <div className="row">
                                <div className="col s10">
                                    <Input label="Chat" type="textarea" maxlength="140"/>
                                </div>
                                <div className="col s2">
                                    <Button className="btn"><Icon className="chatBtn">reply</Icon></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            chatWindow = (
                <div className="card chatInactive" onClick={() => this.handleClick(false)}>
                    <p>Chat with Chris Cuomo...<Icon>arrow_drop_up</Icon></p>
                </div>
            );
        }

        return (
            <>
                {chatWindow}
            </>
        );
    }
}

export default Chat;