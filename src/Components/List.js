import React, { Component } from 'react';
import Distance from './Distance';

var destiLat,destiLong;


export default class List extends Component {
    
    submit = (event) => {
        console.log('Selected value:', event.target.value);
        if(event.target.value=="Lavandaria Wash Club - Miramar"){
            // <Distance 
            // destinationLatitude={41.061134}
            // destinationLongitude={-8.653998} 

            // />
            destiLat = 41.061134;
            destiLong = -8.653998;
            console.log("Miramar"+destiLat);
            
        }else if(event.target.value=="Lavandaria Wash Club - Canidelo"){
            // <Distance 
            //     destinationLatitude={41.119489}
            //     destinationLongitude={-8.646283} 
            // />
            destiLat = 41.119489;
            destiLong = -8.64628;
            console.log("Canidelo"+destiLat);
        }

      }
    render(){
        
        console.log("vai aqui"+destiLat);

        return(
            
            <div>
                <b>Start: </b>
                <select onChange={this.submit}>
                    <option value="Lavandaria Wash Club - Miramar">Lavandaria Wash Club - Miramar</option>
                    <option value="Lavandaria Wash Club - Canidelo">Lavandaria Wash Club - Canidelo</option>
                    <option value="joplin, mo">Joplin, MO</option>
                    <option value="oklahoma city, ok">Oklahoma City</option>
                    <option value="oklahoma city, ok">Oklahoma City</option>
                </select>
                <Distance 
                    currentLatitude={41.200046}
                    currentLongitude={-8.508542}
                    destinationLatitude={destiLat}
                    destinationLongitude={destiLong} 
                    
                />
                
            </div>
                

        );
        
    }
    
}