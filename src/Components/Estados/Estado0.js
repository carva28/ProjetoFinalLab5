import React from 'react';
import estado0 from '../../imgs/estado00.png';
import est0 from '../../imgs/est0.png';

export default class Estado0 extends React.Component {

  render() {
    return (
      <div id="EstadoReserva">
        <h1>Estado da reserva</h1>

        <p>Veja aqui o estado do seu pedido.</p>

        <p className="EstadoP">Pedido #123dsa</p>

        <img src={est0} alt="estado 0" id="estadoImg" />

        <img src={estado0} alt="imagem estado reserva zero" />

        <h3 id="EstafetaCaminho">O ESTAFETA ESTÁ A CAMINHO.</h3>
      </div>
    )
  }

}