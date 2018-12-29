import React, { Component } from 'react';
import GeoCode from './GeoCode';
import firebase from 'firebase';

/* var nomesLavandarias = []; */

export default class List extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nomesLavandarias: []
        }
    }

    componentDidMount() {
        firebase.database().ref('Coordenadas').on('value', (data) => {
            this.setState({
                nomesLavandarias: [
                    data.toJSON().Lavandaria1.nome,
                    data.toJSON().Lavandaria2.nome,
                    data.toJSON().Lavandaria3.nome,
                    data.toJSON().Lavandaria4.nome,
                    data.toJSON().Lavandaria5.nome
                ]
            })
        })
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
                        <option value="Lavandaria1">{this.state.nomesLavandarias[0]}</option>
                        <option value="Lavandaria2">{this.state.nomesLavandarias[1]}</option>
                        <option value="Lavandaria3">{this.state.nomesLavandarias[2]}</option>
                        <option value="Lavandaria4">{this.state.nomesLavandarias[3]}</option>
                        <option value="Lavandaria5">{this.state.nomesLavandarias[4]}</option>
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