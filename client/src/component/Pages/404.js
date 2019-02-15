import React from 'react';

class Error extends React.Component {
    render() {
        return (
            <>
            <div className="error">
            <div className="SearchCard">
            <h3>Error 404</h3>
            <p>Page not found</p>
            <img className="SearchCard" src="https://media.giphy.com/media/1BJjLjkGrG4q4/giphy.gif"/>
            </div>
            </div>
            </>
        );
    }
  }
  
  export default Error