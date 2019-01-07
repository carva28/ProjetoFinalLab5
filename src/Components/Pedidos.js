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
                                <p>${this.state.nrEncomenda[e]}</p>
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
                            <a href="/estado${this.state.estado[e]}"><img src=${verMais} alt="Botão para ver detalhes da reserva" /></a>
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
                    <Link to="/arquivo">
                        <div id="divArq">
                            <img src={arquivo} alt="Imagem de um arquivo" />
                            <h4 id="Arquivo">Arquivo</h4>
                        </div>
                    </Link>
                </div>

                <div id="borderBaixo"></div>

                <div className="Pedidos" id="Enc">
                    <div id="Carrega">A carregar os seus pedidos...</div>
                </div>

            </div>
        )
    }
}