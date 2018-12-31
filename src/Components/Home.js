import React, { Component } from 'react';
import Mapa from './Mapa';
import { geolocated } from 'react-geolocated';
import { askForPermissioToReceiveNotifications } from '../push-notifcation';
import firebase from "firebase";
import { Link } from 'react-router-dom';

var var_user,verificaemail,totalUsers,u_email;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false
        }
 

        firebase.database().ref('Number/var_utilizadores').on('value', (data) => {
            console.log(data.toJSON().c);
            var_user=data.toJSON().c;
        })   


        //Descobrir quantos users existem
        firebase.database().ref("Utilizadores/Normal/").on('value', function(snapshot) {
            console.log(snapshot.val());
            
            //console.log(snapshotToArray(snapshot));
            //console.log(data.numChildren())
           
            
        })
        
    }
    
    componentDidMount() {
        
        
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
                this.setState({ isSignedIn: !!user })
                console.log("user", user)
                console.log("email", user.email) 
                u_email =user.email;
                
            } else {
                this.setState({ user: null });
            }
        })
        
        this.esperaLoop(u_email);

    }


    esperaLoop = (email) => {
        this.esperaloops = setTimeout(() =>{
            
               //MUDAR O 3 PARA NUMERO TOTAL DE USERS
                for(let v=2;v<3;v++){
                    firebase.database().ref("Utilizadores/Normal/cliente"+v+"").on('value', (data) => {
                         verificaemail=data.toJSON().emailCliente;
                         console.log(verificaemail);
                         console.log("aqui");
                         this.verificaUser(email);
    
                        })
                    }
               
            
           
        }, 5000);
    } 

    verificaUser = (email) =>{
        this.esperaMail = setTimeout(() => {
            if(verificaemail != email){
                
                alert("ola sasasose");
            }else{
                //DESCOMENTAR QUANDO FUNCIONAR
                //this.adicionaUser();
                alert("oi jose");
            }
        }, 3000);
        
    }

    adicionaUser = () => {

        this.espera = setTimeout(() => {
            for(let l=var_user;l < var_user+1;l++) {
                firebase.database().ref("Utilizadores/Normal/cliente"+var_user+"").set(
                    { 
                        cliente: firebase.auth().currentUser.displayName,
                        emailCliente: firebase.auth().currentUser.email
                    }
                    )
                }
                var_user++;
            
        
            firebase.database().ref("Number/var_utilizadores").set(
            { 
                c:var_user,
            })
        }, 7000);

        
    }

    componentWillUnmount(){
        clearTimeout(this.espera,this.esperaMail,this.esperaloops)
    }

    render() {
        if (this.props.coords != null) {
            return (
                <div id="Home">
                    <h1>Lavandarias próximas</h1>
                    <p>Olá {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>

                    <Mapa
                        LatAtual={this.props.coords.latitude}
                        LongAtual={this.props.coords.longitude} />

                    <Link to={{ pathname: '/reserva',
                        state:{
                            reservaLati:this.props.coords.latitude,
                            reservaLong:this.props.coords.longitude,
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

                    {/* <Mapa /> */}

                    {/* <button onClick={() => this.roupa()}>Reserve agora</button> */}
                </div>
            );
        }
    }

    click = () => {
        this.props.paraSair();
    }

    // roupa = () => {
    //     this.reserva.current.fazReserva();
    // }

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