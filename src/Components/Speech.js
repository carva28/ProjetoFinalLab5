import React from 'react';
import DictateButton from 'react-dictate-button';
import Mapa from './Mapa';
import { geolocated } from 'react-geolocated';
import { Redirect } from 'react-router-dom';
import MapaSpeech from './MapaSpeech';
import firebase from 'firebase';

var lavandarias = [];
class Speech extends React.Component {
    constructor(props) {
        super(props);
        this.carregarData();
        this.handleCustomChange = this.handleCustomChange.bind(this);
        this.handleDictate = this.handleDictate.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleRawEvent = this.handleRawEvent.bind(this);


        this.state = {
            customValue: null,
            interim: null,
            result: null,
            falas: '',
            mapa: false,
            pedidos: false,
            mostra: null,
            destLatitude: null,
            destLongitude: null,
            mapaDir: false
        };
    }

    handleCustomChange({ value: customValue }) {
        this.setState(() => ({ customValue }));
    }

    handleDictate(event) {
        const { result } = event;
        const { confidence, transcript } = result || {};

        this.setState(() => ({
            interimResults: null,
            result: { confidence, transcript },
            falas: transcript
        }));
    }

    handleError(event) {
        console.log('error');
        console.error(event);

        this.setState(() => ({
            interimResults: null,
            result: null
        }));
    }

    handleProgress(event) {
        const { results: interimResults } = event;

        this.setState(() => ({
            interimResults,
            result: null
        }));
    }

    handleRawEvent({ type }) {
        console.log(`raw event: ${type}`);
    }

    carregarData = () => {



        firebase.database().ref('Coordenadas').on('value', (data) => {
            lavandarias.push([
                data.toJSON().Lavandaria1.latitude,
                data.toJSON().Lavandaria1.longitude,
                data.toJSON().Lavandaria1.nome
            ]);

            lavandarias.push([
                data.toJSON().Lavandaria2.latitude,
                data.toJSON().Lavandaria2.longitude,
                data.toJSON().Lavandaria2.nome
            ]);

            lavandarias.push([
                data.toJSON().Lavandaria3.latitude,
                data.toJSON().Lavandaria3.longitude,
                data.toJSON().Lavandaria3.nome
            ]);

            lavandarias.push([
                data.toJSON().Lavandaria4.latitude,
                data.toJSON().Lavandaria4.longitude,
                data.toJSON().Lavandaria4.nome
            ]);

            lavandarias.push([
                data.toJSON().Lavandaria5.latitude,
                data.toJSON().Lavandaria5.longitude,
                data.toJSON().Lavandaria5.nome
            ]);

            lavandarias.push([
                data.toJSON().Lavandaria6.latitude,
                data.toJSON().Lavandaria6.longitude,
                data.toJSON().Lavandaria6.nome
            ]);
        })

    }



    render() {

        if (this.state.mostra === 1 && this.state.mapa === true && this.props.coords !== null) {
            return (
                <div>
                    <Mapa
                        LatAtual={this.props.coords.latitude}
                        LongAtual={this.props.coords.longitude}

                    />
                    <div>
                        <DictateButton
                            className="my-dictate-button"
                            grammar="#JSGF V1.0; grammar districts; public <district> = Tuen Mun | Yuen Long;"
                            lang="pt-PT"
                            onDictate={this.handleDictate}
                            onError={this.handleError}
                            onProgress={this.handleProgress}
                            onRawEvent={this.handleRawEvent}
                        >
                            {({ readyState }) =>
                                readyState === 0 ? 'Começar ditado' :
                                    readyState === 1 ? 'A ouvir..' :
                                        'A ouvir...'
                            }
                        </DictateButton>
                    </div>
                    {
                        this.state.falas === 'voltar' || this.state.falas === 'Voltar' ? this.timer = setTimeout(() => { this.setState({ mostra: 0 }) }, 1000) : null
                    }

                    {
                        this.state.falas === 'pedidos' || this.state.falas === 'Pedidos' ? <Redirect push to="/pedidos" /> : null
                    }

                    {
                        this.state.falas === "Direcções lavandaria boavista" ||
                            this.state.falas === "Direcções lavandaria Boavista" ||
                            this.state.falas === "direcções lavandaria Boavista" ||
                            this.state.falas === "direções lavandaria Boavista" ||
                            this.state.falas === "direções lavandaria boavista" ? this.timer = setTimeout(() => { this.setState({ mapaDir: true, mapa: false, destLatitude: lavandarias[0][0], destLongitude: lavandarias[0][1] }) }, 1000) : null
                    }
                    {
                        this.state.falas === "Direcções lavandaria cais de gaia" ||
                            this.state.falas === "Direcções lavandaria Cais de Gaia" ||
                            this.state.falas === "direcções lavandaria Cais de Gaia" ||
                            this.state.falas === "direcções lavandaria cais de Gaia" ||
                            this.state.falas === "Direções lavandaria Cais de Gaia" ||
                            this.state.falas === "Direções lavandaria cais de Gaia" ? this.timer = setTimeout(() => { this.setState({ mapaDir: true, mapa: false, destLatitude: lavandarias[1][0], destLongitude: lavandarias[1][1] }) }, 1000) : null
                    }
                    {
                        this.state.falas === "Direcções lavandaria canidelo" ||
                            this.state.falas === "Direcções lavandaria Canidelo" ||
                            this.state.falas === "direcções lavandaria Canidelo" ||
                            this.state.falas === "direções lavandaria Canidelo" ||
                            this.state.falas === "direções lavandaria canidelo" ? this.timer = setTimeout(() => { this.setState({ mapaDir: true, mapa: false, destLatitude: lavandarias[2][0], destLongitude: lavandarias[2][1] }) }, 1000) : null
                    }
                    {
                        this.state.falas === "Direcções lavandaria gomes da costa" ||
                            this.state.falas === "Direcções lavandaria Gomes da Costa" ||
                            this.state.falas === "direcções lavandaria Gomes da Costa" ||
                            this.state.falas === "direcções lavandaria Gomes da costa" ||
                            this.state.falas === "Direções lavandaria Gomes da Costa" ? this.timer = setTimeout(() => { this.setState({ mapaDir: true, mapa: false, destLatitude: lavandarias[3][0], destLongitude: lavandarias[3][1] }) }, 1000) : null
                    }
                    {
                        this.state.falas === "Direcções lavandaria miramar" ||
                            this.state.falas === "direcções lavandaria Miramar" ||
                            this.state.falas === "direcções lavandaria miramar" ||
                            this.state.falas === "Direções lavandaria Miramar" ? this.timer = setTimeout(() => { this.setState({ mapaDir: true, mapa: false, destLatitude: lavandarias[4][0], destLongitude: lavandarias[4][1] }) }, 1000) : null
                    }
                    {
                        this.state.falas === "Direcções lavandaria aveiro" ||
                            this.state.falas === "Direcções lavandaria Aveiro" ||
                            this.state.falas === "direcções lavandaria Aveiro" ||
                            this.state.falas === "Direções lavandaria Aveiro" ||
                            this.state.falas === "direções lavandaria Aveiro" ? this.timer = setTimeout(() => { this.setState({ mapaDir: true, mapa: false, destLatitude: lavandarias[5][0], destLongitude: lavandarias[5][1] }) }, 1000) : null
                    }



                </div>
            );

        } else if (this.state.mostra === 1 && this.state.mapaDir === true && this.state.destLatitude !== null && this.state.destLongitude !== null && this.props.coords !== null) {

            return (
                <div>
                    <MapaSpeech
                        currentLatitude={this.props.coords.latitude}
                        currentLongitude={this.props.coords.longitude}
                        destinationLatitude={this.state.destLatitude}
                        destinationLongitude={this.state.destLongitude}
                    />
                    <div>
                        <DictateButton
                            className="my-dictate-button"
                            grammar="#JSGF V1.0; grammar districts; public <district> = Tuen Mun | Yuen Long;"
                            lang="pt-PT"
                            onDictate={this.handleDictate}
                            onError={this.handleError}
                            onProgress={this.handleProgress}
                            onRawEvent={this.handleRawEvent}
                        >
                            {({ readyState }) =>
                                readyState === 0 ? 'Começar ditado' :
                                    readyState === 1 ? 'A ouvir..' :
                                        'A ouvir...'
                            }
                        </DictateButton>
                    </div>
                    {
                        this.state.falas === 'voltar' || this.state.falas === 'Voltar' ? this.timer = setTimeout(() => { this.setState({ mostra: 0 }) }, 1000) : null
                    }

                    {
                        this.state.falas === 'mapa' || this.state.falas === 'Mapa' || this.state.falas === 'mostrar mapa' || this.state.falas === 'Mostrar mapa' ? this.timer = setTimeout(() => { this.setState({ mapa: true }) }, 1000) : null
                    }

                    {
                        this.state.falas === 'pedidos' || this.state.falas === 'Pedidos' ? <Redirect push to="/pedidos" /> : null
                    }

                </div>
            );

        } else if (this.state.mostra === 1 && this.state.pedidos === true) {
            return (
                <div>
                    <Redirect push to="/pedidos" />;
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <DictateButton
                            className="my-dictate-button"
                            grammar="#JSGF V1.0; grammar districts; public <district> = Tuen Mun | Yuen Long;"
                            lang="pt-PT"
                            onDictate={this.handleDictate}
                            onError={this.handleError}
                            onProgress={this.handleProgress}
                            onRawEvent={this.handleRawEvent}
                        >
                            {({ readyState }) =>
                                readyState === 0 ? 'Começar ditado' :
                                    readyState === 1 ? 'A ouvir..' :
                                        'A ouvir...'
                            }
                        </DictateButton>
                    </div>
                    {this.verificaWords(this.state.falas)}
                    {/* <div>
                        <h4>O que pode dizer:</h4>
                        <ul>
                            <li>Direções lavandaria <b>lavandaria pretendida</b></li>
                            <li>Mapa / Mostrar mapa</li>
                            <li>Pedidos</li>
                            <li>Voltar</li>
                        </ul>
                    </div> */}

                </div>
            );
        }

    }


    verificaWords = (palavras) => {
        this.timer2 = setTimeout(() => {
            if (palavras == 'Mostrar mapa' || palavras == 'mostrar mapa' || palavras == 'Mapa' || palavras == 'mapa') {
                this.setState({
                    mapa: true,
                    mostra: 1
                })

            } else if (palavras == 'Mostrar pedidos' ||
                palavras == 'mostrar pedidos' ||
                palavras == 'pedidos') {
                this.setState({
                    pedidos: true,
                    mostra: 1
                })

            } else if (palavras === "Direcções lavandaria boavista" ||
                palavras === "Direcções lavandaria Boavista" ||
                palavras === "direcções lavandaria Boavista" ||
                palavras === "direções lavandaria Boavista" ||
                palavras === "direções lavandaria boavista") {

                this.setState({
                    destLatitude: lavandarias[0][0],
                    destLongitude: lavandarias[0][1],
                    mapaDir: true,
                    mostra: 1,
                });
            } else if (palavras === "Direcções lavandaria cais de gaia" ||
                palavras === "Direcções lavandaria Cais de Gaia" ||
                palavras === "direcções lavandaria Cais de Gaia" ||
                palavras === "direcções lavandaria cais de Gaia" ||
                palavras === "Direções lavandaria Cais de Gaia" ||
                palavras === "Direções lavandaria cais de Gaia") {

                this.setState({
                    destLatitude: lavandarias[1][0],
                    destLongitude: lavandarias[1][1],
                    mapaDir: true,
                    mostra: 1,
                });
            } else if (palavras === "Direcções lavandaria canidelo" ||
                palavras === "Direcções lavandaria Canidelo" ||
                palavras === "direcções lavandaria Canidelo" ||
                palavras === "direcções lavandaria canidelo" ||
                palavras === "direções lavandaria Canidelo" ||
                palavras === "direções lavandaria canidelo") {
                this.setState({
                    destLatitude: lavandarias[2][0],
                    destLongitude: lavandarias[2][1],
                    mapaDir: true,
                    mostra: 1,
                });
            } else if (palavras === "Direcções lavandaria gomes da costa" ||
                palavras === "Direcções lavandaria Gomes da Costa" ||
                palavras === "direcções lavandaria Gomes da Costa" ||
                palavras === "direcções lavandaria Gomes da costa" ||
                palavras === "Direções lavandaria Gomes da Costa") {

                this.setState({
                    destLatitude: lavandarias[3][0],
                    destLongitude: lavandarias[3][1],
                    mapaDir: true,
                    mostra: 1,
                });
            } else if (palavras === "Direcções lavandaria miramar" ||
                palavras === "Direcções lavandaria Miramar" ||
                palavras === "direcções lavandaria Miramar" ||
                palavras === "direcções lavandaria miramar" ||
                palavras === "Direções lavandaria Miramar") {

                this.setState({
                    destLatitude: lavandarias[4][0],
                    destLongitude: lavandarias[4][1],
                    mapaDir: true,
                    mostra: 1,
                });
            } else if (palavras === "Direcções lavandaria aveiro" ||
                palavras === "Direcções lavandaria Aveiro" ||
                palavras === "direcções lavandaria Aveiro" ||
                palavras === "direcções lavandaria aveiro" ||
                palavras === "Direções lavandaria Aveiro" ||
                palavras === "direções lavandaria Aveiro") {

                this.setState({
                    destLatitude: lavandarias[5][0],
                    destLongitude: lavandarias[5][1],
                    mapaDir: true,
                    mostra: 1,
                });
            }

        }, 500);
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(Speech);