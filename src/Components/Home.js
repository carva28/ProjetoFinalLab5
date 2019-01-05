import React, { Component } from 'react';
import Mapa from './Mapa';
import { geolocated } from 'react-geolocated';
import { askForPermissioToReceiveNotifications } from '../push-notifcation';
import firebase from "firebase";
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
        }



    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
                this.setState({ isSignedIn: !!user })

            } else {
                this.setState({ user: null });
            }
        })

        this.addUser();

    }

    verificarUser = () => {
        firebase.database().ref("Utilizadores/Normal/cliente" + firebase.auth().currentUser.uid).on('value', (data) => {

            if (data.toJSON().emailCliente == firebase.auth().currentUser.email) {
                console.log('conta_existente')
            } else {
                console.log('conta não existente')
                this.addUser();
            }
        })


    }

    addUser = () => {
        firebase.database().ref("Utilizadores/Normal/cliente" + firebase.auth().currentUser.uid).set(
            {
                cliente: firebase.auth().currentUser.displayName,
                emailCliente: firebase.auth().currentUser.email
            })
        this.verificarUser();
    }



    render() {
        if (this.props.coords != null) {
            return (
                <div id="Home">
                    <h1>Lavandarias próximas</h1>
                    <p>Olá {firebase.auth().currentUser.displayName}! Veja os clientes no Mapa.</p>

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
                        <button onClick={() => this.btnClicked()}>Subscreva para receber notificações</button>
                    </div>

                </div>
            );
        } else {
            return (
                <div id="Home">
                    <h1>Lavandarias próximas</h1>
                    <p>Olá {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>
                    <h4>Carregando</h4>
                </div>
            );
        }
    }
    click = () => {
        this.props.paraSair();
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