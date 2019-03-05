import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={13}
        style={mapStyles}
        initialCenter={{lat: 34.073735899999996, lng: -118.4450715}}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCsd5GbDBaiJBZ94ei5j9hfU1Cy6TRP6Ws'
})(MapContainer);

// import React from "react";
// import "./style.css";
// import { load_google_maps } from "./helper.js";

// const google = window.google;
// class Map extends React.Component {
//     state = {
//         user: null,
//         mapUp: false
//     };

//     componentDidMount() {
//         // let googleMapsPromise = load_google_maps;

//         // Promise.all([
//         //    googleMapsPromise 
//         // ]).then(values=>{
//         //     console.log(values);
//         // });
//         this.initMap();
//     }

//     initMap = () => {
//         //POPULATE THAT MAP
//         let journal = [{ geometry: { location: { lat: 34.073735899999996, lng: -118.4450715 } } }];
//         let entryTitle = ["Coding is awesome!"];
//         var map = new google.maps.Map(document.getElementById('map'), {
//             zoom: 13,
//             center: { lat: 34.073735899999996, lng: -118.4450715 }
//         });
//         // for (let i = 0; i < journal.length; i++) {
//         //     var latitude = journal[i].geometry.location.lat;
//         //     var longitude = journal[i].geometry.location.lng;
//         //     marker = new google.maps.Marker({
//         //         position: new google.maps.LatLng(latitude, longitude),
//         //         map: map,
//         //         title: `${entryTitle}`,
//         //         animation: google.maps.Animation.DROP
//         //     });
//         // }
//     }

//     render() {
//         return (
//             <>
//                 <div id="map"></div>
//             </>
//         );
//     }
// }

// export default Map;