import React, { Component } from 'react'
import firebase from "firebase";
import { Link } from 'react-router-dom';
import notas from '../imgs/pagamento.png';
import paypal from '../imgs/paypal.png';
import Paypal from './Paypal';
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
            <div>
                <Link to="/">
                    <div className="botoesPagamento">
                        <img src={notas} alt="monetario" />
                        <p>Dinheiro</p>
                    </div>
                </Link>

                <div className="botoesPagamento" onClick={() => this.fazReserva()}>
                    <img src={paypal} alt="monetario" />
                    <Paypal />
                </div>
            </div>
        )
    }


    fazReserva = () => {
        const { nrcalcas, nrcamisas, lat, long } = this.props.location.state;
        console.log(nrcalcas, nrcamisas, lat, long);


        for (let l = teste; l < teste + 1; l++) {

            firebase.database().ref("roupa/Encomenda" + teste + "").set(
                {
                    cliente: firebase.auth().currentUser.displayName,
                    NrCamisas: nrcamisas,
                    NrCalças: nrcalcas,
                    CoordenadaLat: lat,
                    CoordenadaLong: long,
                    pagamento: "monetario",
                }
            ).then(() => {
                console.log("inserido com sucesso");
            }).catch((error) => {
                console.log(error);
            });

        }
        teste++;

        firebase.database().ref("Number/var_reserva").set({
            a: teste,
        })

        firebase.database().ref('roupa').on('value', (data) => {
            console.log(data.toJSON());
        })
    }
}