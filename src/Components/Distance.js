import * as React from 'react';
import * as scriptjs from 'scriptjs';

export default class Distance extends React.Component {


divMap;
divDirectionsPanel;
directionsDisplay;

componentDidMount() {
    scriptjs('https:/maps.googleapis.com/maps/api/js?key=AIzaSyD2NUMP4Asu36pENcaLD9ZDPbxCU0Xt-ig&sensor=false',
    () => {
        this.createMap();
        this.calculateRoute();
        
        if (!this.props.disablePanel) {
            this.createPanel();
        }
        
    });
}

createMap() {
    
    this.directionsDisplay = new window.google.maps.DirectionsRenderer();
    let currentLatLong = new window.google.maps.LatLng(this.props.currentLatitude, this.props.currentLongitude);

    let options = {
        zoom: 13,
        center: currentLatLong,
        mapTypeControl: true,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_BOTTOM
        }
       
    };
    let map = new window.google.maps.Map(this.divMap,options,beachMarker);
    //Cria um Marker e devemos de adicioná-lo no beachMarker
    var image = 'https://dl1.cbsistatic.com/i/r/2017/01/31/abd667bf-09fa-4e54-a813-151d657fa2e1/thumbnail/32x32/5e805607808f6856d13635f9c32f3740/fmimg4182085322769200688.png';
    var beachMarker = new window.google.maps.Marker({
          position: {lat: 41.139700, lng: -8.609351},
          map: map,
          icon: image,
          title: "Pontinha"
        });
        console.log("Coordenadas do Ponto"+beachMarker.position);

    //faz o balaão de cima a explicar o que é
    var infowindow = new window.google.maps.InfoWindow({
            content: "Hi there"
    });
    //faz o balaão de cima a explicar o que é -> ADICIONA EVENTO
    beachMarker.addListener('click', function() {
        infowindow.open(map, beachMarker);
      });

    this.directionsDisplay.setMap(map);

}





createPanel() {
    this.directionsDisplay.setPanel(this.divDirectionsPanel);        
}

calculateRoute() {
    let directionsService = new window.google.maps.DirectionsService();
    let start = new window.google.maps.LatLng(this.props.currentLatitude, this.props.currentLongitude);
    let end =  new window.google.maps.LatLng(this.props.destinationLatitude, this.props.destinationLongitude);

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
    //CHANGE AND PUT YOUR STYLES
    let style = {
        width: window.innerWidth - 25,
        height: window.innerHeight- 30,
        overflow: 'scroll'
    }
    return (
        <div>
            <div 
                style={style} 
                ref={divMap =>  this.divMap = divMap}></div>
            <div 
                style={style} 
                ref={divDirectionsPanel => this.divDirectionsPanel = divDirectionsPanel}></div>
        </div>
    );
}
}