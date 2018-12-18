import React, { Component } from 'react';
import Distance from './Distance';

export default class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            LatDestino: null,
            LongDestino: null 
        }

        this.distanceRef = React.createRef();
    }

    submit = (event) => {
        let destino;
        if (event.target.value == "Lavandaria Wash Club - Miramar") {
            destino = {
                LatDestino: 41.061134,
                LongDestino: -8.653998
            };

        } else if (event.target.value == "Lavandaria Wash Club - Canidelo") {
            destino= {
                LatDestino: 41.119489,
                LongDestino: -8.64628
            };
        }

        this.setState(destino, ()=>{
            this.distanceRef.current.renderiza();
        });
    }


    render() {

        console.log('List.js - Latitude destino: ' + this.state.LatDestino);

        return (

            <div>
                <b>Partida: </b>
                <select onChange={(e) => this.submit(e)}>
                    <option value="none">Escolha uma lavandaria</option>
                    <option value="Lavandaria Wash Club - Miramar">Lavandaria Wash Club - Miramar</option>
                    <option value="Lavandaria Wash Club - Canidelo">Lavandaria Wash Club - Canidelo</option>
                    <option value="oklahoma city, ok">Oklahoma City</option>
                    <option value="oklahoma city, ok">Oklahoma City</option>
                </select>
                
                <Distance
                    ref={this.distanceRef}
                    currentLatitude={41.200629}
                    currentLongitude={-8.508277}
                    destinationLatitude={this.state.LatDestino}
                    destinationLongitude={this.state.LongDestino}
                />
            </div>
        );
    }

}