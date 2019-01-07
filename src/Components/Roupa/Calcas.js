import React from 'react';
import calcas from '../../imgs/calcas.png';

export default class Calcas extends React.Component {

    render() {
        return (
            <div className="caixinha">

            <img src={calcas} alt="camisa-wash-club" />
            <h4>Calças</h4>

            <div className="botoesReserva">
              <button className="btn_increm" type="button" onClick={this.props.dec2}>&minus;</button>
              <span>{this.props.calcas}</span>
              <button className="btn_increm" type="button" onClick={this.props.inc2}>&#43;</button>
            </div>
            
          </div>
        )
    }

}