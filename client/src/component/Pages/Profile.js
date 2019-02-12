import React from "react";
import { Row, Col, Button } from "react-materialize";

class Profile extends React.Component {
    state = {
        user: null
    };
    
    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <Row className="FriendProfile">
                    <Col s={1} className='grid-example'></Col>
                    <Col s={4} className='grid-example'>
                        <img className="Friend" src="https://via.placeholder.com/465x718/666.png/fff" alt="tripper" />

                    </Col>
                    <Col s={3} className='grid-example'>
                        <img className="Friend" src="https://via.placeholder.com/346/666.png/fff" alt="tripper" />
                        <div className="textBox">
                        <h2>The moon is great!</h2>
                        <p>Quis occaecat consequat quis pariatur reprehenderit. Laboris nulla non irure sint et irure do commodo. Enim proident ex ut non do adipisicing reprehenderit laboris veniam exercitation ad eu deserunt et.</p>
                        </div>
                    </Col>


                    <Col s={3} className='grid-example'>
                    <div className="textBox">
                        <h2>Anderson Cooper</h2>
                        <p>Quis occaecat consequat quis pariatur reprehenderit. Laboris nulla non irure sint et irure do commodo. Enim proident ex ut non do adipisicing reprehenderit laboris veniam exercitation ad eu deserunt et.</p>
                        <Button>Journal</Button>
                        <img className="Friend" src="https://via.placeholder.com/346/666.png/fff" alt="tripper" />
                        </div>

                    </Col>
                    <Col s={1} className='grid-example'></Col>

                </Row>


            </div>
        );
    }
}


export default Profile;