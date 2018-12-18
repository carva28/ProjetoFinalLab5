import React, { Component } from 'react';
import firebase from "firebase";
import Login from './Login';
import Mapa from './Mapa';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
                this.setState({ isSignedIn: !!user })
                console.log("user", user)
                console.log("email", user.email)
            } else {
                this.setState({ user: null });
            }
        })
    }

    render() {
        if (this.state.isSignedIn === true) {
            return (
                <div id="Home">
                    <h1>Lavandarias próximas</h1>
                    <p>Olá {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>

                    {/*Botão de Sair*/}
                    <span>
                        <button onClick={() => this.signOut()}>Sair</button>
                    </span>

                    <Mapa />

                    <button>Reserve agora</button>
                </div>
            );
        } else {
            return (
                <div>
                    <Login />
                </div>
            );
        }
    }

    signOut = () => {
        this.setState({
            isSignedIn: false
        })
        firebase.auth().signOut();
    }

}