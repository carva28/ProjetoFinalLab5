import React, { Component } from 'react'
import firebase from "firebase";

var varreserva;

export default class EncEstafeta extends Component {
    constructor(props) {
        super(props);
        this.waitVar();
    }

    waitVar = () => {
        this.varwait = setTimeout(() => {
            firebase.database().ref('Number/var_reserva').on('value', (data) => {
                varreserva = data.toJSON().a;
                this.mostraEncomendas(varreserva);
            })
        }, 1000);
    }

    mostraEncomendas = (varreserva) => {
        this.tempo = setTimeout(() => {
            for (let est = 1; est < varreserva; est++) {
                firebase.database().ref("roupa/Encomenda" + est).on('value', (data) => {
                    if (data.toJSON().estado == 1 && data.toJSON().estafetaID == firebase.auth().currentUser.uid) {
                        document.getElementById('Carrega').style.display = 'none';

                        var pedido = '#Pedido' + est;
                        document.getElementById('encomAtr').style.display = 'block';
                        document.getElementById('encomAtr').innerHTML += `<h4>${pedido}</h4>`;
                    }
                })
            }
        }, 1000);
    }

    render() {
        return (
            <div id="EncomendaEstafeta">
                <h1>Encomendas atribuídas</h1>
                <p>Aqui pode consultar a referência das encomendas que lhe foram designadas.</p>
                
                <div id="Carrega">A carregar as suas encomendas...</div>
                <div id="encomAtr"></div>
            </div>
        );
    }
}