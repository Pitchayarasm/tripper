import ReactDOMServer from 'react-dom/server';

//i feel like this needs to export something, but the source i found doesn't indicate what to export...
class InfoWindow extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.map !== prevProps.map) {
            this.renderInfoWindow();
        }
        if (this.props.children !== prevProps.children) {
            this.updateContent();
        }
        if (this.props.visible !== prevProps.visible || this.props.marker !== prevProps.marker) {
            this.props.visible ? this.openWindow() : this.closeWindow();
        }
    }

    openWindow() {
        this.infowindow.open(this.props.map, this.props.marker);
    }
    closeWindow() {
        this.infowindow.close();
    }

    updateContent() {
        const content = this.renderChildren();
        this.infowindow.setContent(content);
    }

    renderInfoWindow() {
        let { map, google, mapCenter } = this.props;

        const iw = this.infowindow = new google.maps.InfoWindow({
            content: ''
        });
    }

    renderChildren() {
        const { children } = this.props;
        return ReactDOMServer.renderToString(children);
    }

    render() {
        return null;
    }
}