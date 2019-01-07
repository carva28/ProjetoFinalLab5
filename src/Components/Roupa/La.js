import React from 'react';
import la from '../../imgs/la.png';

export default class La extends React.Component {

    render() {
        return (
            <div className="caixinha">

            <img src={la} alt="la-wash-club" />
            <h4>Roupa de lã</h4>

            <div className="botoesReserva">
              <button className="btn_increm" type="button" onClick={this.props.dec7}>&minus;</button>
              <span>{this.props.la}</span>
              <button className="btn_increm" type="button" onClick={this.props.inc7}>&#43;</button>
            </div>
            
          </div>
        )
    }

}