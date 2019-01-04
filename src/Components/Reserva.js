import React, { Component } from 'react';
import firebase from "firebase";
import camisa from '../imgs/camisa.png';
import calca_img from '../imgs/calcas_img.png';
import carrinho from '../imgs/shop.png';
import {Link} from 'react-router-dom';
 
     

export default class componentName extends Component {

    


    state = {
      camisas: 0,
      calcas: 0,
    }
  
    constructor(props) {
    super(props);
      
      this.handleChange = this.handleChange.bind(this);
      this.mudaData = this.mudaData.bind(this);
      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
      this.increment2 = this.increment2.bind(this);
      this.decrement2 = this.decrement2.bind(this);

      firebase.database().ref('roupa').on('value', (data) => {
        console.log(data.toJSON());
       
        })

        
    }

    
    
    get camisas() {
      return this.state.camisas;
      
    }

    get calcas(){
      return this.state.calcas;
    }
    
    increment() {
      const { max } = this.props;
      
      if (typeof max === 'number' && this.camisas >= max) return;
      document.getElementById('btn_finaliza_compra').style.display="block";
      
      this.setState({ camisas: this.camisas + 1 });
    }
  
    decrement() {
      const { min } = this.props;

      if(typeof min === 'number' && this.camisas <= min){
        return this.camisas;
        
      }
      if(this.camisas > 0 ){
        this.setState({ camisas: this.camisas - 1 });
      }

      if(this.camisas < 0 ) {
        this.setState({ camisas: 0});
      }

      if(this.camisas <1 ) {
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

      if(this.calcas <1 ) {
        //ele limpa ao segundo clique do menos
        document.getElementById('btn_finaliza_compra').style.display="none";
      }
    }

    render() {
     

       var Data     = ["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"],
            MakeItem = function(X) {
                return <option key={X} value={X}>{X}</option>;
            };

            const { reservaLati, reservaLong} = this.props.location.state;
            console.log(reservaLati, reservaLong);
      
        
    return (
      <div>
      <div >
        <div id="Reserva" className="input-number" style={this.props.style}>
              <div className="caixinha">
                <img src={camisa} alt="camisa-wash-club"/>
                <h4>Camisa</h4>
                <button className="btn_increm" type="button" onClick={this.decrement} >&minus;</button>
                    <span>{this.camisas}</span>
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

        </div>

        <div id="inputdata"> 
            <input value={this.data} onChange={this.mudaData} type="date" id="data" name="meeting-time" required/>
          </div>

          <div id="inputTempo"></div>
          <div id="selectTempo">
          
          <select value={this.state.value} onChange={this.handleChange}>{Data.map(MakeItem)}</select>
            
          </div>

        
        <div id="btn_finaliza_compra">
              <Link to={{ pathname: '/pagamento', state: { 
                nrcamisas:this.camisas, 
                nrcalcas: this.calcas, 
                lat:reservaLati,
                long:reservaLong,
                hora:this.state.value,
                data:this.state.data,
                
                } }}><button id="btn_compra" type="button" ><img src={carrinho} alt="comprar" /></button></Link>
        </div>



      </div>
    )
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    //alert("Vamos buscar a sua reserva às:"+event.target.value);
  }

  mudaData(e){
    this.setState({data:e.target.value});
    //alert("sua reserva dia:"+e.target.value);
  }
}