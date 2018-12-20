import React from 'react';
import menu from '../imgs/menu.png';

var toggle = 'fechado';

export default class Menu extends React.Component {

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

    render() {
        return (
            <div id="Menu">
                <h2>washClub</h2>
                <img src={menu} alt="menu" onClick={() => this.toggleLista()}/>
                <div id="ListaMenu">
                    <li><a  href="/home">Home</a></li>
                    <li><a  href="/pedidos">Pedidos</a></li>
                    <li>Definições</li>
                </div>
            </div>
        );
    }

}