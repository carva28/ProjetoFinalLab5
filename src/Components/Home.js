import React, { Component } from 'react';
import firebase from "firebase";
import Login from './Login';
import Mapa from './Mapa';
import {geolocated} from 'react-geolocated';
import Reserva from './Reserva';
import { askForPermissioToReceiveNotifications } from '../push-notifcation';

//var veri_btn_noti;

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


        //VERIFICA SE O USER JÁ RECEBE NOTIFICAÇÃO, SE SIM ENTÃO NÃO APARECE O BOTÃO
        
        // for(let j=0; j<1;j++){
        //     firebase.database().ref("Users/new"+j+"").on('value', (data) => {
        //         console.log("tou");
        //         console.log(data.toJSON().variavel);
        //         veri_btn_noti=data.toJSON().variavel;
        //       })
              
        // }
        // if(veri_btn_noti==1){
        //     document.getElementById('btn_notification').innerHTML='';
        // }
        
        
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
                            <div id="btn_notification">
                                <button onClick={() => this.btnClicked()}>Subscreva para receber notificações</button>
                            </div>
                        </div>

                        <Reserva 
                            reservaLati={this.props.coords.latitude}
                            reservaLong={this.props.coords.longitude}
                        />
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

    btnClicked(){
       askForPermissioToReceiveNotifications();
        document.getElementById('btn_notification').innerHTML='';
      }
      

}

export default geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })(Home);