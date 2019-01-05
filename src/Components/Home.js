import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import firebase from "firebase";
import ClientesReservas from './ClientesReservas';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            array: [],
            arrayestafeta: [],
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
    }

    render() {
        if (this.props.coords != null) {
            return (
                <div id="Home">
                    <h1>Lavandarias próximas</h1>
                    <p>Olá {firebase.auth().currentUser.displayName}! Veja os clientes no Mapa.</p>

                    <ClientesReservas />
                </div>
            )
        } else {
            return (
                <div id="Home">
                    <h1>Lavandarias próximas</h1>
                    <p>Olá {firebase.auth().currentUser.displayName}! Veja os clientes no Mapa.</p>
                </div>
            );
        }
    }

    /* click = () => {
        this.props.paraSair();
    } */

}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(Home);