import React from "react";
import { Row, Col, Icon, Button, Modal, Input } from "react-materialize";
import axios from "axios"

class Journal extends React.Component {
    state = {
        entryTitle : "",
        entryText : "",
        entryLocation : "",
        entries : []
    };

    componentWillReceiveProps(nextProps) {
        if ( this.props.user._id === undefined && nextProps.user.journals) {
            this.getEntry(nextProps.user.journals);
        }
    }

    getEntry = (journalId) => {
        axios.get(`/entry/${journalId}`)
        .then( res => {
            console.log(res.data.entries)
            if ( res ) {
                this.setState({
                    entries : res.data.entries
                })
            }
        })
        .catch( err => {
            console.log(err);
        }) 
    }

    handleInputChange = (event) => {
        this.setState({
            title: event.target.value
        });
    };


    newJournal = () => {
        axios.post(`/journal/${this.props.user._id}` , { 
            name: this.state.title 
        })
        .then(res => {
            this.props.setUser(res.data);
            this.setState({ 
                title: "" 
            });
        });
    }

    render() {
        let entry;

        if (this.state.entries) {
            entry = (
                <> 
                { this.state.entries.map(entry => ( 
                        <Row>
                        <Col s={3} className='grid-example'></Col>
                        <Col s={3} className='grid-example'>
                            <h2>{entry.title} <span id="editBtn"><Icon>edit</Icon></span></h2>
                            <hr />
                            <p>{entry.body}</p>
                        </Col>
                        <Col s={4} className='journal_pics'>
                           { entry.file ?  <img className="fit_img tile" src={`upload/${entry.file}`} alt="tripper" /> : null}
                        </Col>
                        <Col s={2} className='grid-example'></Col>
                        </Row>
                ))}
                <Modal
                header='Add your Journal!'
                trigger={<Button className="homeBtn pulse addEntry">Add</Button>}
                actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="signUpSubmit" className="cancel modal-action modal-close" onClick={this.handleSubmit}>Submit</Button></>}
                > 
                 <Row id="addNewEntryForm">
                     <Input type='textarea' id="entryTitle" label="Title" value={this.state.entryTitle} onChange={this.handleInputChange} />
                     <Input type='textarea' id="entryText" label="Body" value={this.state.entryText} onChange={this.handleInputChange} />
                     <Input type='textarea' id="entryLocation" label="location" value={this.state.entryLocation} onChange={this.handleInputChange} />
                     <Input name="profileImg" type="file" id="profileImg" label="Upload" placeholder="no file choosen" s={12} readOnly/>
                 </Row>
                </Modal>
                </>
            );
        }
         else {
         }
        return (
            <>
            <Col s={3} className='grid-example'>
                        <div className="losEntries">
                            <h3>You don't have a journal yet</h3>
                            <p>Tell your story with tripper</p>
                            <Modal
                                header='Title'
                                trigger={<Button id="newJournal" floating icon="add" className="blue darken-4" data-position="left" tooltip="Create Journal" />}
                                actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="loginBtn" className="cancel modal-action modal-close" onClick={this.newJournal}>Create</Button></>}
                                modalOptions={{ dismissible: true }}>
                                <Input s={6} id="title" label="Title" value={this.state.title} onChange={this.handleInputChange}><Icon>account_circle</Icon></Input>
                            </Modal>
                        </div>
                    </Col>
            
            </>
        );
    }
}


export default Journal;