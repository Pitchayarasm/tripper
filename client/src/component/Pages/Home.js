import React from "react";
import { Row, Input, Modal, Button, Parallax } from "react-materialize";
import axios from "axios";
import "./home.css";

class Home extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    loginEmail: "",
    loginPassword: ""
  };

  handleSignUp = () => {
    axios.post("/register", {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      email: this.state.email,
    }).then(res => {
      console.log(res);
      this.setState({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        loginEmail: "",
        loginPassword: ""
      });
    }).catch(() => {
      alert("Unable to create account.");
    });
  };

  handleLogin = () => {
    var passObj = {email: this.state.loginEmail, password: this.state.loginPassword};

    console.log("Someone tried to sign in!");
    console.log(`Their information is:
    email: ${passObj.email}
    password: ${passObj.password}`);
    this.setState({
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      loginEmail: "",
      loginPassword: ""
    });
    //fill in this information here
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.id;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <>
        <Parallax className="topImg" imageSrc="http://materializecss.com/images/parallax1.jpg" />
          <div className="section white">
            <div className="row container btnContainer">
              <h2 className="header">tripper</h2>
              <p className="grey-text text-darken-3 lighten-3">tripper is social network for adventorous travelers. Sign up and start telling your story!</p>
              <br/>

              <Modal
                header='tripper Account Sign Up'
                trigger={<Button className="homeBtn">Sign Up</Button>}
                actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="signUpSubmit" onClick={this.handleSignUp}>Submit</Button></>}
                >
                <Row id="signUpForm">
                  <Input id="firstName" placeholder s={5} label="First Name" onChange={this.handleInputChange} />
                  <Input id="lastName" s={6} label="Last Name" onChange={this.handleInputChange} />
                  <Input id="email" type="email" label="Email" s={12} onChange={this.handleInputChange} />
                  <Input id="password" type="password" label="password" s={12} onChange={this.handleInputChange} />
                </Row>
              </Modal>

              <Modal
                header='tripper Login'
                trigger={<Button className="homeBtn">Login</Button>}
                actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="loginBtn" onClick={this.handleLogin}>Login</Button></>}
                >
                <Row>
                  <Input id="email" type="email" label="Email" s={12} onChange={this.handleInputChange} />
                  <Input id="loginPassword" type="password" label="password" s={12} onChange={this.handleInputChange} />
                </Row>
              </Modal>
            </div>
          </div>
        <Parallax imageSrc="http://materializecss.com/images/parallax2.jpg" />
      </>
    );
  }
}

export default Home;