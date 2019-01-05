import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import { askForPermissioToReceiveNotifications } from '../push-notifcation';
import firebase from "firebase";
import ClientesReservas from './ClientesReservas';

var var_noti, var_estafeta;

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

        console.log(props);

        firebase.database().ref('Number/var_estafeta').on('value', (data) => {
            console.log(data.toJSON().d);
            this.setState({
                var_estafeta: data.toJSON().d
            })
        })


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
        this.estafetaLoop();
    }
    estafetaLoop = () => {

        this.estaloops = setTimeout(() => {
            for (let est = 1; est <= var_estafeta; est++) {
                firebase.database().ref("Utilizadores/Estafeta/estafeta0" + est + "").on('value', (data) => {
                    console.log(data.toJSON().coordEstafetaLat)




                })
            }

        }, 5000);

    }

    render() {
        // const { HomeLatAtual, HomeLongAtual} = this.props.location.state;
        // console.log(HomeLatAtual, HomeLongAtual);
        //alert(this.props.HomeLatAtual)
        return (
            <div id="Home">
                <h1>Estafeta</h1>
                <p>Olá estafeta {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>

                <ClientesReservas
                    LatAtual={this.props.HomeLatAtual}
                    LongAtual={this.props.HomeLongAtual}
                />

                <div id="btn_notification">
                    <button onClick={() => this.btnClicked()}>Subscreva para receber notificações</button>
                </div>
            </div>

        );
    }


    click = () => {
        this.props.paraSair();
    }

    btnClicked() {
        askForPermissioToReceiveNotifications(var_noti);
        document.getElementById('btn_notification').innerHTML = '';
    }

}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(HomeEstafeta);