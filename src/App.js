import React, { Fragment } from 'react';
import './styles.css';
import Login from './Components/Login';
import Home from './Components/Home';
import firebase from "firebase";
import menu from './imgs/menu.png';
import menu01 from './imgs/menu01.png';
import menu02 from './imgs/menu02.png';
import menu03 from './imgs/menu03.png';
import { BrowserRouter, Link, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Reserva from './Components/Reserva';
import Pagamento from './Components/Pagamento';
import Pedidos from './Components/Pedidos';

var toggle = 'fechado';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isSignedIn: false
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
          user
        });
        this.setState({
          isSignedIn: !!user
        })
        console.log("user", user)
        console.log("email", user.email)
      } else {
        this.setState({
          user: null
        });
      }
    })
  }

  render() {

    if (this.state.isSignedIn === true) {
      return (
        <BrowserRouter>
          <Fragment>
            
            <div>
              <div id="Menu">
                <h2>washClub</h2>
                <img src={menu} alt="menu" onClick={() => this.toggleLista()} />
                <div id="ListaMenu">
                  <img src={menu01} alt="menu1" /><li><Link to="/">Home</Link></li>
                  <img src={menu02} alt="menu2" /><li><Link to="/pedidos">Pedidos</Link></li>
                  <img src={menu03} alt="menu3" /><li>Definições</li>
                  <li onClick={this.signOut}>Sair</li>

                </div>
              </div>

              <Switch>
                <Route path='/' exact strict component={Home} />
                <Route path='/pagamento' component={Pagamento} />
                <Route path='/reserva' component={Reserva} />
                <Route path='/pedidos' component={Pedidos} />
              </Switch>
            </div>
            
          </Fragment>
        </BrowserRouter>
      )
    } else {
      return (
        <div>
          <Login />
        </div>
      )
    }
  }

  signOut = () => {
    this.setState({
      isSignedIn: false
    })
    firebase.auth().signOut();
  }

}