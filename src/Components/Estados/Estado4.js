import React from 'react';
import estado4 from '../../imgs/estado4.png';
import est3 from '../../imgs/est3.png';

export default class Estado4 extends React.Component {

    render() {
        return (
            <div id="EstadoReserva">
                <h1>Estado da reserva</h1>

                <p>Veja aqui o estado do seu pedido.</p>

                <img src={est3} alt="estado 3" id="estadoImg" />

                <img src={estado4} alt="quarto estado" />

                <h3>JÁ ESTÁ!</h3>
                <p className="EstadoP">A sua roupa já foi entregue, esperemos que tenha ficado satisfeito com o serviço. Volte sempre!</p>
            </div>
        )
    }

}