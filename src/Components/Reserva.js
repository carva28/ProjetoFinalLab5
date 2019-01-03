import React, { Component } from 'react';
import firebase from "firebase";
import carrinho from '../imgs/shop.png';
import { Link } from 'react-router-dom';
import Camisas from './Roupa/Camisas';
import Calcas from './Roupa/Calcas';
import Camisolas from './Roupa/Camisolas';
import Casacos from './Roupa/Casacos';
import Desporto from './Roupa/Desporto';
import Interior from './Roupa/Interior';
import La from './Roupa/La';
import Pijama from './Roupa/Pijama';
import Vestido from './Roupa/Vestido';

export default class componentName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      camisas: 0,
      calcas: 0,
      camisolas: 0,
      casacos: 0,
      desporto: 0,
      interior: 0,
      la: 0,
      pijama: 0,
      vestido: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.mudaData = this.mudaData.bind(this);

    firebase.database().ref('roupa').on('value', (data) => {
      console.log(data.toJSON());
    })
  }

  increment() {
    document.getElementById('btn_finaliza_compra').style.display = "block";
    this.setState({ camisas: this.state.camisas + 1 });
  }

  increment2() {
    document.getElementById('btn_finaliza_compra').style.display = "block";
    this.setState({ calcas: this.state.calcas + 1 });
  }

  increment3() {
    document.getElementById('btn_finaliza_compra').style.display = "block";
    this.setState({ camisolas: this.state.camisolas + 1 });
  }

  increment4() {
    document.getElementById('btn_finaliza_compra').style.display = "block";
    this.setState({ casacos: this.state.casacos + 1 });
  }

  increment5() {
    document.getElementById('btn_finaliza_compra').style.display = "block";
    this.setState({ desporto: this.state.desporto + 1 });
  }

  increment6() {
    document.getElementById('btn_finaliza_compra').style.display = "block";
    this.setState({ interior: this.state.interior + 1 });
  }

  increment7() {
    document.getElementById('btn_finaliza_compra').style.display = "block";
    this.setState({ la: this.state.la + 1 });
  }

  increment8() {
    document.getElementById('btn_finaliza_compra').style.display = "block";
    this.setState({ pijama: this.state.pijama + 1 });
  }

  increment9() {
    document.getElementById('btn_finaliza_compra').style.display = "block";
    this.setState({ vestido: this.state.vestido + 1 });
  }

  decrement() {
    if (this.state.camisas > 0) {
      this.setState({ camisas: this.state.camisas - 1 });
    }

    if (this.state.camisas < 0) {
      this.setState({ camisas: 0 });
    }

    if (this.state.camisas < 1) {
      //ele limpa ao segundo clique do menos
      document.getElementById('btn_finaliza_compra').style.display = "none";
    }
  }

  decrement2() {
    if (this.state.calcas > 0) {
      this.setState({ calcas: this.state.calcas - 1 });
    }

    if (this.state.calcas < 0) {
      this.setState({ calcas: 0 });
    }

    if (this.state.calcas < 1) {
      //ele limpa ao segundo clique do menos
      document.getElementById('btn_finaliza_compra').style.display = "none";
    }
  }

  decrement3() {
    if (this.state.camisolas > 0) {
      this.setState({ camisolas: this.state.camisolas - 1 });
    }

    if (this.state.camisolas < 0) {
      this.setState({ camisolas: 0 });
    }

    if (this.state.camisolas < 1) {
      //ele limpa ao segundo clique do menos
      document.getElementById('btn_finaliza_compra').style.display = "none";
    }
  }

  decrement4() {
    if (this.state.casacos > 0) {
      this.setState({ casacos: this.state.casacos - 1 });
    }

    if (this.state.casacos < 0) {
      this.setState({ casacos: 0 });
    }

    if (this.state.casacos < 1) {
      //ele limpa ao segundo clique do menos
      document.getElementById('btn_finaliza_compra').style.display = "none";
    }
  }

  decrement5() {
    if (this.state.desporto > 0) {
      this.setState({ desporto: this.state.desporto - 1 });
    }

    if (this.state.desporto < 0) {
      this.setState({ desporto: 0 });
    }

    if (this.state.desporto < 1) {
      //ele limpa ao segundo clique do menos
      document.getElementById('btn_finaliza_compra').style.display = "none";
    }
  }

  decrement6() {
    if (this.state.interior > 0) {
      this.setState({ interior: this.state.interior - 1 });
    }

    if (this.state.interior < 0) {
      this.setState({ interior: 0 });
    }

    if (this.state.interior < 1) {
      //ele limpa ao segundo clique do menos
      document.getElementById('btn_finaliza_compra').style.display = "none";
    }
  }

  decrement7() {
    if (this.state.la > 0) {
      this.setState({ la: this.state.la - 1 });
    }

    if (this.state.la < 0) {
      this.setState({ la: 0 });
    }

    if (this.state.la < 1) {
      //ele limpa ao segundo clique do menos
      document.getElementById('btn_finaliza_compra').style.display = "none";
    }
  }

  decrement8() {
    if (this.state.pijama > 0) {
      this.setState({ la: this.state.pijama - 1 });
    }

    if (this.state.pijama < 0) {
      this.setState({ pijama: 0 });
    }

    if (this.state.pijama < 1) {
      //ele limpa ao segundo clique do menos
      document.getElementById('btn_finaliza_compra').style.display = "none";
    }
  }

  decrement9() {
    if (this.state.vestido > 0) {
      this.setState({ vestido: this.state.vestido - 1 });
    }

    if (this.state.vestido < 0) {
      this.setState({ vestido: 0 });
    }

    if (this.state.vestido < 1) {
      //ele limpa ao segundo clique do menos
      document.getElementById('btn_finaliza_compra').style.display = "none";
    }
  }

  render() {
    var Data = ["Selecione uma hora", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
      MakeItem = function (X, index) {
        return <option key={index} value={X}>{X}</option>;
      };

    const { reservaLati, reservaLong } = this.props.location.state;

    return (
      <div id="Reserva">
        <h1>Reserva</h1>
        <p>Preencha as suas informações de contacto:</p>
        <input type="number" id="numTlmv" placeholder="Telemóvel" value={this.state.tlmv} onChange={(event) => this.MudaTlmv(event)} />

        <p>Que roupas pretende lavar?</p>

        <div id="Roupas">
          <Camisas camisas={this.state.camisas} inc={() => this.increment()} dec={() => this.decrement()} />
          <Calcas calcas={this.state.calcas} inc2={() => this.increment2()} dec2={() => this.decrement2()} />
          <Camisolas camisolas={this.state.camisolas} inc3={() => this.increment3()} dec3={() => this.decrement3()} />
          <Casacos casacos={this.state.casacos} inc4={() => this.increment4()} dec4={() => this.decrement4()} />
          <Desporto desporto={this.state.desporto} inc5={() => this.increment5()} dec5={() => this.decrement5()} />
          <Interior interior={this.state.interior} inc6={() => this.increment6()} dec6={() => this.decrement6()} />
          <La la={this.state.la} inc7={() => this.increment7()} dec7={() => this.decrement7()} />
          <Pijama pijama={this.state.pijama} inc8={() => this.increment8()} dec8={() => this.decrement8()} />
          <Vestido vestido={this.state.vestido} inc9={() => this.increment9()} dec9={() => this.decrement9()} />
        </div>

        <p>Escolha o dia e hora para a recolha da sua roupa.</p>

        <p className="inputReserva">Dia:</p><input value={this.data} onChange={this.mudaData} type="date" id="data" name="meeting-time" required />

        <div id="selectTempo">
          <p className="inputReserva">Hora:</p><select value={this.state.value} onChange={this.handleChange}>{Data.map(MakeItem)}</select>
        </div>

        <div id="btn_finaliza_compra">
          <Link to={{
            pathname: '/pagamento', state: {
              nrcamisas: this.state.camisas,
              nrcalcas: this.state.calcas,
              nrcamisolas: this.state.camisolas,
              nrcasacos: this.state.casacos,
              nrdesporto: this.state.desporto,
              nrinterior: this.state.interior,
              nrla: this.state.la,
              nrpijama: this.state.pijama,
              nrvestido: this.state.vestido,
              lat: reservaLati,
              long: reservaLong,
              hora: this.state.value,
              data: this.state.data,
              tlmv: this.state.tlmv
            }
          }}><img src={carrinho} alt="comprar" /><p>Pagamento</p></Link>
        </div>

      </div>
    )
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  mudaData(e) {
    this.setState({
      data: e.target.value
    });
  }

  MudaTlmv = (event) => {
    this.setState({
      tlmv: event.target.value
    })
  }

}