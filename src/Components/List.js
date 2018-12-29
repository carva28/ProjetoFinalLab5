import React, { Component } from 'react';
import GeoCode from './GeoCode';
import firebase from 'firebase';

var nomesLavandarias = [];
var options = [];

export default class List extends Component {

    componentDidMount() {
        firebase.database().ref('Coordenadas').on('value', (data) => {
            nomesLavandarias.push([
                data.toJSON().Lavandaria1.nome,
                data.toJSON().Lavandaria2.nome,
                data.toJSON().Lavandaria3.nome,
                data.toJSON().Lavandaria4.nome,
                data.toJSON().Lavandaria5.nome
            ]);
        })

        if (nomesLavandarias.length > 5) {
            for (var a = 0; a <= 5; a++) {
                options.push([
                    '<option value="' + nomesLavandarias[a] + '">' + nomesLavandarias[a] + '</option>'
                ]);
            }
            console.log(options);
        }
    }

    render() {

        if (this.props.atualLat != null && this.props.atualLong != null) {
            return (
                <div id="List">
                    <h3>Partida: </h3>
                    <GeoCode lat={this.props.atualLat} long={this.props.atualLong} />

                    <h3>Destino: </h3>
                    <select onChange={this.props.onChange}>
                        <option value="none">Escolha uma lavandaria</option>
                        <option value="Lavandaria1">Lavandaria Wash Club - Miramar</option>
                        <option value="Lavandaria2">Lavandaria Wash Club - Canidelo</option>
                        <option value="Lavandaria3">Lavandaria Wash Club - GomesCosta</option>
                        <option value="Lavandaria4">Lavandaria Wash Club - Canidelo</option>
                        <option value="Lavandaria5">Lavandaria Wash Club - Canidelo</option>
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
                    </select>
                </div>
            );
        }

    }
}