import React from "react";
import { Row, Col, Icon, Button, Modal, Input } from "react-materialize";
import axios from "axios";
import "./journal.css";

class Journal extends React.Component {
    state = {
        entryTitle: "",
        entryText: "",
        entryChange: "",
        titleChage: "",
        user: null
    };

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("user"));
        this.setState({user});
    }
    
    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.id;

        this.setState({
            [name]: value
        });
    };

    makeNewEntry = () => {
        //not sure how to access id for user, journal, or entry, but i think those will be necessary for making distinctions
        axios.post(`/journal/:userID/:journalID/:entryID`, {
            entryTitle: this.state.entryTitle,
            entryText: this.state.entryText
        }).catch(err => {
            console.log(err);
        });

        this.setState({
            entryText: "",
            entryTitle: "",
            entryChange: "",
            titleChage: ""
        });
    }

    updateEntry = () => {
        //not sure how to access id for user, journal, or entry, but i think those will be necessary for making distinctions
        axios.post("/journal/:userID/:journalID/:entryID", {
            entryTitle: this.state.entryTitle,
            entryText: this.state.entryText
        }).catch(err => {
            console.log(err);
        });

        this.setState({
            entryText: "",
            entryTitle: "",
            entryChange: "",
            titleChage: ""
        });
    }    

    render() {
        return (
            <div>
                <Row className="journalEntry" style={{position: "relative"}}>
                    <Col s={3} className="grid-example"></Col>
                    <Col s={3} className="grid-example">

                        <h2 className="entryTitle">My trip to the fridge.
                            <Modal
                                header="Edit Journal Entry"
                                trigger={<span id="editBtn"><Icon>edit</Icon></span>}
                                actions={<><Button className="cancel modal-action modal-close tripperBtn">Cancel</Button><Button id="newEntryConfirm" className="cancel tripperBtn" onClick={this.updateEntry}>Update Entry</Button></>}>
                                <Row id="updateEntryForm">
                                    <Input id="titleChange" label="Entry Title" value={this.state.titleChage} onChange={this.handleInputChange} type="title" />
                                    <Input id="entryChange" label="Entry Content" value={this.state.entryChange} onChange={this.handleInputChange} type="textarea" />
                                </Row>
                            </Modal>
                        </h2>

                        <hr />
                        <p>Quis occaecat consequat quis pariatur reprehenderit. Laboris nulla non irure sint et irure do commodo. Enim proident ex ut non do adipisicing reprehenderit laboris veniam exercitation ad eu deserunt et.
                        <br /><br />
                            Exercitation cupidatat ad laboris voluptate dolor ex eiusmod. Qui eiusmod velit eu est deserunt duis consequat. Enim est cupidatat cupidatat commodo sunt laborum sint.
                        <br /><br />
                            Qui dolor nostrud sunt occaecat dolor commodo consequat exercitation voluptate Lorem. Sint laborum elit ut voluptate in anim cillum duis adipisicing consequat amet adipisicing et ex. Magna occaecat est nulla nostrud tempor nisi sint cillum est eu mollit do.</p>

                    </Col>


                    <Col s={4} className='journal_pics'>
                        <img className="fit_img" src="https://via.placeholder.com/150/666.png/fff" alt="tripper" />
                        <img className="fit_img" src="https://via.placeholder.com/300x150/666.png/fff" alt="tripper" />
                        <img className="fit_img" src="https://via.placeholder.com/150x300/666.png/fff" alt="tripper" />
                        <img className="fit_img" src="https://via.placeholder.com/150/666.png/fff" alt="tripper" />
                        <img className="fit_img" src="https://via.placeholder.com/150/666.png/fff" alt="tripper" />
                        <img className="fit_img" src="https://via.placeholder.com/150/666.png/fff" alt="tripper" />
                        <div className="addEntry">
                            <Modal
                                header="New Entry"
                                trigger={<Button floating large tooltip="New Entry" waves="light" icon="add" />}
                                actions={<><Button className="cancel modal-action modal-close tripperBtn">Cancel</Button><Button id="newEntryConfirm" className="cancel tripperBtn" onClick={this.makeNewEntry}>Add Entry</Button></>}>
                                <Row id="addNewEntryForm">
                                    <Input type="title" id="entryTitle" label="Entry Title" value={this.state.entryTitle} onChange={this.handleInputChange} />
                                    <Input type="textarea" id="entryText" label="Entry Content" value={this.state.entryText} onChange={this.handleInputChange} />
                                </Row>
                            </Modal>
                        </div>
                    </Col>
                    <Col s={2} className="grid-example"></Col>
                </Row>
            </div>
        );
    }
}


export default Journal;