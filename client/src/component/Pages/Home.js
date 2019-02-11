import React from "react";
import { Row, Input, Modal, Button, Parallax } from "react-materialize";
import "./home.css";

class Home extends React.Component {
  state = {
    user: []
  };
  render() {
    return (
      <div>
        <div>
​
          <Parallax imageSrc="http://materializecss.com/images/parallax1.jpg" />
          <div className="section white">
            <div className="row container">
              <h2 className="header">Tripper</h2>
              <p className="grey-text text-darken-3 lighten-3">Tripper is social network for adventorous travelers, join if you dare to tell your story:</p>
​
              <Modal
                header="Modal Header"
                trigger={<Button>Sign up</Button>}>
                <Row>
                  <Input placeholder s={6} label="First Name" />
                  <Input s={6} label="Last Name" />
                  <Input type="email" label="Email" s={12} />
                  <Input type="file" label="Profile picture" s={12} />
                  <Input type="password" label="password" s={12} />
​
                </Row>
              </Modal>
              <Modal
                header='Modal Header'
                trigger={<Button>Log in</Button>}>
                <Row>
                  <Input type="email" label="Email" s={12} />
                  <Input type="password" label="password" s={12} />
​
                </Row>
              </Modal>
            </div>
          </div>
          <Parallax imageSrc="http://materializecss.com/images/parallax2.jpg" />
​
        </div>
​
​
      </div>
    );
  }
}

export default Home;