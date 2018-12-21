import React, { Component } from 'react';
import firebase from "firebase";
import camisa from '../imgs/camisa.png';


export default class componentName extends Component {
  
    // fazReserva = () => {
    //     firebase.database().ref('roupa/new2').set(
    //         { 
    //           name:"Bali",
    //           marca:"A",
    //         }
    //       ).then(() => {
    //         console.log("inserido com sucesso");
    //         alert("Inserido com Sucesso");
    //       }).catch((error) =>{
    //         console.log(error);
    //       });
    // }
    state = {
      value: 0,
    }
  
    constructor() {
      super();
      
      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
    }
    
    get value() {
      return this.state.value;
    }
    
    increment() {
      const { max } = this.props;
      
      if (typeof max === 'number' && this.value >= max) return;
      document.getElementById('btn_finaliza_compra').style.display="block";
      
      this.setState({ value: this.value + 1 });
    }
  
    decrement() {
      const { min } = this.props;
      
      //if (typeof min === 'number' && this.value <= min) return;

      if(typeof min === 'number' && this.value <= min){
        return this.value;
        
      }
      if(this.value > 0){
        this.setState({ value: this.value - 1 });
      }

      if(this.value < 0) {
        document.getElementById('btn_finaliza_compra').style.display="none";
        this.setState({ value: 0});
      }
      
    }


    render() {


        
    return (
      
      <div >
      <div id="Reserva" className="input-number" style={this.props.style}>
      <div className="caixinha">
      <img src={camisa} alt="camisa-wash-club"/>
      <h4>Camisa</h4>
        <button className="btn_increm" type="button" onClick={this.decrement} >&minus;</button>
            <span>{this.value}</span>
        <button className="btn_increm" type="button" onClick={this.increment}>&#43;</button>   
        </div>  
      </div>

        <div id="btn_finaliza_compra">
          <button id="btn_compra" type="button">🛒</button>  
        </div>
      

      </div>
    )
  }
}

