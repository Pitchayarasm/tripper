import React from "react";
import axios from "axios";
import { Row, Col } from "react-materialize";

class Friends extends React.Component {
    state = {
    };

    componentDidMount() {
        if (this.props.user) {
            console.log(this.props.user)
            this.setState({
                user: this.props.user
            }, this.loadFriends());
        }
    }

    loadFriends() {
        //the following line is meant to get the list of the user's friends
        let friendList = axios.get({ user: this.props.user._id }).friends;

        let html = <></>;

        for (let i = 0; i < Math.ceil(friendList / 3); i++) {
            //if we want to cap at a certain number of friends, or make pages of friends, we can change the second part of the conditional to read:
            // i * 3 + j < (maxValue)
            html += (<Row className="FriendProfile">
                <Col s={1} className='grid-example'></Col>
                {this.generateRow(i, friendList)}
                <Col s={1} className='grid-example'></Col>
            </Row>);
        }
        return html;
    }

    generateRow(i, friendList) {
        let html = <></>;
        for (let j = 0; j < 3 && i * 3 + j < friendList.length; j++) {
            html += (<Col s={3} className='grid-example'>
                <div className="SearchCard">
                    <img className="Friend" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                    <h3>{friendList[i].firstName + " " + friendList[i].lastName}</h3>
                    <p>Number of Journals {friendList[i].journals.length}</p>
                </div>
            </Col>);
        }
        return html;
    }


    render() {
        return (
            <>
                <Row className="FriendProfile">
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
                </Row>
            </> 
        );
    }
}


export default Friends;