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
            cargo: '',
            coordEstafLat:'',
            coordEstafLong:'',
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
        if (this.props.coords != null) {
                return (
                    <div id="Home">
                        <h1>Lavandarias próximas</h1>
                        <p>Olá {firebase.auth().currentUser.displayName}! Veja os clientes no Mapa.</p>

                        <ClientesReservas />
                    
                  

                    </div>
                )
        }else{
            return(
                <div id="Home">
                     <h1>Lavandarias próximas</h1>
                    <p>Olá {firebase.auth().currentUser.displayName}! Veja os clientes no Mapa.</p>

                </div>
            );
        }
                
        
    }
    click = () => {
        this.props.paraSair();
    }

    attencion = (carguito) => {
        this.timerzito = setTimeout(() => {
            alert(carguito)
            this.setState({
                cargo: carguito,
            })
            this.render();
        }, 1000);
    }

 

}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(Home);