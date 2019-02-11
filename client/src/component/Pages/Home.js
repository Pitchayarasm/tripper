import React from "react";
import { Row, Input, Modal, Button, Parallax } from "react-materialize";
import axios from "axios";
import "./home.css"
class Home extends React.Component {
  state = {
    //user: [],
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    loginEmail: "",
    loginPassword: ""
  }

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
      alert("Unable to create account");
    });
  }

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
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <div>

          <Parallax imageSrc="http://materializecss.com/images/parallax1.jpg" />
          <div className="section white">
            <div className="row container">
              <h2 className="header">Tripper</h2>
              <p className="grey-text text-darken-3 lighten-3">Tripper is social network for adventurous travelers, join if you dare to tell your story:</p>

              <Modal
                header='Modal Header'
                trigger={<Button>Sign up</Button>}>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    this.handleSignUp()
                  }}
                >
                  <Row>
                    <Input placeholder s={6} label="First Name" name="firstName" onChange={this.handleInputChange} />
                    <Input s={6} label="Last Name" name="lastName" onChange={this.handleInputChange} />
                    <Input type="email" label="Email" s={12} name="email" onChange={this.handleInputChange} />
                    <Input type="password" label="password" s={12} name="password" onChange={this.handleInputChange} />
                    <Button type="button" type="submit" onClick={this.handleSignUp}>Sign Up</Button>
                  </Row>
                </form>
              </Modal>
              <Modal
                header='Modal Header'
                trigger={<Button>Log in</Button>}>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    this.handleSignUp()
                  }}
                >
                  <Row>
                    <Input type="email" label="Email" s={12} name="loginEmail" onChange={this.handleInputChange} />
                    <Input type="password" label="password" s={12} name="loginPassword" onChange={this.handleInputChange} />
                    <Button type="button" type="submit" onClick={this.handleLogin}>Log In</Button>
                  </Row>
                </form>
              </Modal>
            </div>
          </div>
          <Parallax imageSrc="http://materializecss.com/images/parallax2.jpg" />

        </div>


      </div>
    );
  }
}
export default Home;