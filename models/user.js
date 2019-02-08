import React from "react";

class Save extends React.Component {
  state = {
    results : []
  };


  render() {
    return (
      <div>
        {
          this.state.results.map((book) => {
            return (
              <div className="container result" key={book._id} style={{visibility : book.title ? "visible" : "hidden"}} >
                <ul style={{listStyle: "none"}}>
                  <li >
                    <button style={{float:"right"}} onClick={()=>{this.deleteBook(book)}} className="btn btn-dark mt-3">Delete</button>
                    <button style={{float:"right", marginRight:"10px"}} className="btn btn-dark mt-3"><a target ="_ blank" href={book.link}>View</a></button>
                  </li>
                </ul>
                <h5>Title : {book.title}</h5>
                <p>Written By : {book.author}</p>
                <div className="row">
                    <div className="col-md-2">
                        <img src={book.image} alt=""/>
                    </div>
                    <div className="col-md-10">
                        <p>{book.description}</p>
                    </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}


export default Save;


