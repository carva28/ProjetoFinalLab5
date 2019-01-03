import React from 'react';
import arquivo from '../imgs/arquivo.png';
import verMais from '../imgs/verReserva.png';
import { Link } from 'react-router-dom';

export default class Pedidos extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                        <Link to="/estado_reserva"><img src={verMais} alt="Botão para ver detalhes da reserva" /></Link>
                    </div>

                    <div className="PedidosAtivos">
                        <div className="Ativos">
                            <p>Pedido #123dsa</p>
                        </div>
                        <Link to="/estado_reserva"><img src={verMais} alt="Botão para ver detalhes da reserva" /></Link>
                    </div>

                    <div className="PedidosAtivos">
                        <div className="Ativos">
                            <p>Pedido #123dsa</p>
                        </div>
                        <Link to="/estado_reserva"><img src={verMais} alt="Botão para ver detalhes da reserva" /></Link>
                    </div>
                </div>

            </div>
        )
    }
}