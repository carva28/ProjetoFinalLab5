import React, { Component } from 'react';
import firebase from "firebase";
import Login from './Login';
import Distance from './Distance';
import GeoLocation from './GeoLocation';
import List from './List';
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
                    
                    <GeoLocation/>
                    <List />
                    {/* <Distance
                        currentLatitude={41.200046}
                        currentLongitude={-8.508542}
                        destinationLatitude={41.149600}
                        destinationLongitude={-8.611000}
               
                    /> */}
                    
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