
import * as React from 'react';
import * as scriptjs from 'scriptjs';
import autocaravana from '../imgs/autocaravana.png';
//import List from './List';
import firebase from 'firebase';

var lavandarias = [
    ['Lavandaria Wash Club', 41.061134, -8.653998, 4, "Lavandaria Wash Club - Miramar"],
    ['Lavandaria Wash Club', 41.119489, -8.646283, 5, "Lavandaria Wash Club - Canidelo"],
    ['Lavandaria Wash Club', 41.141714, -8.624456, 3, "Lavandaria Wash Club - Cais de Gaia"],
    ['Lavandaria Wash Club', 41.161025, -8.647326, 2, "Lavandaria Wash Club - Boavista"],
    ['Lavandaria Wash Club', 41.159010, -8.662774, 1, "Lavandaria Wash Club - Gomes da Costa"]
];

var fire

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
        })
    }

    componentDidMount() {
        scriptjs('https:/maps.googleapis.com/maps/api/js?key=AIzaSyD2NUMP4Asu36pENcaLD9ZDPbxCU0Xt-ig&sensor=false',
            () => {
                this.createMap();
                this.calculateRoute();

                if (!this.props.disablePanel) {
                    this.createPanel();
                }
            });

            firebase.database().ref('Coordenadas').once('value', (data) =>{ console.log(data.toJSON()); })
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

        let map = new window.google.maps.Map(this.divMap, options, marker);

        //Cria vários markers
        var image = {
            url: autocaravana,
            size: new window.google.maps.Size(32, 32),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(0, 0)
        };

        for (let i = 0; i < lavandarias.length; i++) {
            var marker = new window.google.maps.Marker({
                position: {
                    lat: lavandarias[i][1],
                    lng: lavandarias[i][2]
                },
                map: map,
                icon: image,
                title: lavandarias[i][0],
                zIndex: lavandarias[i][3]
            });

            var content = "<h5>" + lavandarias[i][4] + "</h5>";

            var infowindow = new window.google.maps.InfoWindow();

            var currentInfoWindow = null;

            window.google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
                return function () {
                    infowindow.setContent(content);

                    if (currentInfoWindow != null) {
                        currentInfoWindow.close();
                    }
                    infowindow.open(map, marker);
                    currentInfoWindow = infowindow;

                };
            })(marker, content, infowindow));
        }

        var trafficLayer = new window.google.maps.TrafficLayer();
        trafficLayer.setMap(map);

        this.directionsDisplay.setMap(map);
    }

    createPanel() {
        this.directionsDisplay.setPanel(this.divDirectionsPanel);
    }

    calculateRoute() {
        let directionsService = new window.google.maps.DirectionsService();
        let start = new window.google.maps.LatLng(this.props.currentLatitude, this.props.currentLongitude);
        let end = new window.google.maps.LatLng(this.state.destLatitude, this.state.destLongitude);

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
        console.log('prop lat: ' + this.props.destinationLatitude);

        console.log('Distance.js - Atual Lat: ' + this.props.currentLatitude);
        console.log('Distance.js - Destino Lat: ' + this.state.destLatitude);

        return (
            <div>
                <div id="MapaGoogle" ref={divMap => this.divMap = divMap}></div>
                <div id="Direcoes" ref={divDirectionsPanel => this.divDirectionsPanel = divDirectionsPanel}></div>

                <button onClick={() => this.renderiza()}>Re render component</button>
            </div>
        );
    }
}