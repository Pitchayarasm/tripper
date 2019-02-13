import React from "react";
import { Row, Col } from "react-materialize";

class Friends extends React.Component {
    state = {
        user: null
    };

    componentDidMount() {
        if (this.props.user) {
            console.log(this.props.user)
            this.setState({
                user : this.props.user
            })
          }
    }


    render() {
        return (
            <>
                <Row className="FriendProfile">
                    <Col s={1} className='grid-example'></Col>
                    <Col s={3} className='grid-example'>
                    <div className="SearchCard">
                            <img src="https://via.placeholder.com/200/666.png/fff" alt="tripper" />
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