import  React, { Fragment } from 'react';
import { BrowserRouter, Link, Switch } from 'react-router-dom';
import HomeEstafeta from './HomeEstafeta';
import Home from './Home';
import menu from '../imgs/menu.png';
import menu01 from '../imgs/menu01.png';
import menu02 from '../imgs/menu02.png';
import menu03 from '../imgs/menu03.png';
import menu04 from '../imgs/menu04.png';
import Route from 'react-router-dom/Route';
import Reserva from './Reserva';
import Pagamento from './Pagamento';
import Pedidos from './Pedidos';
import EstadoReserva from './EstadoReserva';

export default class VerificaUser extends React.Component  {
    constructor(props){
        super(props);
        
        this.state = {
            car:''
        }
        this.wait();
    }

    wait = () => {
        setTimeout(() => {
            alert(this.props.ola)
            this.setState({
                car:this.props.ola
            })
        },2000);
        
    }
  render() {
    if(this.state.car === 'cliente'){
    return(
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
                <Route path='/estado_reserva' component={EstadoReserva} />
              </Switch>
            </div>
            
          </Fragment>
        </BrowserRouter>
    )
    }else if(this.state.car === 'estafeta'){
        return(
            <BrowserRouter>
            <Fragment>
              
              <div>
                <div id="Menu">
                  <h2>washClub</h2>
                  <img src={menu} alt="menu" onClick={() => this.toggleLista()} />
                  <div id="ListaMenu">
                    <img src={menu01} alt="menu1" /><li><Link to="/">Home</Link></li>
                    <img src={menu04} alt="menu4" /><li onClick={this.signOut}>Sair</li>
  
                  </div>
                </div>
  
                <Switch>
                  <Route path='/' exact strict component={HomeEstafeta} />
                </Switch>
              </div>
              
            </Fragment>
          </BrowserRouter>
        );
    }else{
        return(
            <div>okay.</div>
        );
    }

    
  }
}
