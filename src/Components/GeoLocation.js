import Geolocation from "react-geolocation";
import React, { Component } from 'react';

export default class GeoLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: ' ',
            long: ' '
        }
    }

    render() {

        var lat;
        var long;

        return (
            <Geolocation
                render = {({
                    fetchingPosition,
                    position: {
                        coords: {
                            latitude, longitude
                        } = { } } = {},
                    error,
                    getCurrentPosition
                }) =>
                <div>
                    <button onClick={getCurrentPosition}>Get Position</button>
                        {error &&
                            <div>
                                {error.message}
                            </div>
                        }
                        <pre>
                            latitude: {lat = latitude}
                            longitude: {long = longitude}
                        </pre>

                        <button onClick={(lat,long) => this.coord(lat,long)}>Passa lá isso</button>
                    </div>
    
                    }
            />
    );
}


coord = (lats, longs) => {
    this.setState({
        lat: lats,
        long: longs
    })
    //está certo, tem coordenadas
    let { lat, long } = this.state;

    this.props.callbackFromParent(lat, long);
}

}