import React from "react";
// import { NavLink } from "react-router-dom";
import { Navbar, Icon, SideNav, SideNavItem, Button, Modal, Input } from "react-materialize";
import axios from "axios";

class Nav extends React.Component {

    state = {
        title: "",
        user: "",
        image: "",
        notifications: 0,
        onlineFriends: [],
        offlineFriends: []
    }

    handleInputChange = (event) => {
        this.setState({
            title: event.target.value
        });
    };


    newJournal = () => {
        axios.post(`/journal/${this.props.user._id}` , { 
            name: this.state.title 
        })
        .then(res => {
            this.props.getFriends(this.props.user._id)
            this.props.setUser(res.data);
            this.setState({ 
                title: "" 
            });
        });
    }

    friendsPage = () => {
        this.props.getFriends(this.props.user._id)
        window.location.href = "/friends"
    }
    
    entryPage = () => {
        this.props.getFriends(this.props.user._id)
        window.location.href = "/entry"
    }

    entriesPage = () => {
        this.props.getFriends(this.props.user._id)
        window.location.href = "/entries"
    }

    profilePage = () => {
        this.props.getFriends(this.props.user._id)
        window.location.href = "/profile"
    }

    handleLogout = () => {
        axios.get("/logout")
            .then((res) => {
                this.props.setUser(res.data);
                window.location.href = "/"
            });
    }

    render() {
        let navbar;
        if (this.props.user._id) {
            navbar = (
                <>
                <Navbar brand='tripper' right>
                    <nav style={{boxShadow: "none"}}>
                        {/* <div className="nav-wrapper"> */}
                        <form>
                            <div className="input-field" style={{width: "200px"}}>
                            <input id="search" type="search" placeholder="Quick Search" required />
                            <label className="label-icon" htmlFor="search" style={{top: "-10px"}}><i className="material-icons">search</i></label>
                            {/* <i className="material-icons">close</i> */}
                            </div>
                        </form>
                        {/* </div> */}
                    </nav>
                    {/* <NavLink to="#" data-position="left" tooltip="Quick Search"><Icon className="navIcon">search</Icon></NavLink> */}
                    {/* <NavLink to="#" data-position="left" tooltip="Notifications"><Icon className="navIcon">notifications</Icon></NavLink> */}
                    {/* <NavLink onClick={this.profilePage} to="#" data-position="left" tooltip="View Profile"><Icon className="navIcon">account_circle</Icon></NavLink> */}
                </Navbar>

                <Modal
                    header='Title'
                    trigger={<Button id="newJournal" floating icon="add" className="blue darken-4 pulse" data-position="left" tooltip="Create Journal" />}
                    actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="loginBtn" className="cancel modal-action modal-close" onClick={this.newJournal}>Create</Button></>}
                    modalOptions={{ dismissible: true }}>
                    <Input s={6} id="title" label="Title" value={this.state.title} onChange={this.handleInputChange}><Icon>account_circle</Icon></Input>
                </Modal>

                <Button floating fab="horizontal" icon="navigation" className="blue darken-4 pulse" large style={{bottom: "45px", right: "24px"}}>
                    <Button floating icon="account_circle" className="green darken-3" data-position="top" tooltip="Profile" onClick={this.profilePage} />
                    <Button floating icon="local_library" className="blue darken-2" data-position="top" tooltip="Journal" onClick={this.entryPage} />
                    <Button floating icon="card_travel" className="yellow darken-3" data-position="top" tooltip="Entries" onClick={this.entriesPage} />
                    <Button floating icon="group" className="purple darken-2" data-position="top" tooltip="Friends" onClick={this.friendsPage}/>
                    <Button floating icon="power_settings_new" className="red darken-1" onClick={this.handleLogout} data-position="top" tooltip="Logout"/>
                </Button>

                <SideNav
                    trigger={<Button icon="chat" onClick={() => this.props.getFriends(this.props.user._id)} className={this.props.chat.notification ? "myChatBtn btn-large yellow darken-3" : "myChatBtn btn-large blue darken-4"} data-position="top" tooltip="Chat"></Button>}
                    options={{ closeOnClick: true, edge: "right" }}
                    >
                    <SideNavItem
                        userView
                        user={{
                            background: "",
                            image: `/upload/${this.props.user.file}`,
                            name: `${this.props.user.firstName} ${this.props.user.lastName}`,
                            email: `${this.props.user.email}`
                        }}
                    />
                    <SideNavItem className="onlineHeader"><Icon className="icon-online">rss_feed</Icon>Online Friends</SideNavItem>
                    {this.props.nav.onlineFriends.map((item) => {
                        return <SideNavItem className="onlineFriend" waves onClick={() => this.props.startChat(true, item.id)}>{item.name} <Icon className="icon-friend-online">lens</Icon></SideNavItem>
                    })}
                    <SideNavItem divider />
                    <SideNavItem subheader>Offline Friends</SideNavItem>
                    {this.props.nav.offlineFriends.map((item) => {
                        return <li className="offlineFriend">{item.name}</li> 
                    })}
                </SideNav>
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
            </>
        );
    }
}

export default Nav;