import React from "react";
import { Button, Icon, Input } from "react-materialize";
import io from "socket.io-client";

class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            chatting: true,
            message: "",
            isTyping: "",
            socket_id: "",
            messages: []
        };

        // Connect socket to communicate with server
        this.socket = io("localhost:3001");

        // Retrieve the connected user's socketID and store in App
        this.socket.on("id", (data) => {
            this.setState({socket_id: data});
        });

        // Receive success message, upon starting a new chatroom with selected friend
        this.socket.on("success", (data) => {
            console.log(data);
        });

        // Listen for chat typing.
        this.socket.on("isTyping", (data) => {
            this.setState({isTyping: data});
        });

        this.socket.on("noTyping", () => {
            this.setState({isTyping: ""});
        });

        // Listen for received messages and display to DOM
        this.socket.on("RECEIVE_MESSAGE", (data) => {
            this.addMessage(data);
        });

        // Listen for new messages to update chat button.
        this.socket.on("notification", (data) => {
            this.props.newMessage(data.name, data._id);
        });

        // Listener to leave chatroom.
        this.socket.on("leftRoom", (data) => {
            console.log(data);
        });
        
        this.scrollToBottom = this.scrollToBottom.bind(this);
    };
    
    addMessage = (data) => {
        this.setState({messages: [...this.state.messages, data], isTyping: ""});
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
        this.socket.emit("create", this.props.chat.chatroom, this.props.chat.user2_id);
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

        // Is typing message...
        if (this.state.message === "" || this.state.message === "\n") {
            this.socket.emit("noTyping", this.props.chat.chatroom);
        }
        else {
            this.socket.emit("typing", this.props.chat.user1.split(" ")[0] + " is typing a message...", this.props.chat.chatroom);
        }
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

    setTime = () => {

        let time = new Date();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        
        if (hours < 10) {
            hours = "0" + hours;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        
        return hours + ":" + minutes;
    }

    render() {

        let chatWindow;
        let timestamp = this.setTime();

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
                                        <span className="user1Time">{timestamp}</span>
                                        <div className="user1">{item.message}</div>
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        <>
                                        <span className="user2Time">{timestamp}</span>
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
                                <div className="col s12 isTyping">{this.state.isTyping}</div>
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