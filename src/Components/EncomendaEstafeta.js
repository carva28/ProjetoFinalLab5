import React, { Component } from 'react'
import firebase from "firebase";

var varreserva;

export default class EncomendaEstafeta extends Component {
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
                        var pedido = '#Pedido' + est;

                        document.getElementById('main').innerHTML += `<h4>${pedido}</h4>`;
                    }
                })
            }
        }, 1000);
    }

    render() {
        return (
            <div>
                <div id='main'></div>
            </div>
        );
    }
}