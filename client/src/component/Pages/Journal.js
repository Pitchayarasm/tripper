import React from "react";
import { Row, Col, Icon, Button, Modal, Input } from "react-materialize";

class Journal extends React.Component {
    state = {
        entryTitle: "",
        entryText: ""
    };

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.id;

        this.setState({
            [name]: value
        });
    };

    makeNewEntry = () => {
        //not sure how to access id for user, journal, or entry, but i think those will be necessary for making distinctions
        // router.post("/journal/:userID/:journalID/:entryID", {
        //     entryTitle: this.state.entryTitle,
        //     entryText: this.state.entryText
        // }).catch(err => {
        //     console.log(err);
        // });

        this.setState({
            entryText: "",
            entryTitle: ""
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col s={3} className='grid-example'></Col>
                    <Col s={3} className='grid-example'>

                        <h2>My trip to the fridge. <span id="editBtn"><Icon>edit</Icon></span></h2>
                        <hr />
                        <p>Quis occaecat consequat quis pariatur reprehenderit. Laboris nulla non irure sint et irure do commodo. Enim proident ex ut non do adipisicing reprehenderit laboris veniam exercitation ad eu deserunt et.
                        <br /><br />
                            Exercitation cupidatat ad laboris voluptate dolor ex eiusmod. Qui eiusmod velit eu est deserunt duis consequat. Enim est cupidatat cupidatat commodo sunt laborum sint.
                        <br /><br />
                            Qui dolor nostrud sunt occaecat dolor commodo consequat exercitation voluptate Lorem. Sint laborum elit ut voluptate in anim cillum duis adipisicing consequat amet adipisicing et ex. Magna occaecat est nulla nostrud tempor nisi sint cillum est eu mollit do.</p>
                            <Modal
                            header='Modal Header'
                            trigger={<Button waves='light'>Edit<Icon right>insert_chart</Icon></Button>}>
                            <Input type='title' />

                            <Input type='textarea' />

                        </Modal>

                    </Col>


                    <Col s={4} className='journal_pics'>
                    <img className="fit_img tile" src="https://via.placeholder.com/150/666.png/fff" alt="tripper" />                        
                        <img className="fit_img tile" src="https://via.placeholder.com/300x150/666.png/fff" alt="tripper" />
                        <img className="fit_img tile" src="https://via.placeholder.com/150x300/666.png/fff" alt="tripper" />
                        <img className="fit_img tile" src="https://via.placeholder.com/150/666.png/fff" alt="tripper" />
                        <img className="fit_img tile" src="https://via.placeholder.com/150/666.png/fff" alt="tripper" />
                        <img className="fit_img tile" src="https://via.placeholder.com/150/666.png/fff" alt="tripper" />
                        <img className="fit_img tile" src="https://via.placeholder.com/150/666.png/fff" alt="tripper" />
                        <Modal
                            header='Modal Header'
                            trigger={<Button waves='light'>Add<Icon right>insert_chart</Icon></Button>}>
                            <Row id="addNewEntryForm">
                                <Input type='title' id="entryTitle" onChange={this.handleInputChange} />

                                <Input type='textarea' id="entryText" onChange={this.handleInputChange} />

                                <Button id="newEntryConfirm" onClick={this.makeNewEntry} />
                            </Row>
                        </Modal>

                    </Col>
                    <Col s={2} className='grid-example'></Col>
                </Row>
            </div>
        );
    }
}


export default Journal;