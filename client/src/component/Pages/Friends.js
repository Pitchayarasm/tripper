import React from "react";
import { Row, Col } from "react-materialize";
import axios from "axios";

class Friends extends React.Component {
    state = {
        friends: [
            {
                firstName: "Anderson",
                lastName: "Cooper",
                profilePics: ["https://timenewsfeed.files.wordpress.com/2012/07/anderson1.jpg?w=600&h=400&crop=1"],
                journals: [0, 1]
            },
            {
                firstName: "Chris",
                lastName: "Cuomo",
                profilePics: ["https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0MTgyMjI1MDAzMjkxOTg0/chris-cuomo-attends-the-2017-turner-upfront-at-madison-square-garden-on-may-17-2017-in-new-york-city-photo-by-daniel-zuchnikwireimage-square.jpg"],
                journals: [0]
            }
        ],
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
            //if we want to cap at a certain number of friends, or make pages of friends, we can change the second part of the conditional to read:
            // i * 3 + j < (maxValue)
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
                {/* <Row className="FriendProfile">
                    <Col s={1} className='grid-example'></Col>
                    <Col s={3} className='grid-example'>
                        <div className="SearchCard">
                            <img className="Friend" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                            <h3>Mr. Nobody</h3>
                            <p>CEO & Director</p>
                        </div>
                    </Col>
                    <Col s={3} className='grid-example'>
                        <div className="SearchCard">
                            <img className="Friend" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                            <h3>Mr. Nobody</h3>
                            <p>CEO & Director</p>
                        </div></Col>
                    <Col s={3} className='grid-example'>
                        <div className="SearchCard">
                            <img className="Friend" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                            <h3>Mr. Nobody</h3>
                            <p>CEO & Director</p>
                        </div>
                    </Col>
                    <Col s={1} className='grid-example'></Col>
                </Row>
                <Row className="FriendProfile">
                    <Col s={1} className='grid-example'></Col>
                    <Col s={3} className='grid-example'>
                        <div className="SearchCard">
                            <img className="Friend" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                            <h3>Mr. Nobody</h3>
                            <p>CEO & Director</p>
                        </div></Col>
                    <Col s={3} className='grid-example'>
                        <div className="SearchCard">
                            <img className="Friend" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                            <h3>Mr. Nobody</h3>
                            <p>CEO & Director</p>
                        </div></Col>
                    <Col s={3} className='grid-example'>
                        <div className="SearchCard">
                            <img className="Friend" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                            <h3>Mr. Nobody</h3>
                            <p>CEO & Director</p>
                        </div>
                    </Col>
                    <Col s={1} className='grid-example'></Col>
                </Row> */}
            </>
        );
    }
}


export default Friends;