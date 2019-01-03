import React from 'react';
import estado01 from '../imgs/estado01.png';

export default class EstadoReserva extends React.Component {

   /*  constructor(props) {
        super(props);
    } */

    render() {
        return (
            <div id="EstadoReserva">
                <h1>Estado da reserva</h1>

                <p>Veja aqui o estado do seu pedido.</p>

                <p className="EstadoP">Pedido #123dsa</p>

                {/* falta aqui uma cena bonito que está no Xd */}

                <img src={estado01} alt="primeiro estado" />

                <h3>EM PROGRESSO...</h3>
                <p className="EstadoP">A sua roupa está a ser lavada.</p>
            </div>
        )
    }

}