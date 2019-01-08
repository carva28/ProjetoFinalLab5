import React from 'react';
import estado0 from '../../imgs/estado0.png';

export default class Estado0 extends React.Component {

  render() {
    return (
      <div id="EstadoReserva">
        <h1>Estado da reserva</h1>

        <p>Veja aqui o estado do seu pedido.</p>

        <img src={estado0} alt="imagem estado reserva zero" />

        <h3>AGUARDE POR FAVOR...</h3>
        <p className="EstadoP">Um estafeta será atribuído à sua encomenda.</p>
      </div>
    )
  }

}