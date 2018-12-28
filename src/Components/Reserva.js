import React, { Component } from 'react';
import firebase from "firebase";
import camisa from '../imgs/camisa.png';
import calca_img from '../imgs/calcas_img.png';
import carrinho from '../imgs/shopp.png';
var teste;
     

export default class componentName extends Component {

    


    state = {
      value: 0,
      calcas: 0,
    }
  
    constructor() {
    super();
      
      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
      this.increment2 = this.increment2.bind(this);
      this.decrement2 = this.decrement2.bind(this);

      firebase.database().ref('roupa').on('value', (data) => {
        console.log(data.toJSON());
       
        })

        firebase.database().ref('Number').on('value', (data) => {
          console.log(data.toJSON().a);
          teste=data.toJSON().a;
      })
        
    }
    
    get value() {
      return this.state.value;
      
    }

    get calcas(){
      return this.state.calcas;
    }
    
    increment() {
      const { max } = this.props;
      
      if (typeof max === 'number' && this.value >= max) return;
      document.getElementById('btn_finaliza_compra').style.display="block";
      
      this.setState({ value: this.value + 1 });
    }
  
    decrement() {
      const { min } = this.props;

      if(typeof min === 'number' && this.value <= min){
        return this.value;
        
      }
      if(this.value > 0 ){
        this.setState({ value: this.value - 1 });
      }

      if(this.value < 0 ) {
        this.setState({ value: 0});
      }

      if(this.value == 0 ) {
        //ele limpa ao segundo clique do menos
        document.getElementById('btn_finaliza_compra').style.display="none";
      }
    }

    increment2() {
      const { max } = this.props;
      
      if (typeof max === 'number' && this.calcas >= max) return;
      document.getElementById('btn_finaliza_compra').style.display="block";
      
      this.setState({ calcas: this.calcas + 1 });
    }

    decrement2() {
      const { min } = this.props;

      if(typeof min === 'number' && this.calcas <= min){
        return this.calcas;
        
      }
      if(this.calcas > 0 ){
        this.setState({ calcas: this.calcas - 1 });
      }

      if(this.calcas < 0 ) {
        this.setState({ calcas: 0});
      }

      if(this.calcas == 0 ) {
        //ele limpa ao segundo clique do menos
        document.getElementById('btn_finaliza_compra').style.display="none";
      }
    }

    render() {
      // for(let i = 0; i<5;i++){

  //       document.getElementById('reservas').innerHTML +="<div id='reserva"+i+"' className='input-number' style={this.props.style}>"+
  //       "<div className='caixinha"+i+"'>"+
  //         "<img src={camisa} alt='camisa-wash-club'/>"+
  //         "<h4>Camisa</h4>"+
  //         "<button className='btn_increm"+i+"' type='button' onClick={this.decrement} >&minus;</button>"+
  //             "<span>{this.value}</span>"+
  //         "<button className='btn_increm' type='button' onClick={this.increment}>&#43;</button>"+   
  //       "</div>"+
  // "</div>"+
  // "<div id='btn_finaliza_compra'>"+
  //       "<button id='btn_compra' type='button'><img src={carrinho} alt='comprar' /></button>"+  
  // "</div>";
        
  //       document.getElementById('reserva'+i).style.marginLeft += 10 + "px";

      //}

      
      
      
        
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

        <div id="Reserva" className="input-number" style={this.props.style}>
              <div className="caixinha">
                <img src={calca_img} alt="camisa-wash-club"/>
                <h4>Calças</h4>
                <button className="btn_increm" type="button" onClick={this.decrement2} >&minus;</button>
                    <span>{this.calcas}</span>
                <button className="btn_increm" type="button" onClick={this.increment2}>&#43;</button>   
              </div>  
        </div>
        <div id="btn_finaliza_compra">
              <button id="btn_compra" type="button" onClick={() => this.fazReserva()}><img src={carrinho} alt="comprar" /></button>  
        </div>
        

      </div>
    )
  }

 



  fazReserva = () => {
    let rand;
    // const min = 1;
    // const max = 2 ;
    
    var exists = [];
 
    // rand = parseInt(min + Math.random() * (max - min)); 
    // console.log(rand);

  

    

    for(let l=teste;l < teste+1;l++) {
      do {
        if(this.value>0){
      
          firebase.database().ref("roupa/Encomenda"+teste+"").set(
            { 
              NrCamisas:this.value,
              NrCalças:this.calcas,
            }
          ).then(() => {
            console.log("inserido com sucesso");
            //alert("Inserido com Sucesso");
          }).catch((error) =>{
            console.log(error);
          });
        }
      } while (exists[rand]);
      console.log(exists);
      exists[l]=rand;
    }
    teste++;
    console.log("incrementou"+teste);

    firebase.database().ref("Number").set(
      { 
        a:teste,
      })


    firebase.database().ref('roupa').on('value', (data) => {
        console.log(data.toJSON());
    })

}
}

