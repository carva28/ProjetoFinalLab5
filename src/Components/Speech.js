import React from 'react';
import DictateButton from 'react-dictate-button';
import Mapa from './Mapa';
import { geolocated } from 'react-geolocated';
import { Link, Redirect } from 'react-router-dom';

class Speech extends React.Component {
    constructor(props) {
        super(props);
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
            reserva: false,
            mostra: 0
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


    render() {
        if (this.state.mostra == 1 && this.state.mapa == true && this.props.coords != null) {
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
                                    readyState === 1 ? 'A ouvir...' :
                                        'Parar ditado'
                            }
                        </DictateButton>
                    </div>
                    <h1>Texto ouvido</h1>
                    <p>{this.state.falas}</p>

                </div>
            );

        } else if (this.state.mostra == 1 && this.state.pedidos == true) {
            return (
                <div>
                    <Redirect push to="/pedidos" />;
                </div>
            );
        } else if (this.state.mostra == 1 && this.state.reserva == true && this.props.coords != null) {
            return (
                <div>
                    <Link to={{
                        pathname: '/reserva',
                        state: {
                            reservaLati: this.props.coords.latitude,
                            reservaLong: this.props.coords.longitude,
                        }
                    }}>
                        <button>Reserve agora</button>
                    </Link>
                </div>
            )
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
                                    readyState === 1 ? 'A ouvir...' :
                                        'Parar ditado'
                            }
                        </DictateButton>
                    </div>
                    <h1>Texto ouvido</h1>
                    <p>{this.verificaWords(this.state.falas)}</p>
                </div>
            );
        }
    }


    refreshPage = () => {
        this.setState({
            mostra: 0
        })
    }


    verificaWords = (palavras) => {
        if (palavras == 'Mostrar mapa' ||
            palavras == 'mostrar mapa' ||
            palavras == 'Mapa') {
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

        } else if (palavras == 'Fazer reserva' ||
            palavras == 'fazer reserva' ||
            palavras == 'reservar') {
            this.setState({
                reserva: true,
                mostra: 1,
            })

        } else {
            console.log('A ouvir...')
        }
    }

}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(Speech);