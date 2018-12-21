import React, { Component } from 'react';
import Mapa from './Mapa';
import { geolocated } from 'react-geolocated';
import { askForPermissioToReceiveNotifications } from '../push-notifcation';
import firebase from "firebase";

class Home extends Component {

    render() {
        if (this.props.coords != null) {
            return (
                <div id="Home">
                    <h1>Lavandarias próximas</h1>
                    <p>Olá {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>

                    <span>
                        <button onClick={this.click}>Sair</button>
                    </span>

                    <Mapa
                        LatAtual={this.props.coords.latitude}
                        LongAtual={this.props.coords.longitude} />

                    <button>Reserve agora</button>
                </div>
            );
        } else {
            return (
                <div id="Home">
                    <h1>Lavandarias próximas</h1>
                    <p>Olá {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>

                    {/*Botão de Sair*/}
                    <span>
                        <button onClick={this.click}>Sair</button>
                    </span>

                    <Mapa />

                    {/* <Reserva ref={this.reserva}/> */}
                    <button onClick={() => this.btnClicked()}>Alert test</button>
                    <button onClick={() => this.roupa()}>Reserve agora</button>
                </div>
            );
        }
    }

    click = () => {
        this.props.paraSair();
    }

    roupa = () => {
        this.reserva.current.fazReserva();
    }

    btnClicked() {
        window.prompt();
        askForPermissioToReceiveNotifications();
    }

}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(Home);