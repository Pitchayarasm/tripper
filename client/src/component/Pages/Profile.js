import React from "react";
import { Row, Col, Input, Modal, Button,Icon } from "react-materialize";
import axios from "axios";

class Profile extends React.Component {
    state = {
        about_me : "",
        entry : ""
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
                    entry : res.data.entries[res.data.entries.length-1]
                })
            }
        })
        .catch( err => {
            console.log(err);
        }) 
    }

    handleselectedFile = () => {
        let formData = new FormData();
        let imagefile = document.querySelector('#profileImg');
        formData.append("image", imagefile.files[0]);
        console.log(formData)
        axios.post('/upload/' + this.props.user._id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then( (res) => {
            this.props.setUser(res.data)
        });
    }

    handleInputChange = event => {
        this.setState({
            about_me : event.target.value
        });
    };

    handleSubmit = () => {
        axios.post(`aboutme/${this.props.user._id}`
        ,{
            about_me : this.state.about_me
        })
        .then( res => {
            console.log(res.data)
            this.props.setUser(res.data)
        });
    }

    render() {
        let profile;
        if (this.props.user.file !== undefined) {
            let src = `/upload/${this.props.user.file}`
           profile =  <img src={src} alt="profile" style={{width: "346px", height: "346px", objectFit: "cover"}} />
        }
        
        let about_me;
        if (this.props.user.about_me) {
            about_me = <p>{this.props.user.about_me}</p>
        }

        let entry;
        if (this.state.entry) {
            entry = <Row>
                    <Col s={2} className='grid-example'></Col>
                    <Col s={4} className='grid-example'>
                        <h2>{this.state.entry.title}</h2>
                        <hr />
                        <h5>{this.state.entry.body}</h5>
                        <p><Icon>location_on</Icon>{this.state.entry.location}</p>
                    </Col>
                    <Col s={1} className='grid-example'></Col>
                    
                    </Row>
        }
        let entry_pic;
        if (this.state.entry.file) {
            entry_pic = <Col s={4} className='journal_pics'>
                        <img className="fit_img tile" src={`upload/${this.state.entry.file}`} alt="tripper" />
                        </Col>
                        
        }

        return (
            <div>
                <Row className="FriendProfile">
                    <Col s={2} className='grid-example'></Col>
                    <Col s={5} className='grid-example'>
                        {profile}
                        <Modal
                        trigger={<Button className="homeBtn">Add Profile</Button>}
                        actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="signUpSubmit" className="cancel modal-action modal-close" onClick={this.handleselectedFile}>Submit</Button></>}
                        >
                        <Row id="signUpForm">
                            <Input name="profileImg" type="file" id="profileImg" label="Upload" placeholder="Choose File" s={12} readOnly />
                        </Row>
                        </Modal>
                        {entry}
                    </Col>


                    <Col s={3} className='grid-example'>
                        <div className="textBox">
                            <h2>{this.props.user.firstName} {this.props.user.lastName}</h2>
                            {about_me}
                            <Modal
                            header='Add your story!'
                            trigger={<Button className="homeBtn pulse"><Icon>edit</Icon></Button>}
                            actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="signUpSubmit" className="cancel modal-action modal-close" onClick={this.handleSubmit}>Submit</Button></>}
                            > 
                            <Row id="addNewEntryForm">
                                <Input type='textarea' id="entryTitle" label="About me.." value={this.state.about_me} onChange={this.handleInputChange} />
                            </Row>
                            </Modal>
                        </div>
                        {entry_pic}
                    </Col>
                    <Col s={3} className="grid-example"></Col>
                </Row>


            </div>
        );
    }
}


export default Profile;