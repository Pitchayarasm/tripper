import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Icon, SideNav, SideNavItem, Button, Modal, Row, Input } from "react-materialize";
import axios from "axios";
import "./style.css";

class Nav extends React.Component {

    state = {
        user: "",
        image: "",
        notifications: 0,
        onlineFriends: [],
        offlineFriends: [],
    }

    friendsPage = () => {
        window.location.href = "/friends"
    }
    
    handleLogout = () => {
      axios.get("/logout")
      .then( (res) => {
        this.props.setUser(res.data);
        window.location.href = "/"
      })
    }
    
    render() {

        let navbar;

        if (this.props.user) {
            navbar = (
                <>
                <Navbar brand='tripper' right>
                    <NavLink to="" className="tooltipped" data-position="left" data-tooltip="Quick Search"><Icon className="navIcon">search</Icon></NavLink>
                    <NavLink to="" data-activates="sidenav_3" className="tooltipped" data-position="left" data-tooltip="Chat"><Icon className="navIcon">chat</Icon></NavLink>
                    <NavLink to="" className="tooltipped" data-position="left" data-tooltip="Notifications"><Icon className="navIcon">notifications</Icon></NavLink>
                    <NavLink to="/Profile" className="tooltipped" data-position="left" data-tooltip="View Profile"><Icon className="navIcon">account_circle</Icon></NavLink>
                </Navbar>

                <Button floating fab="horizontal" icon="navigation" className="red" large style={{bottom: "45px", right: "24px"}}>
                    <Button floating icon="add" className="blue darken-4" data-position="top" tooltip="Create Journal"/>
                    <Button floating icon="group" className="yellow darken-3" data-position="top" onClick={this.friendsPage} tooltip="Friends"/>
                    <Button floating icon="power_settings_new" className="red darken-1" onClick={this.handleLogout} data-position="top" tooltip="Logout"/>
                </Button>
                </>
            );
        }
         else {
             navbar = (
                 <Navbar id="navBarOut" brand='tripper' right></Navbar>
             );
         }

        return (
            <>
                {navbar}

                <SideNav
                    trigger={<span style={{display: "none"}}></span>}
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