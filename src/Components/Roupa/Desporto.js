import React from 'react';
import desporto from '../../imgs/desporto.png';

export default class Desporto extends React.Component {

    render() {
        return (
            <div className="caixinha">

            <img src={desporto} alt="desporto-wash-club" />
            <h4>Roupa de desporto</h4>

            <div className="botoesReserva">
              <button className="btn_increm" type="button" onClick={this.props.dec5}>&minus;</button>
              <span>{this.props.desporto}</span>
              <button className="btn_increm" type="button" onClick={this.props.inc5}>&#43;</button>
            </div>
            
          </div>
        )
    }

}