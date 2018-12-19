import React, { Component } from 'react';
import firebase from "firebase";


export default class componentName extends Component {
  
    fazReserva = () => {
        firebase.database().ref('roupa/new2').set(
            { 
              name:"Bali",
              marca:"A",
            }
          ).then(() => {
            console.log("inserido com sucesso");
            alert("Inserido com Sucesso");
          }).catch((error) =>{
            console.log(error);
          });
    }
  
  
    render() {


        
    return (
      <div>
        
      </div>
    )
  }
}
