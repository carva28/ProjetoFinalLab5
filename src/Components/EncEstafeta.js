import React, { Component } from 'react'
import firebase from "firebase";

var varreserva;

export default class EncEstafeta extends Component {
    constructor(props) {
        super(props);

        this.state = {
            done: false,
            pedidos: []
        }

        this.waitVar();
    }

    waitVar = () => {
        this.varwait = setTimeout(() => {
            firebase.database().ref('Number/var_reserva').on('value', (data) => {
                varreserva = data.toJSON().a;

                for (let est = 1; est < varreserva; est++) {
                    firebase.database().ref("roupa/Encomenda" + est).on('value', (data) => {
                        if (data.toJSON().estado == 1 && data.toJSON().estafetaID == firebase.auth().currentUser.uid) {
                            var pedido = '#Pedido' + est;
                            this.state.pedidos.push(pedido);
                        }
                    })
                }

            })
            this.mostraEncomendas();
        }, 800);
    }

    mostraEncomendas = () => {
        this.tempo = setTimeout(() => {
            
            this.setState({
                done: true
            })

            for (var d = 0; d < this.state.pedidos.length; d++) {
                document.getElementById('encomAtr').innerHTML += `<h4>${this.state.pedidos[d]}</h4>`;
            }
        }, 500);
    }

    render() {
        if (this.state.done === false) {
            return (
                <div id="EncomendaEstafeta">
                    <h1>Encomendas atribuídas</h1>
                    <p>Aqui pode consultar a referência das encomendas que lhe foram designadas.</p>
                    
                    <div id="Carrega">A carregar as suas encomendas...</div>
                </div>
            );
        } else {
            return (
                <div id="EncomendaEstafeta">
                    <h1>Encomendas atribuídas</h1>
                    <p>Aqui pode consultar a referência das encomendas que lhe foram designadas.</p>
                    
                    <div id="encomAtr"></div>
                </div>
            );
        }
        
    }
}