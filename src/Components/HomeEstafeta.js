import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import firebase from "firebase";
import ClientesReservas from './ClientesReservas';

var var_estafeta;

class HomeEstafeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            array: [],
            var_estafeta: '',
            coordEstafLat: '',
            coordEstafLong: '',
        }

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user,
                    isSignedIn: !!user
                })
            } else {
                this.setState({
                    user: null
                });
            }
        })
        firebase.database().ref('Number/var_estafeta').on('value', (data) => {
            console.log(data.toJSON().d);
            this.setState({
                var_estafeta: data.toJSON().d
            })
        })
        this.estafetaLoop();
    }
    estafetaLoop = () => {

        this.estaloops = setTimeout(() => {
            for (let est = 1; est <= this.state.var_estafeta; est++) {
                firebase.database().ref("Utilizadores/Estafeta/estafeta0" + est).on('value', (data) => {
                    console.log(data.toJSON().coordEstafetaLat)
                    this.setState({
                        coordEstafLat: data.toJSON().coordEstafetaLat,
                        coordEstafLong: data.toJSON().coordEstafetaLong
                    })
                })
            }

        }, 5000);

    }

    render() {

        if (this.state.coordEstafLat != null && this.state.coordEstafLong !== null) {

            return (
                <div id="Home">
                    <h1>Estafeta</h1>
                    <p>Olá estafeta {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>

                    <ClientesReservas
                        LatAtual={this.state.coordEstafLat}
                        LongAtual={this.state.coordEstafLong}
                    />

                    <div id="btn_notification">
                        <button onClick={() => this.btnClicked()}>Subscreva para receber notificações</button>
                    </div>
                </div>

            );
        }
        else {
            return (
                <div id="Home">
                    <h1>Estafeta</h1>
                    <p>Olá estafeta {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>

                </div>
            );
        }
    }


    click = () => {
        this.props.paraSair();
    }


}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(HomeEstafeta);