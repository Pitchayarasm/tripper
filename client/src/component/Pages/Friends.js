import React from "react";
import { Row, Col } from "react-materialize";
import axios from "axios";

class Friends extends React.Component {

    componentDidMount() {
        if (this.props.user._id) {
            console.log(this.props.user._id)
            this.getFriend(this.props.user._id);
        }
    }
    getFriend = (id) => {
        axios.get(`/friendList/${id}`)
        .then( res => {
            console.log(res)
        })
    }

    // loadFriends() {
    //     let html = [];

    //     for (let i = 0; i < Math.ceil(this.state.friends.length / 3); i++) {
    //         //if we want to cap at a certain number of friends, or make pages of friends, we can change the second part of the conditional to read:
    //         // i * 3 + j < (maxValue)
    //         html.push(
    //             <Row className="FriendProfile">
    //                 <Col s={1} className='grid-example'></Col>
    //                 {this.generateRow(i, this.state.friends)}
    //                 <Col s={1} className='grid-example'></Col>
    //             </Row>
    //         );
    //     }

    //     this.setState({ friendsHTML: html });
    // }

    // generateRow(i, friendList) {
    //     let html = [];
    //     for (let j = 0; j < 3 && i * 3 + j < friendList.length; j++) {
    //         html.push(<Col s={3} className='grid-example'>
    //             <div className="SearchCard">
    //                 {/* <img className="Friend" src={friendList[3 * i + j].profilePic} alt="tripper" /> */}
    //                 <h3>{friendList[3 * i + j].firstName + " " + friendList[3 * i + j].lastName}</h3>
    //                 <p>Journals: {friendList[3 * i + j].journalCount}</p>
    //             </div>
    //         </Col>);
    //     }
    //     return html;
    // }


    render() {
        return (
            <>
                {/* {this.state.friendsHTML} */}
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