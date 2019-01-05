import React, { Component } from 'react'
import firebase from "firebase";
import MapaEstafeta from './MapaEstafeta';
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
            var_reserva: ''
        }
        this.distanceRef = React.createRef();
    }

    componentDidMount() {

        firebase.database().ref('Number/var_reserva').on('value', (data) => {
            console.log(data.toJSON().a);
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

                } else {
                    console.log('não faz');
                }


            })


        }

        this.srh();
    }

    srh = () => {
        this.verifica = setTimeout(() => {

            for (let it = 0; it < this.state.nrEncomenda.length; it++) {

                document.getElementById('selectmain').innerHTML += `
                    <option value=${it}>${this.state.nrEncomenda[it]}</option>`;

            }

        }, 500);
    }


    irBuscar = () => {
        console.log(this.state.buscaReserva);
        console.log(this.state.var_reserva)
        for (let est = 1; est < this.state.var_reserva; est++) {
            let pedido = '#Pedido' + est;
            console.log(pedido)
            if (pedido == this.state.buscaReserva) {
                firebase.database().ref("roupa/Encomenda" + est).update(
                    {
                        estado: 1,
                        estafeta: firebase.auth().currentUser.displayName,
                    }
                );

            } else {
            }

        }

    }

    render() {



        return (
            <div>
                <select value={this.state.value} onChange={this.handleChange} id="selectmain"></select>
                <div id="main_info"></div>
                <div id="roupa"></div>
                <MapaEstafeta
                    ref={this.distanceRef}
                    currentLatitude={this.props.LatAtual}
                    currentLongitude={this.props.LongAtual}
                    destinationLatitude={this.state.crdLat}
                    destinationLongitude={this.state.crdLong}
                />
                <button onClick={() => this.irBuscar()} id="vou2">Vou</button>
            </div>
        );

    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
        this.forInfo(event.target.value)
        this.roupaInfo(event.target.value)
    }

    forInfo = (valor) => {
        let destino;

        for (let show = 0; show < this.state.mailcliente.length; show++) {
            if (valor == show) {
                document.getElementById('main_info').innerHTML = `
            <div id='clienteInfo'>
                <h4>Nr Encomenda:<h5>${this.state.nrEncomenda[show]}</h5></h4>
                <h4>Cliente:<h6>${this.state.mailcliente[show]}</h6></h4>
                <h4>Estado da encomenda:<h6>${this.state.estado[show]}</h6></h4>
                <h4>Coordenada Lat:<h6>${this.state.coordLAT[show]}</h6></h4>
                <h4>Coordenada Long:<h6>${this.state.coordLong[show]}</h6></h4>
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

                console.log(this.state.crdLat)



            } else {

            }

        }


    }
    roupaInfo = (valor) => {
        //ROUPA

        for (let roupa = 0; roupa < this.state.nrCamisas.length; roupa++) {
            if (valor == roupa) {
                let totalroupa = this.state.nrCalcas[roupa] + this.state.nrCamisas[roupa] + this.state.nrCamisolas[roupa] + this.state.nrCasacos[roupa] + this.state.nrDesporto[roupa] + this.state.nrInterior[roupa] + this.state.nrLa[roupa] + this.state.nrVestido[roupa] + this.state.nrPijama[roupa];

                document.getElementById('roupa').innerHTML = `
            <div id='roupaInfo'>
                <h3>Número total de peças:${totalroupa}</h3>
                <h4>Peças:<h5>${this.state.nrCamisas[roupa]}</h5></h4>
                <h4>Tipo:<h5>${this.state.nrCalcas[roupa]}</h5></h4>
                <h4>Tipo:<h5>${this.state.nrLa[roupa]}</h5></h4>
            </div>`;
            }

            break;


        }

    }



}
