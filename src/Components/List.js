import React, { Component } from 'react';

export default class List extends Component {

    render() {
        return (
            <div id="List">
                <h3>Partida: </h3>
                <select onChange={this.props.onChange}>
                    <option value="none">Escolha uma lavandaria</option>
                    <option value="Lavandaria Wash Club - Miramar">Lavandaria Wash Club - Miramar</option>
                    <option value="Lavandaria Wash Club - Canidelo">Lavandaria Wash Club - Canidelo</option>
                </select>

                <h3>Destino: </h3>
                <p>Minha morada</p>
            </div>
        );
    }
}