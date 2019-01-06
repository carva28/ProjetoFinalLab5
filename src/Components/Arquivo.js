import React from 'react';
import verMais from '../imgs/verReserva.png';
import { Link } from 'react-router-dom';
import firebase from "firebase";

var varreserva;

export default class Arquivo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nrEncomenda: [],
            cliente: [],
            nrCalcas: [],
            nrCamisas: [],
            nrCamisolas: [],
            nrCasacos: [],
            nrDesporto: [],
            nrInterior: [],
            nrLa: [],
            nrPijama: [],
            nrVestido: [],
            estado: [],
            data: [],
            horas: []
        }
    }

    componentDidMount() {
        this.tempo = setTimeout(() => {
            firebase.database().ref('Number/var_reserva').on('value', (data) => {
                varreserva = data.toJSON().a;
                this.loops(varreserva);
            })
        }, 500);
    }

    loops = () => {
        for (let est = 1; est < varreserva; est++) {
            firebase.database().ref("roupa/Encomenda" + est).on('value', (data) => {

                var nrEncomenda = '#Pedido' + est;
                this.state.nrEncomenda.push(nrEncomenda);

                var nomecliente = data.toJSON().cliente;
                this.state.cliente.push(nomecliente);

                var nrCalcas = data.toJSON().NrCalças;
                this.state.nrCalcas.push(nrCalcas);

                var nrCamisas = data.toJSON().NrCamisas;
                this.state.nrCamisas.push(nrCamisas);

                var nrCamisolas = data.toJSON().NrCamisolas;
                this.state.nrCamisolas.push(nrCamisolas);

                var nrCasacos = data.toJSON().NrCasacos;
                this.state.nrCasacos.push(nrCasacos);

                var nrDesporto = data.toJSON().NrDesporto;
                this.state.nrDesporto.push(nrDesporto);

                var nrInterior = data.toJSON().NrInterior;
                this.state.nrInterior.push(nrInterior);

                var nrLa = data.toJSON().NrLa;
                this.state.nrLa.push(nrLa);

                var nrPijama = data.toJSON().NrPijama;
                this.state.nrPijama.push(nrPijama);

                var nrVestido = data.toJSON().NrVestido;
                this.state.nrVestido.push(nrVestido);

                var estado = data.toJSON().estado;
                this.state.estado.push(estado);

                var data = data.toJSON().Data;
                this.state.data.push(data);
            })
        }

        this.mostraRender();
    }

    mostraRender = () => {

        this.tempo = setTimeout(() => {

            document.getElementById('Carrega').style.display = "none";

            for (let e = 0; e < this.state.cliente.length; e++) {

                if (this.state.cliente[e] === firebase.auth().currentUser.email && this.state.estado[e] > 3) {
                    document.getElementById('divArq').innerHTML += `
                        <div class="PedidosArquivados">
                            <div class="pArquivo">
                                <p>${this.state.nrEncomenda[e]}</p>
                                <p class="dataArq">${this.state.data[e]}</p>
                            </div>
                            <div class="RoupasPedidos">
                                <span>Calças: ${this.state.nrCalcas[e]}</span>
                                <span>Camisas: ${this.state.nrCamisas[e]}</span>
                                <span>Camisolas: ${this.state.nrCamisolas[e]}</span>
                                <span>Casacos: ${this.state.nrCasacos[e]}</span>
                                <span>Roupas de Desporto: ${this.state.nrDesporto[e]}</span>
                                <span>Roupas Interiores: ${this.state.nrInterior[e]}</span>
                                <span>Roupas de Lã: ${this.state.nrLa[e]}</span>
                                <span>Pijamas: ${this.state.nrPijama[e]}</span>
                                <span>Vestidos: ${this.state.nrVestido[e]}</span>
                            </div>
                        </div>`;
                }

            }

        }, 500);
    }

    render() {
        return (
            <div id="ArquivoPag">
                <h1>Arquivo</h1>
                <p>Aqui pode visualizar encomendas efetuadas anteriormente.</p>
                <div id="Carrega">A carregar as suas reservas arquivadas...</div>

                <div id="divArq"></div>
            </div>
        )
    }
}
