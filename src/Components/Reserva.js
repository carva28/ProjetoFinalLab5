import React, { Component } from 'react';
import firebase from "firebase";
import camisa from '../imgs/camisa.png';
import calca_img from '../imgs/calcas_img.png';
import carrinho from '../imgs/shop.png';
import { Link } from 'react-router-dom';

var teste;

export default class componentName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      camisas: 0,
      calcas: 0
    }

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.increment2 = this.increment2.bind(this);
    this.decrement2 = this.decrement2.bind(this);

    firebase.database().ref('roupa').on('value', (data) => {
      console.log(data.toJSON());

    })

    firebase.database().ref('Number').on('value', (data) => {
      console.log(data.toJSON().a);
      teste = data.toJSON().a;
    })

  }

  get camisas() {
    return this.state.camisas;
  }

  get calcas() {
    return this.state.calcas;
  }

  increment() {
    const { max } = this.props;

    if (typeof max === 'number' && this.camisas >= max) return;
    document.getElementById('btn_finaliza_compra').style.display = "block";

    this.setState({ camisas: this.camisas + 1 });
  }

  decrement() {
    const { min } = this.props;

    if (typeof min === 'number' && this.camisas <= min) {
      return this.camisas;

    }
    if (this.camisas > 0) {
      this.setState({ camisas: this.camisas - 1 });
    }

    if (this.camisas < 0) {
      this.setState({ camisas: 0 });
    }

    if (this.camisas < 1) {
      //ele limpa ao segundo clique do menos
      document.getElementById('btn_finaliza_compra').style.display = "none";
    }
  }

  increment2() {
    const { max } = this.props;

    if (typeof max === 'number' && this.calcas >= max) return;
    document.getElementById('btn_finaliza_compra').style.display = "block";

    this.setState({ calcas: this.calcas + 1 });
  }

  decrement2() {
    const { min } = this.props;

    if (typeof min === 'number' && this.calcas <= min) {
      return this.calcas;

    }
    if (this.calcas > 0) {
      this.setState({ calcas: this.calcas - 1 });
    }

    if (this.calcas < 0) {
      this.setState({ calcas: 0 });
    }

    if (this.calcas < 1) {
      //ele limpa ao segundo clique do menos
      document.getElementById('btn_finaliza_compra').style.display = "none";
    }
  }

  render() {
    return (
      <div>

        <div id="Reserva">
          <div className="caixinha">
            <img src={camisa} alt="camisa-wash-club" />
            <h4>Camisa</h4>

            <div className="botoesReserva">
              <button className="btn_increm" type="button" onClick={this.decrement} >&minus;</button>
              <span>{this.camisas}</span>
              <button className="btn_increm" type="button" onClick={this.increment}>&#43;</button>
            </div>
          </div>

          <div className="caixinha">
            <img src={calca_img} alt="camisa-wash-club" />
            <h4>Calças</h4>

            <div className="botoesReserva">
              <button className="btn_increm" type="button" onClick={this.decrement2} >&minus;</button>
              <span>{this.calcas}</span>
              <button className="btn_increm" type="button" onClick={this.increment2}>&#43;</button>
            </div>
          </div>
        </div>
        
        <Link to={{ pathname: '/pagamento', state: { nrcamisas: this.value, nrcalcas: this.calcas, lat: this.props.reservaLati, long: this.props.reservaLong } }}>
          <div id="btn_finaliza_compra">
            <img src={carrinho} alt="comprar" />
            <p>Pagamento</p>
          </div>
        </Link>

      </div>
    )
  }
}