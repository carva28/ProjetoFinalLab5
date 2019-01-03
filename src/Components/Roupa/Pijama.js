import React from 'react';
import pijama from '../../imgs/pijama.png';

export default class Pijamas extends React.Component {

    render() {
        return (
            <div className="caixinha">

            <img src={pijama} alt="pijama-wash-club" />
            <h4>Pijamas</h4>

            <div className="botoesReserva">
              <button className="btn_increm" type="button" onClick={this.props.dec8}>&minus;</button>
              <span>{this.props.pijama}</span>
              <button className="btn_increm" type="button" onClick={this.props.inc8}>&#43;</button>
            </div>
            
          </div>
        )
    }

}