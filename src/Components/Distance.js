import * as React from 'react';
import * as scriptjs from 'scriptjs';
import autocaravana from './Images/autocaravana.png';

var lavandarias = [
    ['Lavandaria Wash Club', 41.061134, -8.653998, 4,"Lavandaria Wash Club - Miramar"],
    ['Lavandaria Wash Club', 41.119489, -8.646283, 5, "Lavandaria Wash Club - Canidelo"],
    ['Lavandaria Wash Club', 41.141714, -8.624456, 3, "Lavandaria Wash Club - Cais de Gaia"],
    ['Lavandaria Wash Club', 41.161025, -8.647326, 2, "Lavandaria Wash Club - Boavista"],
    ['Lavandaria Wash Club', 41.159010, -8.662774, 1, "Lavandaria Wash Club - Gomes da Costa"]
  ];

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
    let map = new window.google.maps.Map(this.divMap,options,marker);
    
    //Cria VÁRIOS Markers e devemos de adicioná-lo no beachMarker    

    var image = {
        url: autocaravana,
        // This marker is 20 pixels wide by 32 pixels high.
        size: new window.google.maps.Size(32, 32),
        // The origin for this image is (0, 0).
        origin: new window.google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new window.google.maps.Point(0, 0)
      };
      // Shapes define the clickable region of the icon. The type defines an HTML
      // <area> element 'poly' which traces out a polygon as a series of X,Y points.
      // The final coordinate closes the poly by connecting to the first coordinate.
      
      for (let i = 0; i < lavandarias.length; i++) {
        var beach = lavandarias[i];
        var marker = new window.google.maps.Marker({
          position: {lat: beach[1], lng: beach[2]},
          map: map,
          icon: image,
          title: beach[0],
          zIndex: beach[3]
        });
        //faz o balaão de cima a explicar o que é
        var infowindow = new window.google.maps.InfoWindow({
            content: beach[5]
        });

        
      }

      for (let i = 0; i < lavandarias.length; i++) {
        marker.onClick = function() {
            infowindow.open(map, marker);
        }
    }

    //Cria UM Marker e devemos de adicioná-lo no beachMarker    

    // var beachMarker = new window.google.maps.Marker({
    //       position: {lat: 41.139700, lng: -8.609351},
    //       map: map,
    //       icon: autocaravana,
    //       title: "Wash Club - Porto"
    //     });
    //     console.log("Coordenadas do Ponto"+beachMarker.position);

    // //faz o balaão de cima a explicar o que é
    // var infowindow = new window.google.maps.InfoWindow({
    //         content: "Lavandaria Wash Club - Porto"
    // });
    // //faz o balaão de cima a explicar o que é -> ADICIONA EVENTO
    // beachMarker.addListener('click', function() {
    //     infowindow.open(map, beachMarker);
    //   });

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