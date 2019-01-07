import React, { Component } from 'react';
import Mapa from './Mapa';
import { geolocated } from 'react-geolocated';
import { askForPermissioToReceiveNotifications } from '../push-notifcation';
import firebase from "firebase";
import { Link } from 'react-router-dom';
import Noti_verificacao from './Noti_verificacao';
import Speech from './Speech';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            Switch: ''
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user,
                    isSignedIn: !!user
                })
            } else {
                this.setState({
                    user: null
                });
            }
        })

        this.addUser();
    }

    verificarUser = () => {
        firebase.database().ref("Utilizadores/Normal/cliente" + firebase.auth().currentUser.uid).on('value', (data) => {

            if (data.toJSON().emailCliente == firebase.auth().currentUser.email) {
                console.log('Esta conta já existe.')
            } else {
                this.addUser();
            }
        })
    }

    addUser = () => {
        firebase.database().ref("Utilizadores/Normal/cliente" + firebase.auth().currentUser.uid).set({
            cliente: firebase.auth().currentUser.displayName,
            emailCliente: firebase.auth().currentUser.email
        })
        this.verificarUser();
    }

    render() {
        if (this.props.coords != null && this.state.Switch == 'false') {
            return (
                <div id="Home">
                    <h1>Lavandarias próximas</h1>
                    <p>Olá {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>
                    <Noti_verificacao />
                    <Mapa
                        LatAtual={this.props.coords.latitude}
                        LongAtual={this.props.coords.longitude} />

                    <Link to={{
                        pathname: '/reserva',
                        state: {
                            reservaLati: this.props.coords.latitude,
                            reservaLong: this.props.coords.longitude,
                        }
                    }}>
                        <button>Reserve agora</button>
                    </Link>

                    <div id="btn_notification">
                        <button onClick={() => this.btnClicked()}>Ativar notificações</button>
                    </div>

                </div>
            );
        }

        if (this.props.coords != null && this.state.Switch == 'true') {
            return (
                <div id="Home">
                    <h1>Lavandarias próximas</h1>
                    <p>Olá {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>
                    <Noti_verificacao />
                    <Speech />
                </div>
            );
        } else {
            return (
                <div id="Home">
                    <h1>Lavandarias próximas</h1>
                    <p>Olá {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>
                    <h6>Vai conduzir?</h6>
                    <select value={this.state.value} onChange={this.handleChange} required>
                        <option value="resposta">Selecione uma opção</option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>
                </div>
            );
        }
    }

    click = () => {
        this.props.paraSair();
    }

    handleChange = (event) => {
        this.setState({
            Switch: event.target.value
        });
    }

    btnClicked() {
        askForPermissioToReceiveNotifications();
        document.getElementById('btn_notification').innerHTML = '';
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(Home);