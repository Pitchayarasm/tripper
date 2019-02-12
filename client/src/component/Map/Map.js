{/* <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCsd5GbDBaiJBZ94ei5j9hfU1Cy6TRP6Ws&callback=initMap">
</script> // async and callback may be deleted from this script. would slow loading but will allow us to assume map is already loaded

    <div id="map"></div> //where the map is displayed. height must be set explicitly */}

// var key = 
// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 8
//     }); //center and zoom are required
// }

export class Map extends React.Component {
    constructor(props) {
        super(props);

        const { lat, lng } = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    recenterMap() {
        const map = this.map;
        const curr = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng)
            map.panTo(center)
        }
    }

    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    })
                })
            }
        }
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            // google is available
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let { initialCenter, zoom } = this.props;
            let { lat, lng } = this.state.currentLocation;
            let center = new maps.LatLng(lat, lng);
            const mapConfig = {
                center: center,
                zoom: zoom //can this be a double?
            };
            this.map = new maps.Map(node, mapConfig);
            let centerChangedTimeout;
            this.map.addListener('dragend', (evt) => {
                if (centerChangedTimeout) {
                    clearTimeout(centerChangedTimeout);
                    centerChangedTimeout = null;
                }
                centerChangedTimeout = setTimeout(() => {
                    this.props.onMove(this.map);
                }, 0);
            });
        }
    }

    renderChildren() {
        const { children } = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }

    render() {
        return (
            <div ref='map'>
                Loading map...
                {this.renderChildren()}
            </div>
        )
    }
}

Map.propTypes = {
    google: React.PropTypes.object,
    zoom: React.PropTypes.number,
    initialCenter: React.PropTypes.object,
    centerAroundCurrentLocation: React.PropTypes.bool,
    onMove: React.PropTypes.func
}

Map.defaultProps = {
    zoom: 13,
    initialCenter: {
        lat: 37.774929,
        lng: -122.419416
    },
    centerAroundCurrentLocation: false,
    onMove: function () { }
}