import React, { Component } from 'react'
import firebase from "firebase";
import notas from '../imgs/pagamento.png';
import paypal from '../imgs/paypal.png';
import Paypal from './Paypal';
import logo from '../imgs/logo.png';

var teste;

export default class Pagamento extends Component {

    constructor(props) {
        super(props);
        firebase.database().ref('Number/var_reserva').on('value', (data) => {
            console.log(data.toJSON().a);
            teste = data.toJSON().a;
        })
    }

    render() {
        return (
            <div id="Pagamento">
                <h1>Pagamento</h1>
                <p id="escolhaOp">Escolha a opção de pagamento.</p>

                <div className="botoesPagamento" onClick={() => this.fimEncomenda()}>
                    <img src={notas} alt="monetario" />
                    <p>Dinheiro</p>
                </div>

                <div className="botoesPagamento" >
                    <img src={paypal} alt="monetario" />
                    <Paypal />
                </div>
            </div>
        )
    }

    fimEncomenda = () => {
        this.fazReserva();
        document.getElementById('Pagamento').innerHTML = `<div id='AposEncomenda'><img src=${logo} alt='carrinha' /><h5>Obrigada pela sua reserva, um estafeta está a caminho!</h5></div>`;
        this.espera();
    }

    espera = () => {
        this.timer = setTimeout(() => {
            this.props.history.push('/')
        }, 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    fazReserva = () => {
        const {
            nrcalcas, nrcamisas, nrcamisolas, nrcasacos, nrdesporto, nrinterior, nrla, nrpijama, nrvestido, lat, long, hora, data, tlmv
        } = this.props.location.state;

        if (lat != null && long != null) {

            for (let l = teste; l < teste + 1; l++) {

                firebase.database().ref("roupa/Encomenda" + teste + "").set({
                    cliente: firebase.auth().currentUser.email,
                    NrCamisas: nrcamisas,
                    NrCalças: nrcalcas,
                    NrCamisolas: nrcamisolas,
                    NrCasacos: nrcasacos,
                    NrDesporto: nrdesporto,
                    NrInterior: nrinterior,
                    NrLa: nrla,
                    NrPijama: nrpijama,
                    NrVestido: nrvestido,
                    CoordenadaLat: lat,
                    CoordenadaLong: long,
                    Horas: hora,
                    Data: data,
                    Telemovel: tlmv,
                    pagamento: "monetario",
                    estado: '0'
                }).then(() => {
                    console.log("inserido com sucesso");
                }).catch((error) => {
                    console.log(error);
                });

            }
            teste++;

            firebase.database().ref("Number/var_reserva").set({
                a: teste,
            })
        }
        
        firebase.database().ref('roupa').on('value', (data) => {
            console.log(data.toJSON());
        })
    }
}