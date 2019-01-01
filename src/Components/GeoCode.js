import React from 'react';

export default class GeoCode extends React.Component {

    componentDidMount() {
        if (this.props.lat != null && this.props.long != null) {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.props.lat},${this.props.long}&key=API_KEY`)
                .then(response => response.json())
                .then(data => document.getElementById('Morada').innerHTML = data.results[0].formatted_address);
        }
    }

    render() {
        return (
            <p id="Morada"></p>
        )
    }

}
