import React from 'react';
import arquivo from '../imgs/arquivo.png';
import verMais from '../imgs/verReserva.png';
import { Link } from 'react-router-dom';
import firebase from "firebase";

var varreserva;

export default class Pedidos extends React.Component {

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
            estado: []
        }
    }

    componentDidMount() {
        firebase.database().ref('Number/var_reserva').on('value', (data) => {
            varreserva = data.toJSON().a;
            this.loops(varreserva);
        })
    }

    loops = () => {
        for (let est = 0; est < varreserva; est++) {
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
            })
        }

        this.mostraRender();
    }

    mostraRender = () => {
        this.tempo = setTimeout(() => {

            document.getElementById('Carrega').style.display = "none";

            for (let e = 0; e < this.state.cliente.length; e++) {

                if (this.state.cliente[e] === firebase.auth().currentUser.email && this.state.estado[e] < 4) {
                    document.getElementById('Enc').innerHTML += `
                        <div class="PedidosAtivos">
                            <div class="Ativos">
                                <p id="nrEncomenda">${this.state.nrEncomenda[e]}</p>
                            </div>
                            <a href="/estado0"><img src=${verMais} alt="Botão para ver detalhes da reserva" /></a>
                        </div>`;
                }

            }

        }, 500);
    }

    render() {

        return (
            <div>

                <div id="ola"></div>

                <div className="Pedidos">
                    <h1>Pedidos</h1>
                    <p>Pode consultar aqui os seus pedidos feitos anteriormente, assim como, as suas reservas ativas.</p>
                </div>

                <div id="borderCima"></div>

                <div className="Pedidos">
                    <div id="divArq">
                        <img src={arquivo} alt="Imagem de um arquivo" />
                        <h4 id="Arquivo">Arquivo</h4>
                    </div>
                </div>

                <div id="borderBaixo"></div>

                <div className="Pedidos" id="Enc">
                    <div id="Carrega">A carregar os seus pedidos...</div>
                </div>

            </div>
        )
    }
}