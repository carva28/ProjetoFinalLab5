import React, { Component } from 'react'
import firebase from "firebase";
import MapaEstafeta from './MapaEstafeta';
import { Link } from 'react-router-dom';
var varreserva;
export default class ClientesReservas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nrEncomenda: [],
            mailcliente: [],
            coordLAT: [],
            coordLong: [],
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
            crdLat: '',
            crdLong: '',
            buscaReserva: '',
            var_reserva: '',
        }
        this.distanceRef = React.createRef();
    }

    componentDidMount() {

        firebase.database().ref('Number/var_reserva').on('value', (data) => {
            varreserva = data.toJSON().a;
            this.setState({
                var_reserva: varreserva,
            })
            this.loops(varreserva);
        })





    }

    loops = (varreserva) => {
        for (let est = 1; est < varreserva; est++) {
            firebase.database().ref("roupa/Encomenda" + est).on('value', (data) => {

                var estado = data.toJSON().estado;
                if (estado == 0) {
                    this.state.estado.push(estado);

                    var nrEncomenda = '#Pedido' + est;
                    this.state.nrEncomenda.push(nrEncomenda);

                    var ecliente = data.toJSON().cliente;
                    this.state.mailcliente.push(ecliente);

                    var nrLat = data.toJSON().CoordenadaLat;
                    this.state.coordLAT.push(nrLat);

                    var nrLong = data.toJSON().CoordenadaLong;
                    this.state.coordLong.push(nrLong);

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

                }
            })
        }

        this.srh();
    }

    srh = () => {
        this.verifica = setTimeout(() => {

            document.getElementById('selectmain').innerHTML += `
                <option>Selecione um pedido</option>`;

            for (let it = 0; it < this.state.nrEncomenda.length; it++) {

                document.getElementById('selectmain').innerHTML += `
                    <option value=${it}>${this.state.nrEncomenda[it]}</option>`;

            }

        }, 500);
    }


    irBuscar = () => {
        for (let est = 1; est < this.state.var_reserva; est++) {
            let pedido = '#Pedido' + est;
            
            if (pedido == this.state.buscaReserva) {
                firebase.database().ref("roupa/Encomenda" + est).update({
                    estado: 1,
                    estafetaID: firebase.auth().currentUser.uid,
                    estafeta: firebase.auth().currentUser.displayName,
                });
            }

        }
    }

    render() {
        if (this.props.LatAtual != null && this.props.LongAtual) {
            return (
                <div>
                    <select value={this.state.value} onChange={this.handleChange} id="selectmain"></select>
                    <div id="main_info"></div>

                    <MapaEstafeta
                        ref={this.distanceRef}
                        currentLatitude={this.props.LatAtual}
                        currentLongitude={this.props.LongAtual}
                        destinationLatitude={this.state.crdLat}
                        destinationLongitude={this.state.crdLong}
                    />

                    <Link to='/encomendas'>
                        <button onClick={() => this.irBuscar()} id="vou2">Vou</button>
                    </Link>
                </div>
            );
        } else {
            return (
                <div>
                    <select value={this.state.value} onChange={this.handleChange} id="selectmain"></select>
                    <div id="main_info"></div>
                    A carregar...
        </div>
            );
        }

    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
        this.forInfo(event.target.value)
    }

    forInfo = (valor) => {
        let destino;

        for (let show = 0; show < this.state.mailcliente.length; show++) {
            if (valor == show) {
                let totalroupa = this.state.nrCalcas[show] + this.state.nrCamisas[show] + this.state.nrCamisolas[show] + this.state.nrCasacos[show] + this.state.nrDesporto[show] + this.state.nrInterior[show] + this.state.nrLa[show] + this.state.nrVestido[show] + this.state.nrPijama[show];

                document.getElementById('main_info').innerHTML = `
                    <div id="clienteInfo">
                        <div id="infosEncomenda">
                            <h2>${this.state.nrEncomenda[show]}</h2>
                            <h4>Cliente: </h4><p>${this.state.mailcliente[show]}</p>
                            <h4>Estado da encomenda: </h4><p>${this.state.estado[show]}</p>
                            <h4>Coordenada Lat: </h4><p>${this.state.coordLAT[show]}</p>
                            <h4>Coordenada Long: </h4><p>${this.state.coordLong[show]}</p>
                        </div>

                        <div id="roupaEncomenda">
                            <h3>Número total de peças: ${totalroupa}</h2>
                            <h4>Camisas: </h4><p>${this.state.nrCamisas[show]}</p>
                            <h4>Roupa Interior: </h4><p>${this.state.nrInterior[show]}</p>
                            <h4>Lã: </h4><p>${this.state.nrLa[show]}</p>
                        </div>
                    </div>`;


                this.setState({
                    buscaReserva: this.state.nrEncomenda[show],
                })


                this.setState({
                    crdLat: this.state.coordLAT[show],
                    crdLong: this.state.coordLong[show],

                })
                destino = {
                    destLatitude: this.state.coordLAT[show],
                    destLongitude: this.state.coordLong[show],
                };

                this.setState(destino, () => {
                    this.distanceRef.current.renderiza();
                });
            }

        }
    }

}