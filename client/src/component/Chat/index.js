import React from "react";
// import { NavLink } from "react-router-dom";
import { Button, Icon, Input } from "react-materialize";

class Chat extends React.Component {

    state = {
        chatting: true
    }

    handleClick = (status) => {

        let setStatus = !status;
        this.setState({chatting: setStatus})
    }

    checkhit = () => {
        console.log("Hit");
    }

    render() {

        let chatWindow;

        if (this.state.chatting) {
            chatWindow = (
                <div className="card horizontal chatActive">
                    <div className="card-stacked">
                    <span className="cardHeader" onClick={() => this.handleClick(true)}>Chat with Chris Cuomo...<Icon>arrow_drop_down</Icon></span><span className="endChat" style={{textAlign: "right"}} onClick={() => this.props.endChat(false)}>Close Chat <Icon className="chatEndBtn">cancel</Icon></span>
                        <div className="card-content">
                            <p><strong>Chris Cuomo:</strong> Hey, Anderson!</p>
                        </div>
                        <div className="card-action">
                            <div className="row">
                                <div className="col s10">
                                    <Input label="Chat" type="textarea" maxLength="140"/>
                                </div>
                                <div className="col s2">
                                    <Button className="btn"><Icon className="chatSendBtn">reply</Icon></Button>
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
            <div className="chatBox">
                {this.props.chatStatus ? chatWindow : <div></div>}
            </div>
        );
    }
}

export default Chat;