import React, { Component } from 'react';

export default class MapaTomTom extends Component {

    componentDidMount() { 
        const script = document.createElement('script');
        script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js';
        document.body.appendChild(script);
        script.async = true;
        script.onload = function () {
          window.tomtom.L.map('map', {
            source: 'vector',
            key: 'dDdprdMaeH4DO5AAbobhHmR7H0aowxMm',
            center: [37.769167, -122.478468],
            basePath: '/sdk',
            zoom: 15
          });
        }
      }
    
      render() {
        return <div id = 'map'></div>
      }
    }