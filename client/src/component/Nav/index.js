import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Icon, SideNav, SideNavItem, Button } from "react-materialize";
import "./style.css";

class Nav extends React.Component {

    state = {
        loggedIn: false,
        user: "",
        image: "",
        email: "",
        notifications: 0,
        onlineFriends: [],
        offlineFriends: []
    }

    render() {

        let navbar;

        if (this.state.loggedIn) {
            navbar = (
                <Navbar brand='tripper' right>
                    <NavLink to="" className="tooltipped" data-position="left" data-tooltip="Quick Search"><Icon className="navIcon">search</Icon></NavLink>
                    <NavLink to="" data-activates="sidenav_0" className="tooltipped" data-position="left" data-tooltip="Chat"><Icon className="navIcon">chat</Icon></NavLink>
                    <NavLink to="" className="tooltipped" data-position="left" data-tooltip="Notifications"><Icon className="navIcon">notifications</Icon></NavLink>
                    <NavLink to="/profile" className="tooltipped" data-position="left" data-tooltip="View Profile"><Icon className="navIcon">account_circle</Icon></NavLink>
                </Navbar>
            );
        }
        else {
            navbar = (
                <Navbar id="navBarOut" brand='tripper' right>
                    <Button id="signUp" className="navBtn">Sign Up</Button>
                    <Button id="login" className="navBtn">Login</Button>
                </Navbar>
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