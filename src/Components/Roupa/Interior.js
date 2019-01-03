import React from 'react';
import interior from '../../imgs/interior.png';

export default class Interior extends React.Component {

    render() {
        return (
            <div className="caixinha">

            <img src={interior} alt="interior-wash-club" />
            <h4>Roupa interior</h4>

            <div className="botoesReserva">
              <button className="btn_increm" type="button" onClick={this.props.dec6}>&minus;</button>
              <span>{this.props.interior}</span>
              <button className="btn_increm" type="button" onClick={this.props.inc6}>&#43;</button>
            </div>
            
          </div>
        )
    }

}