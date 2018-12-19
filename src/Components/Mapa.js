
import React from 'react';
import Distance from './Distance';
import List from './List';

export default class Mapa extends React.Component {

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

        return (
            <div>
                <List onChange={(e) => this.submit(e)} />
                <Distance
                    ref={this.distanceRef}
                    currentLatitude={this.props.LatAtual}
                    currentLongitude={this.props.LongAtual}
                    destinationLatitude={this.state.destLatitude}
                    destinationLongitude={this.state.destLongitude} />
                <p id="btn"></p>
            </div>
        );
    }

}