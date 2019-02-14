import React from "react";
import { Row, Col, Input, Modal, Button } from "react-materialize";
import axios from "axios";

class Profile extends React.Component {
    state = {
    };

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

    render() {
        let profile = <Modal
            trigger={<Button className="homeBtn">Add Profile</Button>}
            actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="signUpSubmit" className="cancel modal-action modal-close" onClick={this.handleselectedFile}>Submit</Button></>}
        >
            <Row id="signUpForm">
                <Input name="profileImg" type="file" id="profileImg" label="Upload" placeholder="no file choosen" s={12} />
            </Row>
        </Modal>;

        if (this.props.user.file) {
            let src = `/upload/${this.props.user.file}`
            profile = <img style={{ width: "100%" }} src={src} alt="profile" />

        }

        return (
            <div>
                <Row className="FriendProfile">
                    <Col s={2} className='grid-example'></Col>
                    <Col s={4} className='grid-example'>
                        {profile}
                        <div className="textBox">
                            <h2>The moon is great!</h2>
                            <p>Quis occaecat consequat quis pariatur reprehenderit. Laboris nulla non irure sint et irure do commodo. Enim proident ex ut non do adipisicing reprehenderit laboris veniam exercitation ad eu deserunt et.</p>
                        </div>
                    </Col>


                    <Col s={3} className='grid-example'>
                        <div className="textBox">
                            <h2>{this.props.user.firstName} {this.props.user.lastName}</h2>
                            <p>Quis occaecat consequat quis pariatur reprehenderit. Laboris nulla non irure sint et irure do commodo. Enim proident ex ut non do adipisicing reprehenderit laboris veniam exercitation ad eu deserunt et.</p>
                            <Modal
                                header='About me'
                                trigger={<Button>Add</Button>}>
                                <Input type='textarea' />
                            </Modal>
                        </div>
                        <img className="Friend" src="https://via.placeholder.com/346/666.png/fff" alt="tripper" />

                    </Col>
                    <Col s={3} className="grid-example"></Col>
                </Row>


            </div>
        );
    }
}


export default Profile;