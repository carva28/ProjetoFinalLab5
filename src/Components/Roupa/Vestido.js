import React from 'react';
import vestido from '../../imgs/vestido.png';

export default class Vestido extends React.Component {

    render() {
        return (
            <div className="caixinha">

                <img src={vestido} alt="vestido-wash-club" />
                <h4>Vestido</h4>

                <div className="botoesReserva">
                    <button className="btn_increm" type="button" onClick={this.props.dec9}>&minus;</button>
                    <span>{this.props.vestido}</span>
                    <button className="btn_increm" type="button" onClick={this.props.inc9}>&#43;</button>
                </div>

            </div>
        )
    }

}