import React from "react";
import { Row, Col, Icon, Button, Modal, Input } from "react-materialize";
import axios from "axios"

class Journal extends React.Component {
    state = {
        importTitle : "",
        importText : "",
        importLocation : "",
        entryTitle : "",
        entryText : "",
        entryLocation : ""
    };

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.id;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = () => {
        axios.post(`entry/${this.props.user.journals}`
        ,{
            title: this.state.entryTitle,
            body: this.state.entryText,
            location: this.state.entryLocation
        })
        .then( res => {
            if (res) {
                console.log(res.data)
                this.setState({
                    // front-end grab data here
                })
            }
        })
    }

    render() {
        let entry;

        if (this.state.importTitle) {
            entry = (
                <>
                 <Row>
                    <Col s={3} className='grid-example'></Col>
                    <Col s={3} className='grid-example'>
                        <h2>{this.state.importTitle} <span id="editBtn"><Icon>edit</Icon></span></h2>
                        <hr />
                        <p>{this.state.importText}</p>
                    </Col>
                    <Col s={4} className='journal_pics'>
                        <img className="fit_img tile" src="https://via.placeholder.com/150/666.png/fff" alt="tripper" />
                        <img className="fit_img tile" src="https://via.placeholder.com/300x150/666.png/fff" alt="tripper" />
                        <img className="fit_img tile" src="https://via.placeholder.com/150x300/666.png/fff" alt="tripper" />
                        <img className="fit_img tile" src="https://via.placeholder.com/150/666.png/fff" alt="tripper" />
                        <img className="fit_img tile" src="https://via.placeholder.com/150/666.png/fff" alt="tripper" />
                        <img className="fit_img tile" src="https://via.placeholder.com/150/666.png/fff" alt="tripper" />
                        <img className="fit_img tile" src="https://via.placeholder.com/150/666.png/fff" alt="tripper" />
                    </Col>
                    <Col s={2} className='grid-example'></Col>
                </Row>
                </>
            );
        }
         else {
            entry = (
                <Modal
                header='Add your Entry!'
                trigger={<Button className="homeBtn">Add Entry</Button>}
                actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="signUpSubmit" className="cancel modal-action modal-close" onClick={this.handleSubmit}>Submit</Button></>}
                > 
                 <Row id="addNewEntryForm">
                     <Input type='title' id="entryTitle" label="Title" value={this.state.entryTitle} onChange={this.handleInputChange} />
                     <Input type='textarea' id="entryText" label="Body" value={this.state.entryText} onChange={this.handleInputChange} />
                     <Input type='textarea' id="entryLocation" label="location" value={this.state.entryLocation} onChange={this.handleInputChange} />
                     <Input name="profileImg" type="file" id="profileImg" label="Upload" placeholder="no file choosen" s={12} />
                 </Row>
             </Modal>
             );
         }
        return (
            <>
            {entry}
            </>
        );
    }
}


export default Journal;