import React from 'react';
import menu from '../imgs/menu.png';
import menu01 from '../imgs/menu01.png';
import menu02 from '../imgs/menu02.png';
import menu03 from '../imgs/menu03.png';

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
                    <img src={menu01} alt="menu1" /><li><a href="/home">Home</a></li>
                    <img src={menu02} alt="menu2" /><li><a href="/pedidos">Pedidos</a></li>
                    <img src={menu03} alt="menu3" /><li>Definições</li>
                </div>
            </div>
        );
    }
}