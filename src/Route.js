import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './Components/Home';
import { Reserva } from './Components/Reserva';

const Routes = (props) => (
    <BrowserRouter>
        <Switch>
            <Route path='/home' component={Home}/>
            <Route path='/pedidos' component={Reserva}/>
            <Route path='/definicoes' component={{/* Definicoes */}}/>     
        </Switch>
    </BrowserRouter>
);

export default Routes;