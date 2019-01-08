import React from 'react';
import estado2 from '../../imgs/estado2.png';
import est1 from '../../imgs/est1.png';

export default class Estado2 extends React.Component {

    render() {
        return (
            <div id="EstadoReserva">
                <h1>Estado da reserva</h1>

                <p>Veja aqui o estado do seu pedido.</p>

                <img src={est1} alt="estado 2" id="estadoImg" />

                <img src={estado2} alt="segundo estado" />

                <h3>EM PROGRESSO...</h3>
                <p className="EstadoP">A sua roupa está a ser lavada.</p>
            </div>
        )
    }

}