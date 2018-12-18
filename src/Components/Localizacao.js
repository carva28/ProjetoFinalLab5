import React from 'react';

export default class Localizacao extends React.Component {

    getLocation = () => {
        console.log('ola');
        let btn = document.getElementById('btn');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
          } else { 
            btn.innerHTML = "Geolocation is not supported by this browser.";
          }
    }

    showPosition = (position) => {        
        this.setState({
            currentLat: position.coords.latitude,
            currentLong: position.coords.longitude
        })
    }

}