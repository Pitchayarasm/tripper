import React from "react";
import { Row, Col, Icon, Button, Modal, Input } from "react-materialize";
import axios from "axios"

class Journal extends React.Component {
<<<<<<< HEAD
    state = {
        entryTitle : "",
        entryText : "",
        entryLocation : "",
        entries : []
    };
=======
    constructor(props) {
        super(props);
        this.state = {
            entryTitle: "",
            entryText: "",
            entryLocation: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.user._id === undefined && nextProps.user._id) {
            this.axiosCall(nextProps.user._id);
        }
    }

    axiosCall = id => {
        axios.get(`friendList/${id}`)
            .then(res => console.log(res.data));
    }
>>>>>>> frontEndCalls

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

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.id;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = () => {
        axios.post(`entry/${this.props.user.journals}`
<<<<<<< HEAD
        ,{
            title: this.state.entryTitle,
            body: this.state.entryText,
            location: this.state.entryLocation
        })
        .then( res => {
            if (res) {
                let formData = new FormData();
                let imagefile = document.querySelector('#profileImg');
                formData.append("image", imagefile.files[0]);
                axios.post(`/uploadEntry/${res.data}`, formData , {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then( (res) => {
                    console.log(res.data)
                });
            }
        });
=======
            , {
                title: this.state.entryTitle,
                body: this.state.entryText,
                location: this.state.entryLocation
            })
            .then(res => {
                if (res) {
                    console.log(res.data)
                    this.setState({
                        // front-end grab data here
                    })
                }
            })
>>>>>>> frontEndCalls
    }

    // generateEntries() {
    //     for (let i = 0; i < this.props.user.journals)
    // }

    render() {
        let entry;

<<<<<<< HEAD
        if (this.state.entries) {
=======
        if (true/*this.props.user.journals.name*/) {
            entry = (
                <>
                    <Row>
                        <Col s={3} className='grid-example'></Col>
                        <Col s={3} className='grid-example'>
                            {/* <h2>{this.props.journals.name} <span id="editBtn"><Icon>edit</Icon></span></h2> */}
                            <hr />
                        </Col>
                        <Col s={4} className='journal_pics'>
                            {this.generateEntries}
                        </Col>
                        <Col s={2} className='grid-example'></Col>
                    </Row>
                </>
            );
        }
        else {
>>>>>>> frontEndCalls
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
<<<<<<< HEAD
                header='Add your Entry!'
                trigger={<Button className="homeBtn pulse">Add Entry</Button>}
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
=======
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
>>>>>>> frontEndCalls
        return (
            <>
                {entry}
            </>
        );
    }
}


export default Journal;