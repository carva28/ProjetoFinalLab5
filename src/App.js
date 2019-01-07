import React, { Fragment } from 'react';
import './styles.css';
import Login from './Components/Login';
import firebase from "firebase";
import Home from './Components/Home';
import HomeEstafeta from './Components/HomeEstafeta';
import HomeAdmin from './Components/HomeAdmin';
import menu from './imgs/menu.png';
import menu01 from './imgs/menu01.png';
import menu02 from './imgs/menu02.png';
import menu03 from './imgs/menu03.png';
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
import Loading from './LoadingScreen';

var toggle = 'fechado';
var var_estafeta, var_admin;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isSignedIn: false,
      cargo: null,
      arrayestafeta: [],
      coordEstafLat: '',
      coordEstafLong: ''
    }
  }

  toggleLista = () => {
    var lista = document.getElementById('ListaMenu');

    if (toggle === 'fechado') {
      lista.style.display = 'block';
      toggle = 'aberto';
    } else if (toggle === 'aberto') {
      lista.style.display = 'none';
      toggle = 'fechado';
    }
  }

  toogleMenu = () => {
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

        firebase.database().ref('Number/var_admin').on('value', (data) => {
          console.log(data.toJSON().e);
          var_admin = data.toJSON().e;
        })

        this.estaloopsadmin = setTimeout(() => {
          for (let adm = 1; adm <= var_admin; adm++) {
            firebase.database().ref("Utilizadores/Administrador/Admin0" + adm).on('value', (data) => {

              if (user.email === data.toJSON().emailadmin) {
                this.setState({
                  cargo: 'administrador'
                })

              } else if (user.email != data.toJSON().emailadmin) {
                this.verificaCliEsta(var_estafeta, user);
              }
            })
          }
        }, 1000);
      }
    })
  }

  verificaCliEsta = (var_estafeta, user) => {
    this.estaloops = setTimeout(() => {
      for (let est = 1; est <= var_estafeta; est++) {
        firebase.database().ref("Utilizadores/Estafeta/estafeta0" + est).on('value', (data) => {

          if (user.email === data.toJSON().emailestafeta) {
            this.setState({
              cargo: 'estafeta'
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


  render() {

    if (this.state.isSignedIn === true) {

      if (this.state.cargo !== null) {
        if (this.state.cargo == 'cliente') {
          return (
            <BrowserRouter>
              <Fragment>

                <div>
                  <div id="Menu">
                    <h2>washClub</h2>
                    <img src={menu} alt="menu" onClick={() => this.toggleLista()} />
                    <div id="ListaMenu">
                      <img src={menu01} alt="menu1" /><li onClick={this.toogleMenu}><Link to="/">Home</Link></li>
                      <img src={menu02} alt="menu2" /><li onClick={this.toogleMenu}><Link to="/pedidos">Pedidos</Link></li>
                      <img src={menu03} alt="menu3" /><li onClick={this.signOut}>Sair</li>

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
                      <img src={menu01} alt="menu1" /><li onClick={this.toogleMenu}><Link to="/">Home</Link></li>
                      <img src={menu02} alt="menu2" /><li onClick={this.toogleMenu}><Link to="/encomendas">Ver Encomendas</Link></li>
                      <img src={menu03} alt="menu3" /><li onClick={this.signOut}>Sair</li>

                    </div>
                  </div>
                  <Switch>
                    <Route path='/' exact strict component={HomeEstafeta} />
                    <Route path='/encomendas' component={EncomendaEstafeta} />
                  </Switch>
                </div>

              </Fragment>
            </BrowserRouter>
          );
        }

        if (this.state.cargo == 'administrador') {
          return (
            <BrowserRouter>
              <Fragment>

                <div>
                  <div id="Menu">
                    <h2>washClub</h2>
                    <img src={menu} alt="menu" onClick={() => this.toggleLista()} />
                    <div id="ListaMenu">
                      <img src={menu01} alt="menu1" /><li><Link to="/">Principal</Link></li>
                      <img src={menu03} alt="menu4" /><li onClick={this.signOut}>Sair</li>
                    </div>
                  </div>

                  <Switch>
                    <Route path='/' exact strict component={HomeAdmin} />
                  </Switch>
                </div>

              </Fragment>
            </BrowserRouter>
          );
        }

      } else {
        return (
          <Loading />
        )
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