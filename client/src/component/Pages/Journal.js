import React from "react";
import { Row, Col, Icon, Button, Modal, Input } from "react-materialize";
import axios from "axios"

class Journal extends React.Component {
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

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.id;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = () => {
        axios.post(`entry/${this.props.user.journals}`
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
    }

    // generateEntries() {
    //     for (let i = 0; i < this.props.user.journals)
    // }

    render() {
        let entry;

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