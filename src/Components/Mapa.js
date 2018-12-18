import React from 'react';
import Distance from './Distance';
import List from './List';
import Localizacao from './Localizacao';

export default class Mapa extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            destLatitude: null,
            destLongitude: null
        }

        this.distanceRef = React.createRef();
        this.geoLocalRef = React.createRef();
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
        
        console.log('localizacao: ' + this.getLocation);

        return (
            <div>
                <List onChange={(e) => this.submit(e)} />
                <Distance
                    ref={this.distanceRef}
                    currentLatitude={41.200629}
                    currentLongitude={-8.508277} 
                    destinationLatitude={this.state.destLatitude}
                    destinationLongitude={this.state.destLongitude} />
                <p id="btn"></p>
            </div>
        );
    }

}