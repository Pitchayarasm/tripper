import React from "react";
import { Button, Icon, Input } from "react-materialize";
import io from "socket.io-client";
import "./style.css";

class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            chatting: true,
            message: "",
            messages: [],
        };

        this.socket = io("localhost:3001");

        this.socket.on("id", (data) => {
            this.props.chat.user1_Id = data;
        });

        this.socket.on("RECEIVE_MESSAGE", (data) => {
            addMessage(data);
        });

        const addMessage = (data) => {
            console.log(data);

            this.setState({messages: [...this.state.messages, data]});
        }

        this.scrollToBottom = this.scrollToBottom.bind(this);
    };

    handleClick = (status) => {

        let setStatus = !status;
        this.setState({chatting: setStatus})
    }

    handleChange = (e) => {
        this.setState({message: e.target.value});
    }

    sendMessage = () => {

        this.socket.emit("SEND_MESSAGE", 
            {
                name: this.props.chat.user1,
                roomId: this.props.chat.chatroom,
                message: this.state.message
            }
        );

        this.setState({message: ""});
    }

    scrollToBottom = () => {

        if (this.refs.chatContainer) {
            const { chatContainer } = this.refs;
    
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }
      
    componentDidMount() {
        this.scrollToBottom();
    }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }

    enterPressed = event => {
        let code = event.keyCode || event.which;
    
        if (code === 13) {
          this.sendMessage();
        }
      }

    render() {

        let chatWindow;

        if (this.state.chatting) {
            chatWindow = (
                <div className="card horizontal chatActive">
                    <div className="card-stacked">
                    <span className="cardHeader" onClick={() => this.handleClick(true)}>Chat with {this.props.chat.user2}<Icon>arrow_drop_down</Icon></span><span className="endChat" style={{textAlign: "right"}} onClick={() => this.props.endChat(false)}>Close Chat <Icon className="chatEndBtn">cancel</Icon></span>
                        <div ref="chatContainer" className="card-content messages">
                            {this.state.messages.map((item) => {

                                if (item.name === this.props.chat.user1) {
                                    return (
                                        <div className="user1">{item.message}</div>
                                    )
                                }
                                else {
                                    return (
                                        <div className="user2">{item.message}</div>
                                    )
                                }
                            })}
                        </div>
                        <div className="card-action">
                            <div className="row">
                                <div className="col s10">
                                    <Input label="Chat" type="textarea" maxLength="140" onChange={this.handleChange} value={this.state.message} onKeyPress={this.enterPressed} />
                                </div>
                                <div className="col s2">
                                    <Button className="btn" onClick={this.sendMessage}><Icon className="chatSendBtn">reply</Icon></Button>
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
                {this.props.chat.active ? chatWindow : <div></div>}
            </div>
        );
    }
}

export default Chat;