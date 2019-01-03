import React from 'react';
import estado1 from '../../imgs/estado01.png';
import est1 from '../../imgs/est1.png';

export default class Estado1 extends React.Component {

    render() {
        return (
            <div id="EstadoReserva">
                <h1>Estado da reserva</h1>

                <p>Veja aqui o estado do seu pedido.</p>

                <p className="EstadoP">Pedido #123dsa</p>

                <img src={est1} alt="estado 0" id="estadoImg" />

                <img src={estado1} alt="primeiro estado" />

                <h3>EM PROGRESSO...</h3>
                <p className="EstadoP">A sua roupa está a ser lavada.</p>
            </div>
        )
    }

}