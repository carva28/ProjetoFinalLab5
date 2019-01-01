import React, { Component } from 'react';
import Mapa from './Mapa';
import { geolocated } from 'react-geolocated';
import { askForPermissioToReceiveNotifications } from '../push-notifcation';
import firebase from "firebase";
import { Link } from 'react-router-dom';

var var_user,verificaemail,u_email,cargo,var_noti;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            array: [],
            arrayestafeta: [],
        }
        firebase.database().ref('Number/var_notificacao').on('value', (data) => {
            console.log(data.toJSON().b);
            var_noti=data.toJSON().b;
          }) 

        firebase.database().ref('Number/var_utilizadores').on('value', (data) => {
            console.log(data.toJSON().c);
            var_user=data.toJSON().c;
            cargo = 'cliente';
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
        
        this.esperaLoop();

    }


    esperaLoop = () => {

       
        this.esperaloops = setTimeout(() =>{
            
                for(let v=1;v<var_user;v++){
                    firebase.database().ref("Utilizadores/Normal/cliente"+v+"").on('value', (data) => {
                         verificaemail=data.toJSON().emailCliente;
                         this.state.array.push(verificaemail)
                        })
                    }

                    this.verificaUser();
        }, 8000);
    } 

    verificaUser = () =>{

        this.esperaMail = setTimeout(() => {
            for(let u=0; u<this.state.array.length;u++){
                
                if(this.state.array[u] != u_email){
                    this.adicionaUser();
                }else{
                    console.log("Conta já existente");
                    break;
                }
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
        if (this.props.coords != null && cargo =='cliente') {
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
        } else if(cargo == 'estafeta'){
            return (
                <div id="Home">
                </div>
            );
        }else {
            return (
                <div id="Home">
                    <h1>Lavandarias próximas</h1>
                    <p>Olá {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>

                </div>
            );
        }

    }

    click = () => {
        this.props.paraSair();
    }

   

    btnClicked() {
        askForPermissioToReceiveNotifications(var_noti);
       
        document.getElementById('btn_notification').innerHTML='';
    }

}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(Home);