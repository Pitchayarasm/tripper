import React from "react";
import { Row, Input, Modal, Button, Parallax } from "react-materialize";
import axios from "axios";
import "./home.css";

class Home extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    password1: "",
    password2: "",
    email: "",
    loginEmail: "",
    loginPassword: ""
  };
<<<<<<< HEAD

  handleSignUp = () => {

    if (this.state.password1 === this.state.password2) {
      axios.post("/register", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password1,
        email: this.state.email,
      }).then(res => {
        console.log(res);
        this.setState({
          firstName: "",
          lastName: "",
          password1: "",
          password2: "",
          email: "",
          loginEmail: "",
          loginPassword: ""
        });
      }).catch(() => {
        alert("Unable to create account.");
      });
    }
    else
      alert("Passwords do not match!");
  };

  handleLogin = () => {
    var passObj = { email: this.state.loginEmail, password: this.state.loginPassword };
    console.log("Someone tried to sign in!");
    console.log(`Their information is:
    email: ${passObj.email}
    password: ${passObj.password1}`);
    this.setState({
      firstName: "",
      lastName: "",
      password1: "",
      password2: "",
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
            <br />

            <Modal
              header='tripper Account Sign Up'
              trigger={<Button className="homeBtn">Sign Up</Button>}
              actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="signUpSubmit" onClick={this.handleSignUp}>Submit</Button></>}
            >
              <Row id="signUpForm">
                <Input id="firstName" s={5} label="First Name" onChange={this.handleInputChange} />
                <Input id="lastName" s={6} label="Last Name" onChange={this.handleInputChange} />
                <Input id="email" type="email" label="Email" s={12} onChange={this.handleInputChange} />
                <Input id="password1" type="password" label="password" s={12} onChange={this.handleInputChange} />
                <Input id="password2" type="password" label="confirm password" s={12} onChange={this.handleInputChange} />
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
=======
  render() {
    return (
      <div>
        <div>
​
          <Parallax imageSrc="http://materializecss.com/images/parallax1.jpg" />
          <div className="section white">
            <div className="row container">
              <h2 className="header">Tripper</h2>
              <p className="grey-text text-darken-3 lighten-3">Tripper is social network for adventorous travelers, join if you dare to tell your story:</p>
​
              <Modal
                header="Modal Header"
                trigger={<Button>Sign up</Button>}>
                <Row>
                  <Input placeholder s={6} label="First Name" />
                  <Input s={6} label="Last Name" />
                  <Input type="email" label="Email" s={12} />
                  <Input type="file" label="Profile picture" s={12} />
                  <Input type="password" label="password" s={12} />
​
                </Row>
              </Modal>
              <Modal
                header='Modal Header'
                trigger={<Button>Log in</Button>}>
                <Row>
                  <Input type="email" label="Email" s={12} />
                  <Input type="password" label="password" s={12} />
​
                </Row>
              </Modal>
            </div>
>>>>>>> day3
          </div>
        </div>
        <Parallax imageSrc="http://materializecss.com/images/parallax2.jpg" />
      </>
    );
  }
}

export default Home;