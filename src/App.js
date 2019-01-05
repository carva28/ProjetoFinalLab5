import React, { Fragment } from 'react';
import './styles.css';
import Login from './Components/Login';
import firebase from "firebase";
import VerificaUser from './Components/VerificaUser';

var toggle = 'fechado';
var var_estafeta;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isSignedIn: false,
      cargo: null,
      arrayestafeta: []
    }
  }

  toggleLista = () => {
    console.log(toggle);
    var lista = document.getElementById('ListaMenu');

    if (toggle === 'fechado') {
      lista.style.display = 'block';
      toggle = 'aberto';
    } else if (toggle === 'aberto') {
      lista.style.display = 'none';
      toggle = 'fechado';
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        this.setState({
          user: user,
          isSignedIn: !!user
        })

        firebase.database().ref('Number/var_estafeta').on('value', (data) => {
          console.log(data.toJSON().d);
          var_estafeta = data.toJSON().d;
        })

        this.estaloops = setTimeout(() => {
          for (let est = 1; est <= var_estafeta; est++) {
            firebase.database().ref("Utilizadores/Estafeta/estafeta0" + est + "").on('value', (data) => {
              
              if (user.email === data.toJSON().emailestafeta) {

                this.setState({
                  cargo: 'estafeta'
                });

              } else if (user.email != data.toJSON().emailestafeta) {

                this.setState({
                  cargo: 'cliente'
                });

              }
            })
          }
        }, 1000);

      }

    })
  }

  render() {

    if (this.state.isSignedIn === true && this.state.cargo !== null) {

      return (
        <VerificaUser papel={this.state.cargo} />
      );

    } else {

      return (
        <div>
          <Login />
        </div>
      )

    }
  }

}