import React, { Component } from 'react'
import firebase from "firebase";

var varreserva, pedidos;
export default class EncomendaEstafeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            i: false
        }
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
                        this.state.array.push(pedido);
                        pedidos = this.state.array.length
                        this.forLoop(pedidos);
                    } else {
                        console.log('nada')
                    }
                })
            }
            this.setState({
                i: true
            })
        }, 1000);

    }




    render() {
        if (this.state.i == true) {
            return (
                <div>
                    <div id='main'></div>
                </div>

            )


        } else {
            return (
                <div>

                </div>
            )
        }



    }

    forLoop = (tot) => {
        let total = tot;
        console.log('total' + total)
        for (let j = 0; j < total; j++) {
            document.getElementById('main').innerHTML += `
        <button>Vêr mais</button>
        <h4>${this.state.array[j]}</h4>`;
        }

    }


}