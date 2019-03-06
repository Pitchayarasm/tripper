import React from "react";
import { Row, Input, Button, Col } from "react-materialize";
import axios from "axios";

class FriendSearch extends React.Component {
    state = {
        recommendations: [],
        searchBy: "fullName",
        searchText: ""
    };

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.id;
        this.setState({
            [name]: value
        });
    };

    addFriend() {

    }

    loadFriends(recommendations) {
        let html = [];

        for (let i = 0; i < Math.ceil(recommendations.length / 3); i++) {
            html.push(
                <Row className="FriendProfile">
                    <Col s={1} className='grid-example'></Col>
                    {this.generateRow(i, recommendations)}
                    <Col s={1} className='grid-example'></Col>
                </Row>
            );
        }
        this.setState({ recommendations: html });
    }

    generateRow(i, recommendations) {
        let html = [];
        for (let j = 0; j < 3 && i * 3 + j < recommendations.length; j++) {
            html.push(<Col s={3} className='grid-example'>
                <div className="SearchCard">
                    <img style={{ width: "100%" }} src={recommendations[3 * i + j].profilePic} alt="profile" />
                    <h3>{recommendations[3 * i + j].firstName + " " + recommendations[3 * i + j].lastName}</h3>
                    <p>Journals: {recommendations[3 * i + j].journalCount}</p>
                </div>
            </Col>);
        }
        return html;
    }

    handleSearch = () => {
        //make axios call, this.setState recommendations
        var trimmedText = this.state.searchText.trim();
        axios.get(`nonfriends/${this.state.searchBy}/${trimmedText}`)
            .then(res => {
                let i = 0;
                let recommendations = res.data[0].friends.map(item => {
                    i++;
                    let src = `/upload/${item.file}`;

                    return {
                        journalCount: item.journals.length,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        id: item._id,
                        key: i,
                        profilePic: src
                    };
                });

                this.loadFriends(recommendations);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <Row className="section white">
                    <Col s={12} className='grid-example'>
                        <div className="row container">
                            <Row>
                                <h2 className="header">Search for Friends</h2>
                            </Row>
                            <Col s={6}>
                                <Input id="searchText" value={this.state.searchText} label="Search For..." onChange={this.handleInputChange} />
                            </Col>
                            <Col s={4}><Input id="searchBy" type='select' label='Search By' defaultValue='First Name' onChange={this.handleInputChange}>
                                <option value='firstName'>First Name</option>
                                <option value='lastName'>Last Name</option>
                                <option value='email'>Email</option>
                            </Input>
                            </Col>
                            <Button s={2} className="homeBtn" onClick={this.handleSearch}>Search</Button>
                            {this.state.recommendations}
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}


export default FriendSearch;