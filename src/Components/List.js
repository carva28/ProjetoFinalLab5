import React, { Component } from 'react';

export default class List extends Component {

    render() {
        return (
            <div>
                <b>Partida: </b>
                <select onChange={this.props.onChange}>
                    <option value="none">Escolha uma lavandaria</option>
                    <option value="Lavandaria Wash Club - Miramar">Lavandaria Wash Club - Miramar</option>
                    <option value="Lavandaria Wash Club - Canidelo">Lavandaria Wash Club - Canidelo</option>
                    <option value="oklahoma city, ok">Oklahoma City</option>
                    <option value="oklahoma city, ok">Oklahoma City</option>
                </select>
            </div>
        );
    }
}