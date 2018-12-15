import React, { Component } from 'react';  
import GoogleMap from 'google-distance-matrix';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GeoLocation from './GeoLocation';

class MapaGoogle extends Component {
  constructor() {
    super();
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      address: '', 
      dest:'', 
      distanceText:'testing the distance text'
    };
    // this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.onChange = (address) => this.setState({ address });
    this.changeDest = (dest) => this.setState({dest});
  }
  
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: false
    });
  }
     
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };


  render() {
    
    return(
      <Map
        google={this.props.google}
        onClick={this.onMapClicked}
        initialCenter={{
          lat: 40.633641,
          lng: -8.648679
        }}
      >
        
      <GeoLocation callbackFromParent={this.myCallback}/>
      
      <Marker
    title={'The marker`s title will appear as a tooltip.'}
    name={'SOMA'}
    position={{lat: 40.630, lng: -8.6488703}} />

      <Marker
        onClick={this.onMarkerClick}
        title={'The marker`s title will appear as a tooltip.'}
        name={'Wash Me'} 
        position={{lat: 40.633641, lng: -8.648679}}
                  icon={{
                        url:"https://dl1.cbsistatic.com/i/r/2017/01/31/abd667bf-09fa-4e54-a813-151d657fa2e1/thumbnail/32x32/5e805607808f6856d13635f9c32f3740/fmimg4182085322769200688.png",                        
                    }}
      />
            
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}>
       <div>
          <h2>{this.state.selectedPlace.name}</h2>
        </div>
      </InfoWindow>
    </Map>

        );
      }

      myCallback = (coordLat, coordLong) => {
        //data from child
        console.log('coordLat: ' +  coordLat);
        console.log('coordLong: ' +  coordLong);
      }


}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyA-n2fBJ53lOniucCtAEkxQrtOTH6EE5tM")
  })(MapaGoogle)

