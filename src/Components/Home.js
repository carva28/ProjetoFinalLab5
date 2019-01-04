import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import { askForPermissioToReceiveNotifications } from '../push-notifcation';
import firebase from "firebase";
import ClientesReservas from './ClientesReservas';

var var_user,verificaemail,u_email,cargo,var_noti,var_estafeta,EstafEmail;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            array: [],
            var_estafeta:'',
            coordEstafLat:'',
            coordEstafLong:'',
        }

       

        firebase.database().ref('Number/var_estafeta').on('value', (data) => {
            console.log(data.toJSON().d);
            this.setState({
                var_estafeta:data.toJSON().d
            })
           
        }) 

        
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


        

    }


    
    render() {

            
                
                return(
                    <div id="Home">
                        <h1>Estafeta</h1>
                        <p>Olá estafeta {firebase.auth().currentUser.displayName}! Veja no seguinte mapa as lavandarias mais próximas de si.</p>
                        
                        <ClientesReservas 
                            LatAtual={this.state.coordEstafLat}
                            LongAtual={this.state.coordEstafLong} 

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
       
        document.getElementById('btn_notification').innerHTML='';
    }

}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(Home);