import React from 'react';
import Distance from './Distance';
import List from './List';
import Localizacao from './Localizacao';

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
        this.geoLocalRef = React.createRef();
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

    getLocation = () => {
        let btn = document.getElementById('btn');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
          } else { 
            btn.innerHTML = "Geolocation is not supported by this browser.";
          }
    }

    showPosition = (position) => { 
        let btn = document.getElementById('btn');     
        this.setState({
            currentLat: position.coords.latitude,
            currentLong: position.coords.longitude
        })
       btn.innerHTML = position.coords.latitude + "<br/>" + position.coords.longitude;
    }

    render() {
        
        console.log('localizacao: ' + this.getLocation);

        return (
            <div>
                <List onChange={(e) => this.submit(e)} />
                <Distance
                    ref={this.distanceRef}
                    currentLatitude={this.state.currentLat}
                    currentLongitude={this.state.currentLong} 
                    destinationLatitude={this.state.destLatitude}
                    destinationLongitude={this.state.destLongitude} />
                <p id="btn"></p>
                <Localizacao ola={()=>this.getLocation()}/>
            </div>
        );
    }

}