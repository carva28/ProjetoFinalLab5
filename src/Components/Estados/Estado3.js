import React from 'react';
import estado3 from '../../imgs/estado3.png';
import est2 from '../../imgs/est2.png';

export default class Estado3 extends React.Component {

    render() {
        return (
            <div id="EstadoReserva">
                <h1>Estado da reserva</h1>

                <p>Veja aqui o estado do seu pedido.</p>

                <img src={est2} alt="estado 2" id="estadoImg" />

                <img src={estado3} alt="terceiro estado" />

                <h3>ESTÁ QUASE!</h3>
                <p className="EstadoP">A sua roupa está lavada, seca e pronta a ser entregue por um estafeta.</p>
            </div>
        )
    }

}