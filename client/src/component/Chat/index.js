import React from "react";
import { Button, Icon, Input, Navbar, SideNav, SideNavItem } from "react-materialize";
import io from "socket.io-client";
import "./style.css";

class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            chatting: true,
            message: "",
            socket_id: "",
            messages: []
        };

        // Connect socket to communicate with server
        this.socket = io("localhost:3001");

        // Retrieve the connected user's socketID and store in App
        this.socket.on("id", (data) => {
            console.log(data);
            this.setState({socket_id: data});
        });

        // Receive success message, upon starting a new chatroom with selected friend
        this.socket.on("success", (data) => {
            console.log(data);
        });

        // Listen for received messages and display to DOM
        this.socket.on("RECEIVE_MESSAGE", (data) => {
            this.addMessage(data);
        });

        this.socket.on("notification", () => {
            this.props.newMessage();
        });

        this.socket.on("leftRoom", (data) => {
            console.log(data);
        });
        
        this.scrollToBottom = this.scrollToBottom.bind(this);
    };
    
    addMessage = (data) => {
        this.setState({messages: [...this.state.messages, data]});
    }

    sendMessage = () => {

        this.socket.emit("SEND_MESSAGE", 
            {
                name: this.props.chat.user1,
                userId: this.props.user._id,
                roomId: this.props.chat.chatroom,
                message: this.state.message
            }
        );

        this.setState({message: ""});
        this.props.messageRead();
    }

    joinRoom = () => {
        this.socket.emit("create", this.props.chat.chatroom, "5c64976a11bf4c1a0cf2a6f0"); // Will need to replace string with FRIEND _id property.
    }

    handleClick = (status) => {

        let setStatus = !status;
        this.setState({chatting: setStatus})
    }

    handleChange = (e) => {
        this.setState({message: e.target.value});
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
        if (this.props.chat.active) {
            this.joinRoom();
        }

        if (this.props.user) {
            this.socket.emit("logon", this.props.user._id);
        }
        this.scrollToBottom();
    }

    // Fn to end chat. Communicating with Chat.js.
    leaveRoom = () => {
        this.socket.emit("leave", this.props.chat.chatroom);
        console.log("Left Room");
        this.props.endChat(false);
    };

    enterPressed = event => {
        let code = event.keyCode || event.which;
    
        if (code === 13) {
          this.sendMessage();
        }
    }

    render() {

        let chatWindow;
        let timestamp = new Date;
            timestamp = timestamp.getHours() + ":" + timestamp.getMinutes();

        if (this.state.chatting) {
            chatWindow = (
                <div className="card horizontal chatActive">
                    <div className="card-stacked">
                    <span className="cardHeader" onClick={() => this.handleClick(true)}>Chat with {this.props.chat.user2}<Icon>arrow_drop_down</Icon></span><span className="endChat" style={{textAlign: "right"}} onClick={() => this.leaveRoom()}>Close Chat <Icon className="chatEndBtn">cancel</Icon></span>
                        <div ref="chatContainer" className="card-content messages">
                            {this.state.messages.map((item) => {

                                if (item.userId === this.props.user._id) {
                                    return (
                                        <>
                                        <span className="user1Time">{timestamp}&nbsp;&nbsp;-&nbsp;&nbsp;You said:</span>
                                        <div className="user1">{item.message}</div>
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        <>
                                        <span className="user2Time">{timestamp}&nbsp;&nbsp;-&nbsp;&nbsp;{this.props.chat.user2.split(" ")[0]} said:</span>
                                        <div className="user2">{item.message}</div>
                                        </>
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
                    <p>Chat <Icon>arrow_drop_up</Icon></p>
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