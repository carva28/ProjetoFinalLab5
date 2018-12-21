import React, { Component } from 'react';
import firebase from "firebase";
import Login from './Login';
import Mapa from './Mapa';
import {geolocated} from 'react-geolocated';
import Reserva from './Reserva';
import { askForPermissioToReceiveNotifications } from '../push-notifcation';

class Home extends Component {
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
            if (this.props.coords != null) {
                return (
                    <div>
                        <div id="Home">
                            <h1>Lavandarias próximas</h1>
                            <p>Olá {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>
        
                            {/*Botão de Sair*/}
                            <span>
                                <button onClick={() => this.signOut()}>Sair</button>
                            </span>
        
                            <Mapa
                                LatAtual={this.props.coords.latitude}
                                LongAtual={this.props.coords.longitude} />
        
                            <button>Reserve agora</button>
                            <button onClick={() => this.btnClicked()}>Alert test</button>
                        </div>

                        <a href="/reserva">olá</a>
                        <Reserva />
                    </div>
                );
            } else {
                return (
                    <div id="Home">
                        <h1>Lavandarias próximas</h1>
                        <p>Olá {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>
    
                        {/*Botão de Sair*/}
                        <span>
                            <button onClick={() => this.signOut()}>Sair</button>
                        </span>
    
                        <Mapa />
    
                        {/* <Reserva ref={this.reserva}/> */}
                        
                        {/* <button onClick={() => this.roupa()}>Reserve agora</button> */}
                    </div>
                );
            }
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

    // roupa = () => {
    //     // this.reserva.current.fazReserva();
        
    // }
 
    btnClicked(){
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