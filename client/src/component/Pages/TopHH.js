import React from "react";
import { Row, Col, Card, CardTitle, Icon } from "react-materialize";

class Top extends React.Component {
    state = {
        user: null
    };
    
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("user"));
        this.setState({user});
    }


    render() {
        return (
            <div>
                <Row>
                    <Col s={1} className='grid-example'></Col>
                    <Col s={3} className='grid-example'>
                        <Card header={<CardTitle reveal image={"https://via.placeholder.com/346/666.png/fff"} waves='light' />}
                            title="The moon"
                            reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
                            <span><Icon tiny>favorite</Icon>0<Icon tiny>textsms</Icon>0</span>
                        </Card>
                    </Col>
                    <Col s={3} className='grid-example'>
                        <Card header={<CardTitle reveal image={"https://via.placeholder.com/346/666.png/fff"} waves='light' />}
                            title="Antarctica"
                            reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
                            <span><Icon tiny>favorite</Icon>0<Icon tiny>textsms</Icon>0</span>
                        </Card>
                    </Col>
                    <Col s={3} className='grid-example'>
                        <Card header={<CardTitle reveal image={"https://via.placeholder.com/346/666.png/fff"} waves='light' />}
                            title="Acapulco"
                            reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
                            <span><Icon tiny>favorite</Icon>0<Icon tiny>textsms</Icon>0</span>
                        </Card>
                    </Col>
                </Row>


            </div>
        );
    }
}


export default Top;