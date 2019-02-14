import React from "react";
// import { NavLink } from "react-router-dom";
import { Navbar, Icon, SideNav, SideNavItem, Button, Modal, Input } from "react-materialize";
import axios from "axios";
import "./style.css";

class Nav extends React.Component {

    state = {
        title: "",
        user: "",
        image: "",
        notifications: 0,
        onlineFriends: ["Chris Cuomo", "Don Lemon", "Van Jones"],
        offlineFriends: ["Jake Tapper", "Wolf Blitzer"]
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
            this.props.setUser(res.data);
            this.setState({ 
                title: "" 
            });
        });
    }

    friendsPage = () => {
        window.location.href = "/friends"
    }
    
    entryPage = () => {
        window.location.href = "/entry"
    }

    entriesPage = () => {
        window.location.href = "/entries"
    }

    profilePage = () => {
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
                        {/* <div class="nav-wrapper"> */}
                        <form>
                            <div class="input-field" style={{width: "200px"}}>
                            <input id="search" type="search" placeholder="Quick Search" required />
                            <label class="label-icon" for="search" style={{top: "-10px"}}><i class="material-icons">search</i></label>
                            {/* <i class="material-icons">close</i> */}
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
                    trigger={<Button id="newJournal" floating icon="add" className="blue darken-4" data-position="left" tooltip="Create Journal" />}
                    actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="loginBtn" className="cancel modal-action modal-close" onClick={this.newJournal}>Create</Button></>}
                    modalOptions={{ dismissible: true }}>
                    <Input s={6} id="title" label="Title" value={this.state.title} onChange={this.handleInputChange}><Icon>account_circle</Icon></Input>
                </Modal>

                <Button floating fab="horizontal" icon="navigation" className="red" large style={{bottom: "45px", right: "24px"}}>
                    <Button floating icon="account_circle" className="green darken-3" data-position="top" tooltip="Profile" onClick={this.profilePage} />
                    <Button floating icon="local_library" className="blue darken-4" data-position="top" tooltip="Journal" onClick={this.entryPage} />
                    <Button floating icon="card_travel" className="yellow darken-3" data-position="top" tooltip="Entries" onClick={this.entriesPage} />
                    <Button floating icon="group" className="purple darken-2" data-position="top" tooltip="Friends" onClick={this.friendsPage}/>
                    <Button floating icon="power_settings_new" className="red darken-1" onClick={this.handleLogout} data-position="top" tooltip="Logout"/>
                </Button>

                <SideNav
                    trigger={<Button icon="chat" className={this.props.chat.notification ? "myChatBtn btn-large red darken-1" : "myChatBtn btn-large"} data-position="top" tooltip="Chat"></Button>}
                    options={{ closeOnClick: true, edge: "right" }}>
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
                    {this.state.onlineFriends.map((item) => {
                        return <SideNavItem className="onlineFriend" waves="light" onClick={() => this.props.startChat(true, item)}>{item} <Icon className="icon-friend-online">lens</Icon></SideNavItem>
                    })}
                    <SideNavItem divider />
                    <SideNavItem subheader>Offline Friends</SideNavItem>
                    {this.state.offlineFriends.map((item) => {
                        return <li className="offlineFriend">{item}</li> 
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