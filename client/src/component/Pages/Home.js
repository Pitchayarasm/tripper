import React from "react";
import { Row, Input, Modal, Button, Parallax } from "react-materialize";
import "./home.css";

class Home extends React.Component {
  state = {
    
  };

  render() {
    return (
      <>
        <Parallax className="topImg" imageSrc="http://materializecss.com/images/parallax1.jpg" />
          <div className="section white">
            <div className="row container btnContainer">
              <h2 className="header">tripper</h2>
              <p className="grey-text text-darken-3 lighten-3">tripper is social network for adventorous travelers. Sign up and start telling your story!</p>
              <br/>

              <Modal
                header='tripper Account Sign Up'
                trigger={<Button className="homeBtn">Sign Up</Button>}
                actions={<Button id="signUpSubmit">Submit</Button>}
                >
                <Row>
                  <Input placeholder s={6} label="First Name" />
                  <Input s={6} label="Last Name" />
                  <Input type="email" label="Email" s={12} />
                  <Input type="file" label="Image" s={12} />
                  <Input type="password" label="password" s={12} />
                </Row>
              </Modal>

              <Modal
                header='tripper Login'
                trigger={<Button className="homeBtn">Login</Button>}
                actions={<Button id="loginBtn">Login</Button>}
                >
                <Row>
                  <Input type="email" label="Email" s={12} />
                  <Input type="password" label="password" s={12} />
                </Row>
              </Modal>
            </div>
          </div>
        <Parallax imageSrc="http://materializecss.com/images/parallax2.jpg" />
      </>
    );
  }
}

export default Home;