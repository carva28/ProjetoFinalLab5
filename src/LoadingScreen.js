import React from 'react';
import logo from './imgs/logo.png';

export default class Loading extends React.Component {

    render() {
        return(
            <div id="Loading">
                <img src={logo} alt="logo" />
                <h1>A carregar...</h1>
            </div>
        );
    }

}