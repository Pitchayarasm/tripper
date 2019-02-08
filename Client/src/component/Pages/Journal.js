import React from "react";
import {Row, Col, Button } from "react-materialize";
import "./home.css";

class Journal extends React.Component {
    state = {
        user: []
    };


    render() {
        return (
            <div>
                <Row>
                <Col s={3} className='grid-example'></Col>
                <Col s={3} className='grid-example'>

                    <h2>My trip to the fridge.</h2>
                    <p>Quis occaecat consequat quis pariatur reprehenderit. Laboris nulla non irure sint et irure do commodo. Enim proident ex ut non do adipisicing reprehenderit laboris veniam exercitation ad eu deserunt et.
<br /><br />
                        Exercitation cupidatat ad laboris voluptate dolor ex eiusmod. Qui eiusmod velit eu est deserunt duis consequat. Enim est cupidatat cupidatat commodo sunt laborum sint.
<br /><br />
                        Qui dolor nostrud sunt occaecat dolor commodo consequat exercitation voluptate Lorem. Sint laborum elit ut voluptate in anim cillum duis adipisicing consequat amet adipisicing et ex. Magna occaecat est nulla nostrud tempor nisi sint cillum est eu mollit do.</p>
                        <Button>Edit</Button>
                        </Col>
                        
                        
                        <Col s={4} className='journal_pics'>
                        <img className="fit_img" src="https://via.placeholder.com/150/666.png/fff" alt="tripper"/>
                        <img className="fit_img" src="https://via.placeholder.com/300x150/666.png/fff" alt="tripper"/>
                        <img className="fit_img" src="https://via.placeholder.com/150x300/666.png/fff" alt="tripper"/>
                        <img className="fit_img" src="https://via.placeholder.com/150/666.png/fff" alt="tripper"/>
                        <img className="fit_img" src="https://via.placeholder.com/150/666.png/fff" alt="tripper"/>
                        <img className="fit_img" src="https://via.placeholder.com/150/666.png/fff" alt="tripper"/>
                        <img className="fit_img" src="https://via.placeholder.com/150/666.png/fff" alt="tripper"/>

                        </Col>
                        <Col s={2} className='grid-example'></Col>

                    </Row>

                
            </div>
        );
    }
}


export default Journal;
