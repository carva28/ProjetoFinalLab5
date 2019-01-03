import React from 'react';
import camisa from '../../imgs/camisa.png';

export default class Camisas extends React.Component {

    render() {
        return (
            <div className="caixinha">

                <img src={camisa} alt="camisa-wash-club" />
                <h4>Camisa</h4>

                <div className="botoesReserva">
                    <button className="btn_increm" type="button" onClick={this.props.dec}>&minus;</button>
                    <span>{this.props.camisas}</span>
                    <button className="btn_increm" type="button" onClick={this.props.inc}>&#43;</button>
                </div>

            </div>
        )
    }

}