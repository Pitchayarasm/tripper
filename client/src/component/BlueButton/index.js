import React from "react";
import axios from "axios";
import { Icon, Button, Modal, Input } from "react-materialize";

class BlueButton extends React.Component {

    state = {
        title: ""
    }

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.id;
        this.setState({
            [name]: value
        });
    };

    newJournal = () => {
        axios.post("/journal", { name: this.state.title }).then(res => {
            this.setState({ title: "" });
        });
    }

    render() {
        return (
            <>
                <Modal
                    header='Title'
                    trigger={<Button floating icon="add" className="blue darken-4" data-position="top" tooltip="Create Journal" />}
                    actions={<><Button className="cancel modal-action modal-close">Cancel</Button><Button id="loginBtn" className="cancel modal-action modal-close" onClick={this.newJournal}>Create</Button></>}>
                    <Input s={6} id="title" label="Title" value={this.state.title} onChange={this.handleInputChange} validate><Icon>account_circle</Icon></Input>
                </Modal>
            </>
        );
    }
}

export default BlueButton;

