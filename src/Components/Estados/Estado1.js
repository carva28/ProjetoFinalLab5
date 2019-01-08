import React from 'react';
import estado1 from '../../imgs/estado1.png';
import est0 from '../../imgs/est0.png';

export default class Estado1 extends React.Component {

  render() {
    return (
      <div id="EstadoReserva">
        <h1>Estado da reserva</h1>

        <p>Veja aqui o estado do seu pedido.</p>

        <img src={est0} alt="estado 0" id="estadoImg" />

        <img src={estado1} alt="primeiro estado" />

        <h3 id="EstafetaCaminho">O ESTAFETA ESTÁ A CAMINHO.</h3>
      </div>
    )
  }

}