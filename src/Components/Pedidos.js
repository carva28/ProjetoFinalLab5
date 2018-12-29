import React from 'react';

export default class Pedidos extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="Pedidos">
                    <h1>Reservas</h1>
                    <p>Pode consultar aqui os seus pedidos feitos anteriormente, assim como, as suas reservas ativas.</p>
                </div>

                <div id="borderCima"></div>

                <div className="Pedidos">
                    {/* falta aqui uma imagem */}
                    <h4 id="Arquivo">Arquivo</h4>
                </div>

                <div id="borderBaixo"></div>

                <div className="Pedidos">
                    <div className="Ativos">
                        <p>Pedido #123dsa</p>
                    </div>

                    <div className="Ativos">
                        <p>Pedido #123dsa</p>
                    </div>
                    
                    <div className="Ativos">
                        <p>Pedido #123dsa</p>
                    </div>
                </div>

            </div>
        )
    }
}