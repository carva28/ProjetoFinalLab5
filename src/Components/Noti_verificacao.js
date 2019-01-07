import React, { Component } from 'react';
import Notification from 'react-web-notification';
import firebase from "firebase";
import sound from '../sounds/sound.mp3';
import notImage from '../imgs/EstafetaNotificacao.png';

var varReserva;
export default class Noti_verificacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ignore: true,
      title: ''
    };
  }

  componentDidMount() {
    firebase.database().ref('Number/var_reserva').on('value', (data) => {
      varReserva = data.toJSON().a;
      this.waitForGood(varReserva);
    })
  }

  waitForGood = (varReserva) => {
    this.estaloops = setTimeout(() => {

      for (let est = 1; est < varReserva; est++) {
        firebase.database().ref("roupa/Encomenda" + est).on('value', (data) => {
          let estado = data.toJSON().estado;
          let emailCliente = data.toJSON().cliente;
          let varNotificacao = data.toJSON().varnotificacao;
          if (estado == 1 && emailCliente == firebase.auth().currentUser.email && varNotificacao == 0) {
            firebase.database().ref("roupa/Encomenda" + est).update({
              varnotificacao: '1'
            });
            this.jose();
          }
        })
      }

    }, 2000);
  }

  handlePermissionGranted() {
    console.log('Permission Granted');
    this.setState({
      ignore: false
    });
  }

  handlePermissionDenied() {
    console.log('Permission Denied');
    this.setState({
      ignore: true
    });
  }

  handleNotSupported() {
    console.log('Web Notification not Supported');
    this.setState({
      ignore: true
    });
  }

  handleNotificationOnClick(e, tag) {
    console.log(e, 'Notification clicked tag:' + tag);
  }

  handleNotificationOnError(e, tag) {
    console.log(e, 'Notification error tag:' + tag);
  }

  handleNotificationOnClose(e, tag) {
    console.log(e, 'Notification closed tag:' + tag);
  }

  handleNotificationOnShow(e, tag) {
    this.playSound();
    console.log(e, 'Notification shown tag:' + tag);
  }

  playSound(filename) {
    document.getElementById('sound').play();
  }

  jose = () => {
    this.estaloops = setTimeout(() => {
      if (this.state.ignore) {
        return;
      }

      const now = Date.now();

      const title = 'Wash Club' + now;
      const body = 'Estafeta a caminho';
      const tag = now;
      const icon = notImage;

      // Available options
      // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
      const options = {
        tag: tag,
        body: body,
        icon: icon,
        lang: 'en',
        dir: 'ltr',
        sound: sound  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
      }
      this.setState({
        title: title,
        options: options
      });

    }, 1000);
  }


  render() {
    return (
      <div>
        <Notification
          ignore={this.state.ignore && this.state.title !== ''}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          onShow={this.handleNotificationOnShow.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={5000}
          title={this.state.title}
          options={this.state.options}
        />
        <audio id='sound' preload='auto'>
          <source src={sound} type='audio/mpeg' />
          <source src='../sounds/sound.ogg' type='audio/ogg' />
          <embed hidden={true} src='../sounds/sound.mp3' />
        </audio>
      </div>
    )
  }
}
