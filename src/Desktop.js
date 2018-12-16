import React from 'react';
import homeImg from './imgs/homeImg.png';

export default class Desktop extends React.Component {

    render() {
        return (
            <div id="Desktop">
                <img src={homeImg} alt="Imagem de washClub" />
                <p>Apenas disponível em <i>mobile</i>.</p>
            </div>
        );
    }

}