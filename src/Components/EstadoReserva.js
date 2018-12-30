import React from 'react';

export default class EstadoReserva extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="EstadoReserva">
                <h1>Estado da reserva</h1>

                <p>Veja aqui o estado do seu pedido.</p>

                <span>Pedido #123dsa</span>
            </div>
        )
    }

}