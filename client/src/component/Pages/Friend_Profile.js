import React from "react";
import { Row, Col } from "react-materialize";

class FriendProfile extends React.Component {
    state = {

    };

    render() {
        return (
            <div className="wrapper">
                <Row className="FriendProfile">
                    <Col s={1} className='grid-example'></Col>
                    <Col s={3} className='grid-example'>
                        <div className="textBox">
                            <h2>About me</h2>
                            <p>Christopher Charles Cuomo (/ˈkwoʊmoʊ/; born August 9, 1970) is an American television journalist who currently works at CNN, where he presents Cuomo Prime Time, a regular weeknight CNN show.

Cuomo has previously been the ABC News chief law and justice correspondent and the co-anchor for ABC's 20/20., and before his current show, he was one of two co-anchors of the weekday edition of New Day, a three-hour morning news show, until May 24, 2018.</p>
                            <p><strong>Cuomo was born in the New York City borough of Queens.</strong></p>
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
                            <p>Television journalist</p>
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