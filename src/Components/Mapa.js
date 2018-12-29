import React from 'react';
import Distance from './Distance';
import List from './List';
import firebase from 'firebase';

var lavandarias = [];

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
        firebase.database().ref('Coordenadas').on('value', (data) => {
            lavandarias.push([
                data.toJSON().Lavandaria1.latitude,
                data.toJSON().Lavandaria1.longitude,
                data.toJSON().Lavandaria1.nome
            ]);

            lavandarias.push([
                data.toJSON().Lavandaria2.latitude,
                data.toJSON().Lavandaria2.longitude,
                data.toJSON().Lavandaria2.nome
            ]);

            lavandarias.push([
                data.toJSON().Lavandaria3.latitude,
                data.toJSON().Lavandaria3.longitude,
                data.toJSON().Lavandaria3.nome
            ]);

            lavandarias.push([
                data.toJSON().Lavandaria4.latitude,
                data.toJSON().Lavandaria4.longitude,
                data.toJSON().Lavandaria4.nome
            ]);

            lavandarias.push([
                data.toJSON().Lavandaria5.latitude,
                data.toJSON().Lavandaria5.longitude,
                data.toJSON().Lavandaria5.nome
            ]);
        })

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
        if (event.target.value === "Lavandaria1") {
            destino = {
                destLatitude: 41.061134,
                destLongitude: -8.653998
            };

        } else if (event.target.value === "Lavandaria2") {
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
                <List onChange={(e) => this.submit(e)}
                    atualLat={this.props.LatAtual}
                    atualLong={this.props.LongAtual} />
                <Distance
                    ref={this.distanceRef}
                    currentLatitude={this.props.LatAtual}
                    currentLongitude={this.props.LongAtual}
                    destinationLatitude={this.state.destLatitude}
                    destinationLongitude={this.state.destLongitude}
                    lavandarias={lavandarias} />
                <p id="btn"></p>
            </div>
        );
    }

}