import React from 'react';
import './styles.css';
import Login from './Components/Login';
import Home from './Components/Home';
import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyAtYRTVptt8VHYLxUOe8wrztdw3Pud9Ruw",
  authDomain: "projeto-4a0db.firebaseapp.com"
})

export default class App extends React.Component {

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