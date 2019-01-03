import React, { Component } from 'react'
import {  } from 'react-router-dom';
import firebase from "firebase";
import Mapa from './Mapa';
var varreserva;
export default class ClientesReservas extends Component {
    
    constructor(props){
        super(props);
        this.state= {
            encomendaCliente:[],
            encomendaLat:[],
            encomendaLong:[],
            encomendaNrCalças:[],
            encomendaNrCamisas:[],
        }
        
    }
    
    componentDidMount(){
        
        firebase.database().ref('Number/var_reserva').on('value', (data) => {
            console.log(data.toJSON().a);
            varreserva = data.toJSON().a;
            this.loops(varreserva);
        })
    }

    loops = (varreserva) => {

        
        alert('entra')
        console.log(varreserva);
        for(let est=2;est<varreserva;est++){
            firebase.database().ref("roupa/Encomenda"+est+"").on('value', (data) => {


                
                var nomecliente=data.toJSON().cliente;
                this.state.encomendaCliente.push(nomecliente)
                
                var latcliente=data.toJSON().CoordenadaLat;
                this.state.encomendaLat.push(latcliente)

                var longcliente=data.toJSON().CoordenadaLong;
                this.state.encomendaLong.push(longcliente)

                var Calcascliente=data.toJSON().NrCalças;
                this.state.encomendaNrCalças.push(Calcascliente)

                var Camisascliente=data.toJSON().NrCamisas;
                this.state.encomendaNrCamisas.push(Camisascliente)                

            })
           
            
        }

        this.srh();

        
       
        
    }

    srh = () => {
        this.verifica = setTimeout(() =>{
            
            for(let it=0; it<this.state.encomendaCliente.length; it++){
                console.log(
                    this.state.encomendaCliente[it],
                    this.state.encomendaLat[it],
                    this.state.encomendaLong[it],
                    this.state.encomendaNrCalças[it]
                 )

                document.getElementById('selectmain').innerHTML+=`
                    
                    <option value=${it}>${this.state.encomendaCliente[it]}</option>`;   

            }
            
        }, 1000);
    } 


  render() {
  
   

    return(
        <div>
             <select value={this.state.value} onChange={this.handleChange} id="selectmain"></select>
            <div id="main_info"></div>
        </div>
    );
        
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
    this.forInfo(event.target.value)
  }

  forInfo = (valor) => {
    for(let show=0; show<this.state.encomendaCliente.length; show++){
      if(valor == show){
          document.getElementById('main_info').innerHTML=`
          <div id='clienteInfo'>
            <h4>Cliente:<h6>${this.state.encomendaCliente[show]}</h6></h4>
            <h4>Coordenada Lat:<h6>${this.state.encomendaLat[show]}</h6></h4>
            <h4>Coordenada Long:<h6>${this.state.encomendaLong[show]}</h6></h4>
            <h4>Número de calças:<h6>${this.state.encomendaNrCalças[show]}</h6></h4>
            <h4>Número de camisas:<h6>${this.state.encomendaNrCamisas[show]}</h6></h4>
          </div>
          `;
          
return(<div>            <Mapa 
            destLatitude={this.state.encomendaLat[show]}
            destLatitude={this.state.encomendaLong[show]}
          /></div>
);
        
          
        break;
      }else{

      }
    }
    }
}
