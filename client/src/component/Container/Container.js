export class Container extends React.Component {

  state = {
    showingInfoWindow: false,
    activeMarker: null
  };

  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }

  onMapClick() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }

    const pos = { lat: 37.759703, lng: -122.428093 };

    return (
      <div style={style}>
        <Map google={this.props.google} onClick={this.onMapClick}>
          <Marker />
          <Marker position={pos} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onInfoWindowClose}>
            <div>
              <h1>
                {this.state.selectedPlace.name}
              </h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiComponent({
  apiKey: AIzaSyCsd5GbDBaiJBZ94ei5j9hfU1Cy6TRP6Ws
})(Container)