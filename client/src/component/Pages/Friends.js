import React from "react";
import { Row, Col, Card, CardTitle } from "react-materialize";

class Friends extends React.Component {
    state = {
        user: []
    };


    render() {
        return (
            <div>
                <Row className="FriendProfile">
                    <Col s={1} className='grid-example'></Col>
                    <Col s={3} className='grid-example'>
                        <Card className='small'
                            header={<CardTitle image='https://via.placeholder.com/800/666.png/fff'>Anderson Cooper</CardTitle>}
                            actions={[<a href='#'>See profile</a>]}>News anchor @ CNN</Card>
                    </Col>
                    <Col s={3} className='grid-example'>
                        <div className="SearchCard">
                            <img className="Friend" src="https://via.placeholder.com/346/666.png/fff" alt="tripper" />
                            <h3>Mr. Nobody</h3>
                            <p>CEO & Director</p>
                        </div></Col>
                    <Col s={3} className='grid-example'>
                        <div className="SearchCard">
                            <img className="Friend" src="https://via.placeholder.com/346/666.png/fff" alt="tripper" />
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
                            <img className="Friend" src="https://via.placeholder.com/346/666.png/fff" alt="tripper" />
                            <h3>Mr. Nobody</h3>
                            <p>CEO & Director</p>
                        </div></Col>
                    <Col s={3} className='grid-example'>
                        <div className="SearchCard">
                            <img className="Friend" src="https://via.placeholder.com/346/666.png/fff" alt="tripper" />
                            <h3>Mr. Nobody</h3>
                            <p>CEO & Director</p>
                        </div></Col>
                    <Col s={3} className='grid-example'>
                        <div className="SearchCard">
                            <img className="Friend" src="https://via.placeholder.com/346/666.png/fff" alt="tripper" />
                            <h3>Mr. Nobody</h3>
                            <p>CEO & Director</p>
                        </div>
                    </Col>
                    <Col s={1} className='grid-example'></Col>
                </Row>


            </div>
        );
    }
}


export default Friends;