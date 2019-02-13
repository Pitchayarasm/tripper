import React from "react";
import { Row, Col } from "react-materialize";

class FriendProfile extends React.Component {
    state = {

    };

    render() {
        return (
            <div>
                <Row className="FriendProfile">
                    <Col s={1} className='grid-example'></Col>
                    <Col s={3} className='grid-example'>
                        <div className="textBox">
                            <h2>About me</h2>
                            <p>Nisi cillum magna ipsum veniam laboris Lorem ipsum nostrud anim. Nulla mollit excepteur labore laboris exercitation fugiat minim aute anim do. Sint minim aliquip ullamco mollit reprehenderit tempor do anim aliqua mollit nostrud quis. Eu excepteur sit amet cupidatat nisi veniam consequat proident adipisicing et ea do excepteur.</p>
                            <p><strong>Sunt ipsum enim tempor officia est ut eiusmod proident nisi aute laboris.</strong></p>
                        </div>
                    </Col>
                    <Col s={6} className='grid-example run-flip'>
                        <div className="trigger">
                            <div class="flip-box">
                                <div class="flip-box-inner">
                                    <div class="flip-box-front">
                                        <img className="Pics" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                                    </div>
                                    <div class="flip-box-back">
                                        <img className="Pics" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ProfileCard trigger">
                            <h3>Chris Cuomo</h3>
                            <p>News anchor</p>
                        </div>
                        <div className="trigger">
                            <div class="flip-box">
                                <div class="flip-box-inner">
                                    <div class="flip-box-front">
                                        <img className="Pics" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                                    </div>
                                    <div class="flip-box-back">
                                        <img className="Pics" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                                    </div>
                                </div>
                            </div>
                        </div><div className="trigger">
                            <div class="flip-box">
                                <div class="flip-box-inner">
                                    <div class="flip-box-front">
                                        <img className="Pics" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                                    </div>
                                    <div class="flip-box-back">
                                        <img className="Pics" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                                    </div>
                                </div>
                            </div>
                        </div><div className="trigger">
                            <div class="flip-box">
                                <div class="flip-box-inner">
                                    <div class="flip-box-front">
                                        <img className="Pics" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                                    </div>
                                    <div class="flip-box-back">
                                        <img className="Pics" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                                    </div>
                                </div>
                            </div>
                        </div><div className="trigger">
                            <div class="flip-box">
                                <div class="flip-box-inner">
                                    <div class="flip-box-front">
                                        <img className="Pics" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                                    </div>
                                    <div class="flip-box-back">
                                        <img className="Pics" src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Col>
                    <Col s={1} className='grid-example'></Col>
                    <Col s={1} className='grid-example'></Col>
                </Row>


            </div>
        );
    }
}


export default FriendProfile;