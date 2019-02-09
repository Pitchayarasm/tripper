import React from "react";
import {NavLink } from "react-router-dom";
import { Navbar, Icon, SideNav, SideNavItem } from 'react-materialize';
import "./NavStyles.css";

class Nav extends React.Component {

    state = {
        user: "",
        image: "",
        email: "",
        notifications: 0,
        onlineFriends: [],
        offlineFriends: []
    }

    render() {

        return (
            <>
                <Navbar brand='tripper' right>
                    <NavLink to="" className="tooltipped" data-position="left" data-tooltip="Quick Search"><Icon>search</Icon></NavLink>
                    <NavLink to="" data-activates="sidenav_0" className="tooltipped" data-position="left" data-tooltip="Chat"><Icon>chat</Icon></NavLink>
                    <NavLink to="" className="tooltipped" data-position="left" data-tooltip="Notifications"><Icon>notifications</Icon></NavLink>
                    <NavLink to="/profile" className="tooltipped" data-position="left" data-tooltip="View Profile"><Icon>person</Icon></NavLink>
                </Navbar>

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
                    <SideNavItem><Icon className="icon-online">rss_feed</Icon>Online Friends</SideNavItem>
                    {/* <SideNavItem href='#!second'>Second Link</SideNavItem> */}
                    <SideNavItem divider />
                    <SideNavItem subheader>Offline Friends</SideNavItem>
                    {/* <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>  */}
                </SideNav>
            </>
        );
    }
}

export default Nav;