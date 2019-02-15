import React from "react";
import { Row, Col, Icon, Button, Modal, Input } from "react-materialize";
import axios from "axios"

class Journal extends React.Component {
    state = {
        title : "",
        userdB : "",
        entries : ""
    };

    componentWillReceiveProps(nextProps) {
        if ( this.props.user._id === undefined && nextProps.user.journals) {
            this.getJournal(nextProps.user._id);
            this.getEntry(nextProps.user.journals);
        }
    }

    getJournal = (userId) => {
        axios.get(`/journal/${userId}`)
        .then( res => {
            console.log(res.data)
            if ( res ) {
                this.setState({
                    userdB : res.data
                })
            }
        })
        .catch( err => {
            console.log(err);
        }) 
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
        let journal;
        if (this.state.userdB) {
            journal = (
                <> 
                { this.state.userdB.map(user => ( 
                        <Row>
                        <Col s={3} className='grid-example'></Col>
                        <Col s={3} className='grid-example'>
                            <h2>{user.journals.name}</h2>
                                {this.state.entries.map( entry => (
                                    <ul>
                                    <li><h4>- {entry.title}</h4></li>
                                    </ul>
                                ))}
                        </Col>
                        <Col s={2} className='grid-example'></Col>
                        </Row>
                ))}
                </>
            );
        }
         else {
            journal = (<Col s={3} className='grid-example'>
                    <div className="losEntries">
                        <h3>You don't have a journal yet</h3>
                        <p>Tell your story with tripper</p>
                        <Modal
                    header='Create your Journal'
                    trigger={<Button className="homeBtn pulse addEntry">Add</Button>}
                    actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="signUpSubmit" className="cancel modal-action modal-close" onClick={this.newJournal}>Create</Button></>}
                    > 
                    <Row id="addNewEntryForm">
                    <Input s={6} id="title" label="Title" value={this.state.title} onChange={this.handleInputChange}></Input>
                    </Row>
                </Modal>
                    </div>
                    </Col>
                    )
         }
        return (
            <>
            <div className="journale">
            {journal}
            </div>
            </>
        );
    }
}



export default Journal;