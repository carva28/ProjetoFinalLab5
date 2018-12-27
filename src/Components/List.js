import React, { Component } from 'react';
import GeoCode from './GeoCode';

export default class List extends Component {

    render() {

        if (this.props.atualLat != null && this.props.atualLong != null) {
            return (
                <div id="List">
                    <h3>Partida: </h3>
                    <GeoCode lat={this.props.atualLat} long={this.props.atualLong} />

                    <h3>Destino: </h3>
                    <select onChange={this.props.onChange}>
                        <option value="none">Escolha uma lavandaria</option>
                        <option value="Lavandaria Wash Club - Miramar">Lavandaria Wash Club - Miramar</option>
                        <option value="Lavandaria Wash Club - Canidelo">Lavandaria Wash Club - Canidelo</option>
                    </select>
                </div>
            );
        } else {
            return (
                <div id="List">
                    <h3>Partida: </h3>

                    <h3>Destino: </h3>
                    <select onChange={this.props.onChange}>
                        <option value="none">Escolha uma lavandaria</option>
                        <option value="Lavandaria Wash Club - Miramar">Lavandaria Wash Club - Miramar</option>
                        <option value="Lavandaria Wash Club - Canidelo">Lavandaria Wash Club - Canidelo</option>
                    </select>
                </div>
            );
        }

    }
}