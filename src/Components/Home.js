import React, { Component } from 'react';
import firebase from "firebase";
import Login from './Login';
import GeoLocation from './GeoLocation';
import Distance from './Distance';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false
        }
    }



  componentDidMount = () => {

    firebase.auth().onAuthStateChanged((user) => {
      
      if(user){
        this.setState({user});
        //localStorage.setItem('user',user.uid);
        this.setState({ isSignedIn: !!user })
        console.log("user", user) 
        console.log("email", user.email)
      }else{
        this.setState({user:null});
        //localStorage.removeItem('user');
      }
      
    })
    
  }


    render() {

        if (this.state.isSignedIn === true) {
        
        return (

        <div>
            <h1>Bem-vindo ao Wash </h1>
            <span>
              <div>Signed In!</div>
              <button onClick={() => this.signOut()}>Sair</button>
              <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            </span>
            
            <GeoLocation />
            <Distance
                currentLatitude={41.200046} 
                currentLongitude={-8.508542}
                destinationLatitude={41.149600}
                destinationLongitude={-8.611000}
            />



        </div>
        );
    } else {

        return(
            <div>
                <Login />
            </div>
        );
    }

    
    }

    signOut = () => {
        this.setState({
            isSignedIn: false
        })
        firebase.auth().signOut();
    }

}

export default Home;
