// NEEDED TO USE:

// let marker = new google.maps.Marker({
//     position: somePosition,
//     map: map
//   });

const evtNames = ['click', 'mouseover'];

export class Marker extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},

    };

    //make onClick and onMouseOver!!!
    handleEvent(evtName) {
        return (e) => {
            const evtName = `on${camelize(evt)}`;
            if (this.props[evtName]) {
                this.props[evtName](this.props, this.marker, e);
            }
        };
    }

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) || (this.props.position !== prevProps.position)) {
            this.renderMarker();
        }
    }

    renderMarker() {
        let { map, google, position, mapCenter } = this.props;

        let pos = position || mapCenter;
        position = new google.maps.LatLng(pos.lat, pos.lng);

        const pref = {
            map: map,
            position: position
        };

        this.marker = new google.maps.Marker(pref);

        evtNames.forEach(e => {
            this.marker.addListener(e, this.handleEvent(e));
        });
    }

    componentWillUnmount() {
        if (this.marker) {
            this.marker.setMap(null);
        }
    }

    render() {
        const style = {
            width: '100vw',
            height: '100vh'
        };
        const pos = { lat: 37.759703, lng: -122.428093 };
        return (
            <div style={style}>
                <Map google={this.props.google}>
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'Dolores park'}
                        position={pos} />

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

Marker.propTypes = {
    position: React.PropTypes.object,
    map: React.PropTypes.object
};