import React from 'react';
import casacos from '../../imgs/casacos.png';

export default class Casacos extends React.Component {

    render() {
        return (
            <div className="caixinha">

            <img src={casacos} alt="casacos-wash-club" />
            <h4>Casacos</h4>

            <div className="botoesReserva">
              <button className="btn_increm" type="button" onClick={this.props.dec4}>&minus;</button>
              <span>{this.props.casacos}</span>
              <button className="btn_increm" type="button" onClick={this.props.inc4}>&#43;</button>
            </div>
            
          </div>
        )
    }

}