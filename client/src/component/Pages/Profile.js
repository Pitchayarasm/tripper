import React from "react";
import { Row, Col, Input, Modal, Button } from "react-materialize";
import axios from "axios";

class Profile extends React.Component {
    state = {
        user: null,
        images: [],
    };

    componentDidMount() {
        if (this.props.user) {
            console.log(this.props.user)
            this.setState({
                user : this.props.user
            })
          }
    }

    // handleselectedFile = () => {
    //     var formData = new FormData();
    //     var imagefile = document.querySelector('#profileImg');
    //     formData.append("image", imagefile.files[0]);
    //     console.log(formData)
    //     axios.post('/image' + this.props.user._id, formData , {
    //         headers: {
    //         'Content-Type': 'multipart/form-data'
    //         }
    //     })
    //   }

    render() {
        return (
            <div>
                <Row className="FriendProfile">
                    <Col s={1} className='grid-example'></Col>
                    <Col s={4} className='grid-example'>
                        <img className="Friend" src="https://via.placeholder.com/465x718/666.png/fff" alt="tripper" />

                    </Col>
                    <Col s={3} className='grid-example'>
                        {/* <img className="Friend" src="https://via.placeholder.com/346/666.png/fff" alt="tripper" /> */}
                        <Modal
                        trigger={<Button className="homeBtn">Add Profile</Button>}
                        actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="signUpSubmit" className="cancel modal-action modal-close" onClick={this.handleUpload}>Submit</Button></>}
                        >
                        <Row id="signUpForm">
                        <Input type="file" id="profileImg" label="Upload" placeholder="no file choosen" s={12} onChange={this.handleselectedFile}/>
                        </Row>
                        </Modal>
                       
                        <div className="textBox">
                        <h2>The moon is great!</h2>
                        <p>Quis occaecat consequat quis pariatur reprehenderit. Laboris nulla non irure sint et irure do commodo. Enim proident ex ut non do adipisicing reprehenderit laboris veniam exercitation ad eu deserunt et.</p>
                        </div>
                    </Col>


                    <Col s={3} className='grid-example'>
                    <div className="textBox">
                        <h2>Anderson Cooper</h2>
                        <p>Quis occaecat consequat quis pariatur reprehenderit. Laboris nulla non irure sint et irure do commodo. Enim proident ex ut non do adipisicing reprehenderit laboris veniam exercitation ad eu deserunt et.</p>
                        <img className="Friend" src="https://via.placeholder.com/346/666.png/fff" alt="tripper" />
                        </div>

                    </Col>
                    <Col s={1} className="grid-example"></Col>
                </Row>


            </div>
        );
    }
}


export default Profile;