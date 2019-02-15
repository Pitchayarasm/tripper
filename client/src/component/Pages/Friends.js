import React from "react";
import { Row, Col } from "react-materialize";
import axios from "axios";

class Friends extends React.Component {
    state = {
        friends: [],
        friendsHTML: [],
        friendsRecieved: false
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.user._id === undefined && nextProps.user._id) {
            this.axiosCall(nextProps.user._id);
        }
    }

    axiosCall = id => {
        axios.get(`friendList/${id}`)
            .then(res => {
                let i = 0;
                let friendsList = res.data[0].friends.map(item => {
                    i++;
                    let src = `/upload/${item.file}`;

                    return {
                        journalCount: item.journals.length,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        key: i,
                        profilePic: src
                    };
                });
                this.setState({ friends: friendsList });
            })
            .catch(err => console.log(err));
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.friends !== this.state.friends){
            this.loadFriends();
        }
    }

    loadFriends() {
        let html = [];

        for (let i = 0; i < Math.ceil(this.state.friends.length / 3); i++) {
            html.push(
                <Row className="FriendProfile">
                    <Col s={1} className='grid-example'></Col>
                    {this.generateRow(i, this.state.friends)}
                    <Col s={1} className='grid-example'></Col>
                </Row>
            );
        }
        this.setState({ friendsHTML: html });
    }

    generateRow(i, friendList) {
        let html = [];
        for (let j = 0; j < 3 && i * 3 + j < friendList.length; j++) {
            html.push(<Col s={3} className='grid-example'>
                <div className="SearchCard">
                    <img style={{width:"100%"}} src={friendList[3 * i + j].profilePic} alt="profile" />
                    <h3>{friendList[3 * i + j].firstName + " " + friendList[3 * i + j].lastName}</h3>
                    <p>Journals: {friendList[3 * i + j].journalCount}</p>
                </div>
            </Col>);
        }
        return html;
    }


    render() {
        return (
            <>
                {this.state.friendsHTML}
                <Col s={12} className='grid-example'>
                    <div className="SearchCard losFriends">
                        <h3>Looks like you don't have any friends, you need to add friends first</h3>
                        <p>Adventure is out there!</p>
                    </div>
                </Col>
            </>
        );
    }
}


export default Friends;