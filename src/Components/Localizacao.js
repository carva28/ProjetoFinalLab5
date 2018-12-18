import React from 'react';

export default class Localizacao extends React.Component {

    render() {
        return (
            <div>
                <button onClick={this.props.ola}>Ver localização</button>
                <p id="btn"></p>
            </div>
        );
    }

}