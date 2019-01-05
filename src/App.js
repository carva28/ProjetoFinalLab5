import React, { Fragment } from 'react';
import './styles.css';
import Login from './Components/Login';
import firebase from "firebase";
import Home from './Components/Home';
import HomeEstafeta from './Components/HomeEstafeta';
import menu from './imgs/menu.png';
import menu01 from './imgs/menu01.png';
import menu02 from './imgs/menu02.png';
import menu03 from './imgs/menu03.png';
import menu04 from './imgs/menu04.png';
import { BrowserRouter, Link, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Reserva from './Components/Reserva';
import Pagamento from './Components/Pagamento';
import Pedidos from './Components/Pedidos';
import EncomendaEstafeta from './Components/EncomendaEstafeta';
import Estado0 from './Components/Estados/Estado0';
import Estado1 from './Components/Estados/Estado1';
import Estado2 from './Components/Estados/Estado2';
import Estado3 from './Components/Estados/Estado3';
import Arquivo from './Components/Arquivo';

var toggle = 'fechado';
var var_estafeta;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isSignedIn: false,
      cargo: null,
      arrayestafeta: [],
      coordEstafLat: '',
      coordEstafLong: '',

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
                  cargo: 'estafeta',
                  coordEstafLat: data.toJSON().coordEstafetaLat,
                  coordEstafLong: data.toJSON().coordEstafetaLong
                })

              } else if (user.email != data.toJSON().emailestafeta) {

                this.setState({
                  cargo: 'cliente'
                });

              }
            })
          }
        }, 2000);

      }

    })
  }

  render() {

    if (this.state.isSignedIn === true && this.state.cargo !== null) {
      if (this.state.cargo == 'cliente') {
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
                    <img src={menu04} alt="menu4" /><li onClick={this.signOut}>Sair</li>

                  </div>
                </div>

                <Switch>
                  <Route path='/' exact strict component={Home} />
                  <Route path='/pagamento' component={Pagamento} />
                  <Route path='/reserva' component={Reserva} />
                  <Route path='/pedidos' component={Pedidos} />
                  <Route path='/estado0' component={Estado0} />
                  <Route path='/estado1' component={Estado1} />
                  <Route path='/estado2' component={Estado2} />
                  <Route path='/estado3' component={Estado3} />
                  <Route path='/arquivo' component={Arquivo} />
                </Switch>
              </div>

            </Fragment>
          </BrowserRouter>




        );
      }
      if (this.state.cargo == 'estafeta') {
        return (



          <BrowserRouter>
            <Fragment>

              <div>
                <div id="Menu">
                  <h2>washClub</h2>
                  <img src={menu} alt="menu" onClick={() => this.toggleLista()} />
                  <div id="ListaMenu">
                    <img src={menu01} alt="menu1" /><li><Link to="/">Home</Link></li>
                    <img src={menu02} alt="menu2" /><li><Link to="/encomendas">Ver Encomendas</Link></li>
                    <img src={menu03} alt="menu3" /><li>Definições</li>
                    <img src={menu04} alt="menu4" /><li onClick={this.signOut}>Sair</li>

                  </div>
                </div>

                <Switch>
                  <Route path='/' render={(props) => <HomeEstafeta {...props} />} exact strict component={HomeEstafeta} />
                  <Route path='/encomendas' component={EncomendaEstafeta} />
                </Switch>
              </div>

            </Fragment>
          </BrowserRouter>
        );
      }


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