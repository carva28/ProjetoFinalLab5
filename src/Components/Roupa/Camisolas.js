import React from 'react';
import camisola from '../../imgs/camisola.png';

export default class Camisolas extends React.Component {

    render() {
        return (
            <div className="caixinha">

                <img src={camisola} alt="camisola-wash-club" />
                <h4>Camisola</h4>

                <div className="botoesReserva">
                    <button className="btn_increm" type="button" onClick={this.props.dec3}>&minus;</button>
                    <span>{this.props.camisolas}</span>
                    <button className="btn_increm" type="button" onClick={this.props.inc3}>&#43;</button>
                </div>

            </div>
        )
    }

}