import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Icon, SideNav, SideNavItem, Button, Modal, Row, Input } from "react-materialize";
import axios from "axios";
import "./style.css";

class Nav extends React.Component {

  state = {
    firstName: "",
    lastName: "",
    password1: "",
    password2: "",
    email: "",
    loginEmail: "",
    loginPassword: "",
    user: "",
    image: "",
    notifications: 0,
    onlineFriends: [],
    offlineFriends: [],
  }

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
      // else {
      //   this.setState({
      //     loginEmail: "",
      //     loginPassword: ""
      //   });
      // }
      // window.location.href = "/pro"
    }).catch((err) => {
      this.setState({
        errors: "Invalid email or password.."
      })
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

    let navbar;

    if (this.props.loginStatus) {
      navbar = (
        <>
          <Navbar brand='tripper' right>
            <NavLink to="/Friends" className="tooltipped" data-position="left" data-tooltip="Quick Search"><Icon className="navIcon">search</Icon></NavLink>
            <NavLink to="" data-activates="sidenav_3" className="tooltipped" data-position="left" data-tooltip="Chat"><Icon className="navIcon">chat</Icon></NavLink>
            <NavLink to="" className="tooltipped" data-position="left" data-tooltip="Notifications"><Icon className="navIcon">notifications</Icon></NavLink>
            <NavLink to="/Profile" className="tooltipped" data-position="left" data-tooltip="View Profile"><Icon className="navIcon">account_circle</Icon></NavLink>
          </Navbar>

          <Button floating fab="horizontal" icon="navigation" className="red" large style={{ bottom: "45px", right: "24px" }}>
            <Button floating icon="add" className="blue darken-4" data-position="top" tooltip="Create Journal" />
              <Input s={6} label="Name" validate defaultValue='Write your name here' />
            <Button floating icon="group" className="yellow darken-3" data-position="top" tooltip="Friends" />
            <Button floating icon="power_settings_new" className="red darken-1" data-position="top" tooltip="Logout" />
          </Button>
        </>
      );
    }
    else {
      navbar = (
        <Navbar id="navBarOut" brand='tripper' right>

          <Modal
            header='tripper Account Sign Up'
            trigger={<Button id="signUp" className="navBtn">Sign Up</Button>}
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
            trigger={<Button id="login" className="navBtn">Login</Button>}
            actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="loginBtn" onClick={this.handleLogin}>Login</Button></>}
          >
            <Row>
              <Input id="email" type="email" label="Email" s={12} onChange={this.handleInputChange} />
              <Input id="loginPassword" type="password" label="password" s={12} onChange={this.handleInputChange} />
            </Row>
          </Modal>

          {/* <Button id="signUp" className="navBtn">Sign Up</Button> */}
          {/* <Button id="login" className="navBtn">Login</Button> */}
        </Navbar>
      );
    }

    return (
      <>
        {navbar}

        <SideNav
          trigger={<span style={{ display: "none" }}></span>}
          options={{ closeOnClick: true, edge: "right" }}
        >
          <SideNavItem
            userView
            user={{
              background: "",
              image: "https://www.thefamouspeople.com/profiles/images/anderson-cooper-5.jpg",
              name: "Anderson Cooper",
              email: "andersoncooper@cnn.com"
            }}
          />
          <SideNavItem className="onlineHeader"><Icon className="icon-online">rss_feed</Icon>Online Friends</SideNavItem>
          <SideNavItem className="onlineFriend" onClick={() => this.props.startChat(true)}>Chris Cuomo <Icon className="icon-friend-online">lens</Icon></SideNavItem>
          <SideNavItem divider />
          <SideNavItem subheader>Offline Friends</SideNavItem>
          {/* <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>  */}
        </SideNav>
      </>
    );
  }
}

export default Nav;