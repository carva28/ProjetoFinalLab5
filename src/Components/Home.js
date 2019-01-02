import React, { Component } from 'react';
import Mapa from './Mapa';
import { geolocated } from 'react-geolocated';
import { askForPermissioToReceiveNotifications } from '../push-notifcation';
import firebase from "firebase";
import { Link } from 'react-router-dom';

var var_user,verificaemail,u_email,cargo,var_noti,var_estafeta,EstafEmail;
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
        })   

        firebase.database().ref('Number/var_estafeta').on('value', (data) => {
            console.log(data.toJSON().d);
            var_estafeta=data.toJSON().d;
           
        }) 

        
    }

    
    
    
    componentDidMount() {
        this.fazPausa();
        
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


        this.estafetaLoop();

    }


        
    estafetaLoop = () => {

       
        this.estaloops = setTimeout(() =>{
                for(let est=1;est<=var_estafeta;est++){
                    firebase.database().ref("Utilizadores/Estafeta/estafeta0"+est+"").on('value', (data) => {
                        console.log(data.toJSON());
                        EstafEmail=data.toJSON().emailestafeta;
                        console.log(EstafEmail);
                        this.state.arrayestafeta.push(EstafEmail)
                        
                        if( EstafEmail == u_email){
                    
                            cargo='estafeta';
                            
                        }else{
                            
                            cargo = 'cliente';
                            
                            this.esperaLoop();
                           
                        }


                        this.fazPausa();

                        })
                    }

                    
        }, 4000);
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
        }, 4000);
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
        }, 2000);
        
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
   
    
    fazPausa = () => {
       
        this.esperaloops = setTimeout(() =>{
            console.log("CARGO ⬇️");
            console.log(cargo);
            var jos=cargo
            this.render();
            return jos;
        }, 5000);
    } 

    componentWillUnmount(){
        clearTimeout(this.espera,this.esperaMail,this.esperaloops,this.estafetaLoop,this.esperaEstafMail,this.estaloops,this.atrasa,this.fazPausa)
    }
    
   

   
    
    render() {

        this.fazPausa();
        console.log('dentro do render'+ cargo);

        
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
            } if (this.props.coords != null && cargo =='estafeta') {

                return(
                    <div id="Home">
                        <h1>Estafeta</h1>
                        <p>Olá estafeta{firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>

                        <Mapa
                            LatAtual={this.props.coords.latitude}
                            LongAtual={this.props.coords.longitude} />

                        

                    </div>
                );

                }else {
                    return (
                        <div id="Home">
                            <h1>Lavandarias próximas</h1>
                            <p>Olá {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>
                            <button onClick ={() => this.attencion()}>Problemas? Clique aqui</button>
                            
                        </div>
                    );
                }
                
        
    }
    click = () => {
        this.props.paraSair();
    }

    attencion = () => {
        this.timerzito = setTimeout(() => {
            alert('atao')
            this.render();
        }, 1000);
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