import React, { Component } from 'react';
import './App.css';
import Login from './Components/Login';
import Home from './Components/Home';
import firebase from "firebase";
//import GoogleMap from "./Components/GoogleMap";

firebase.initializeApp({
  apiKey: "AIzaSyAtYRTVptt8VHYLxUOe8wrztdw3Pud9Ruw",
  authDomain: "projeto-4a0db.firebaseapp.com"
})

class App extends Component {

  
  constructor(props){
    super(props);
    this.state = {
      user: {},
      IssignIn:false,
    }
   
  }

  

  render() { 

      return(
        <div className="App">
          {this.state.user ? (<Home />) : (<Login />)}
        </div>
      );
  
  }
}

export default App;
