import Geolocation from "react-geolocation";
import React, { Component } from 'react';

export default class GeoLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: ' ',
            long: ' '
        }
    }

    

    render() {
        var lat;
        var long;

        return (
            <div>
                <Geolocation
                    lazy 
                    render={({
                        position: {
                            coords: {
                                latitude, longitude
                            } = {} } = {},
                        error,
                        getCurrentPosition
                    }) => {
                        getCurrentPosition()
                    }
                    }   
                />
            </div>
        );
    }

    buscarCoord = (lat,long) => {
        let coordatualLat = lat;
        let coordatualLong = long;

        console.log("Passa"+coordatualLat,coordatualLong);
    }

}