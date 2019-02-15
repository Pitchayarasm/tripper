import React from "react";
import { Row, Input, Modal, Button, Parallax, Col, Toast } from "react-materialize";
import { Redirect } from "react-router-dom"
import axios from "axios";

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

  handleSignUp = () => {
    if (this.state.firstName && this.state.lastName && this.state.email && this.state.password1) {
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
            email: ""
          });
          this.props.history.push("/")
        }).catch((err) => {
          console.log(err)
        });
      }
      else
        alert("Passwords do not match!");
    } else {
      alert("Please make sure you have filled out all fields!");
    }
  };

  handleLogin = (e) => {
    e.preventDefault();
    axios.post("/login", {
      email: this.state.loginEmail,
      password: this.state.loginPassword
    }).then(res => {
      if (res.statusText === "OK") {
        this.props.setUser(res.data);
        this.props.history.push("/profile")
      }
    }).catch((err) => {
      alert("Invalid email or password..")
    });
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.id;
    this.setState({
      [name]: value
    });
  };

  render() {
    if ( this.props.user.firstName) {
      return < Redirect to="/profile" />
    }

    return (
      <>
      <Row>
        <Col s={12} className='grid-example'>
          <div>
            <Parallax imageSrc="http://materializecss.com/images/parallax1.jpg" />
            <div className="section white">
              <div className="row container btnContainer">
                <h2 className="header">tripper</h2>
                <p className="grey-text text-darken-3 lighten-3">Tripper is a social network for adventorous travelers. Sign up and start telling your story!</p>
                <br />

                <Modal
                  header='tripper Account Sign Up'
                  trigger={<Button className="homeBtn">Sign Up</Button>}
                  actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="signUpSubmit" className="cancel modal-action modal-close" onClick={this.handleSignUp}>Submit</Button></>}
                >
                  <Row id="signUpForm">
                    <Input id="firstName" value={this.state.firstName} s={5} label="First Name" onChange={this.handleInputChange} />
                    <Input id="lastName" value={this.state.lastName} s={6} label="Last Name" onChange={this.handleInputChange} />
                    <Input id="email" value={this.state.email} type="email" label="Email" s={12} onChange={this.handleInputChange} />
                    <Input id="password1" value={this.state.password1} type="password" label="password" s={12} onChange={this.handleInputChange} />
                    <Input id="password2" value={this.state.password2} type="password" label="confirm password" s={12} onChange={this.handleInputChange} />
                  </Row>
                </Modal>

                <Modal
                  header='tripper Login'
                  trigger={<Button className="homeBtn">Login</Button>}
                  actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="loginBtn" className="cancel modal-action modal-close" onClick={this.handleLogin}>Login</Button></>}
                >
                  <Row>
                    <Input id="loginEmail" value={this.state.loginEmail} type="email" label="Email" s={12} onChange={this.handleInputChange} />
                    <Input id="loginPassword" value={this.state.loginPassword} type="password" label="password" s={12} onChange={this.handleInputChange} />
                    {/* {this.state.err ? <Toast >{this.state.err}</Toast> : null} */}
                  </Row>
                </Modal>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div className="section white"></div>
      </>
    );
  }
}

export default Home;

