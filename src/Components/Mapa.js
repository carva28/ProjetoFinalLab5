import React from 'react';
import Distance from './Distance';
import List from './List';
import {geolocated} from 'react-geolocated';

class Mapa extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            destLatitude: null,
            destLongitude: null,
            currentLat: null,
            currentLong: null
        }

        this.distanceRef = React.createRef();
    }

    componentDidMount() {
        fetch('https://api.ipdata.co/?api-key=test').then(
            response => response.json()
        ).then(
            data => this.setState({
                currentLat: data.latitude,
                currentLong: data.longitude
            })
        );
    }

    submit = (event) => {
        let destino;
        if (event.target.value === "Lavandaria Wash Club - Miramar") {
            destino = {
                destLatitude: 41.061134,
                destLongitude: -8.653998
            };

        } else if (event.target.value === "Lavandaria Wash Club - Canidelo") {
            destino = {
                destLatitude: 41.119489,
                destLongitude: -8.64628
            };
        }

        this.setState(destino, () => {
            this.distanceRef.current.renderiza();
        });
    }

    render() {
        console.log(this.props.isGeolocationAvailable);
        console.log(this.props.isGeolocationEnabled)
        console.log(this.props)

        return (
            <div>
                <List onChange={(e) => this.submit(e)} />
                <Distance
                    ref={this.distanceRef}
                    currentLatitude={this.props.coords && this.props.coords.latitude}
                    currentLongitude={this.props.coords && this.props.coords.longitude}
                    destinationLatitude={this.state.destLatitude}
                    destinationLongitude={this.state.destLongitude} />
                <p id="btn"></p>
            </div>
        );
    }

}

export default geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })(Mapa);