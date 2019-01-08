import React from 'react';
import * as scriptjs from 'scriptjs';
import spot from '../imgs/spot.png';

export default class Distance extends React.Component {

    divMap;
    divDirectionsPanel;
    directionsDisplay;
    constructor(props) {
        super(props);
        this.state = {
            destLatitude: this.props.destinationLatitude,
            destLongitude: this.props.destinationLongitude
        }

    }

    renderiza = () => {
        this.setState({
            destLatitude: this.props.destinationLatitude,
            destLongitude: this.props.destinationLongitude
        }, () => {
            this.calculateRoute(this.state.destLatitude, this.state.destLongitude);
        })
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            scriptjs('https:/maps.googleapis.com/maps/api/js?key=AIzaSyD2NUMP4Asu36pENcaLD9ZDPbxCU0Xt-ig&sensor=false',
                () => {
                    this.createMap();
                    this.calculateRoute();

                    if (!this.props.disablePanel) {
                        this.createPanel();
                    }
                });

        }, 1000);
    }

    createMap() {
        this.directionsDisplay = new window.google.maps.DirectionsRenderer();
        let currentLatLong = new window.google.maps.LatLng(this.props.currentLatitude, this.props.currentLongitude);

        let options = {
            zoom: 12,
            center: currentLatLong,
            mapTypeControl: true,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP,
            fullscreenControl: false,
            streetViewControl: false,
            zoomControlOptions: {
                position: window.google.maps.ControlPosition.RIGHT_BOTTOM
            }
        };

        let map = new window.google.maps.Map(this.divMap, options, MeuMarker);

        var imageMeuMarker = {
            url: spot,
        };
        var MeuMarker = new window.google.maps.Marker({
            position: {
                lat: this.props.currentLatitude,
                lng: this.props.currentLongitude
            },
            map: map,
            animation: window.google.maps.Animation.DROP,
            icon: imageMeuMarker
        });


        var trafficLayer = new window.google.maps.TrafficLayer();
        trafficLayer.setMap(map);

        this.directionsDisplay.setMap(map);
    }

    createPanel() {
        this.directionsDisplay.setPanel(this.divDirectionsPanel);
    }

    calculateRoute(lat1, long1) {
        let directionsService = new window.google.maps.DirectionsService();
        let start = new window.google.maps.LatLng(this.props.currentLatitude, this.props.currentLongitude);
        //let end = new window.google.maps.LatLng(this.props.destinationLatitude, this.props.destinationLongitude);
        let end = new window.google.maps.LatLng(lat1, long1);

        let request = {
            origin: start,
            destination: end,
            travelMode: window.google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request, (response, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                this.directionsDisplay.setDirections(response);
            }
        });
    }

    render() {
        return (
            <div>
                <div id="MapaGoogle" ref={divMap => this.divMap = divMap}></div>
                <div id="Direcoes"
                    ref={divDirectionsPanel => this.divDirectionsPanel = divDirectionsPanel}>
                </div>
            </div>
        );
    }

}