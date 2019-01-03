import React from 'react';
import arquivo from '../imgs/arquivo.png';
import verMais from '../imgs/verReserva.png';
import { Link } from 'react-router-dom';
import firebase from "firebase";

var keys = [];

export default class Pedidos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            encomendas: []
        }

        var ref = firebase.database().ref().child('roupa/').orderByChild('wordcount');
        ref.once('value', function (correTudo) {
            correTudo.forEach(function (item) {
                var itemVal = item.val();
                keys.push(itemVal);
            });
        });
    }

    componentDidMount() {
        this.setState({
            encomendas: keys
        })
    }

    render() {

        console.log('email: ' + firebase.auth().currentUser.email);

        console.log(keys);

        return (
            <div>

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

                <div className="Pedidos">
                    <div className="PedidosAtivos">
                        <div className="Ativos">
                            <p>Pedido #123dsa</p>
                        </div>
                        <Link to="/estado0"><img src={verMais} alt="Botão para ver detalhes da reserva" /></Link>
                    </div>

                    <div className="PedidosAtivos">
                        <div className="Ativos">
                            <p>Pedido #123dsa</p>
                        </div>
                        <Link to="/estado0"><img src={verMais} alt="Botão para ver detalhes da reserva" /></Link>
                    </div>

                    <div className="PedidosAtivos">
                        <div className="Ativos">
                            <p>Pedido #123dsa</p>
                        </div>
                        <Link to="/estado0"><img src={verMais} alt="Botão para ver detalhes da reserva" /></Link>
                    </div>
                </div>

            </div>
        )
    }
}