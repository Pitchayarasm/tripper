import React from "react";
import { Row, Col } from "react-materialize";
import axios from "axios";

class FriendSearch extends React.Component {
    //search by first name, last name, full name, email
    //needs: search bar, search by dropdown, search button, friends population
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
                    <p>Journals: {friendList[3 * i + j].journalCount}</p>
                </div>
            </Col>);
        }
        return html;
    }

    handleSearch = () => {
        //make axios call, this.setState recommendations
        axios.get(`nonfriends/${this.state.searchBy}/${this.state.searchText}`)
            .then(res => {
                let i = 0;
                let recommendations = res.data[0].friends.map(item => {
                    i++;
                    let src = `/upload/${item.file}`;

                    return {
                        journalCount: item.journals.length,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        key: i,
                        profilePic: src
                    };
                });

                loadFriends(recommendations);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <Searchbar />
                <Dropdown />
                <Button className="searchBtn" onClick={handleSearch}>Search</Button>
                <Input id="searchText" value={this.state.searchText} s={12} onChange={this.handleInputChange} />
                {this.state.recommendations}
            </>
        );
    }
}


export default FriendSearch;