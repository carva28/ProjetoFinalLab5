import React, { Component } from 'react';
import firebase from "firebase";
import sound from '../sounds/sound.mp3';
import fechar from '../imgs/fecharNotificacao.png';

var varReserva;

export default class VerificaNotificacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ignore: true,
      title: '',
      varNotif: null
    };
    this.contaNrReservas();
  }

  contaNrReservas = () => {
    this.temporizador = setTimeout(() => {

      firebase.database().ref('Number/var_reserva').on('value', (data) => {
        varReserva = data.toJSON().a;
        this.waitForGood(varReserva);
      })

    }, 500);
  }

  waitForGood = (varReserva) => {
    this.estaloops = setTimeout(() => {

      for (let est = 1; est < varReserva; est++) {
        firebase.database().ref("roupa/Encomenda" + est).on('value', (data) => {
          let estado = data.toJSON().estado;
          let emailCliente = data.toJSON().cliente;
          var varNotificacao = data.toJSON().varnotificacao;

          this.setState({
            varNotif: varNotificacao
          })

          if (estado === 1 && emailCliente == firebase.auth().currentUser.email && varNotificacao == 0) {
            firebase.database().ref("roupa/Encomenda" + est).update({
              varnotificacao: '1'
            });
          }
        });
      }

      this.notificacao(this.state.varNotif);
    }, 800);
  }

  notificacao = (varNot) => {
    this.tempNotif = setTimeout(() => {
      this.setState({
        varNotif: varNot
      })
    }, 500)
  }

  render() {
    if (this.state.varNotif == 1) {
      return (
        <div>
          <div id="Notificacao">
            <img src={fechar} alt="fechar notificação" onClick={this.fecharNotif} />
            <p>O estafeta está a caminho.</p>
          </div>

          <audio id='sound' preload='auto' autoPlay>
            <source src={sound} type='audio/mpeg' />
            <source src={sound} type='audio/ogg' />
            <embed hidden={true} src='../sounds/sound.mp3' />
          </audio>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }

  fecharNotif = () => {
    document.getElementById('Notificacao').style.display = 'none';
  }

}