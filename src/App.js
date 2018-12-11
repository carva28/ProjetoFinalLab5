import React, { Component } from 'react';
import './App.css';
import Facebook from './Components/FacebookPrincipal';
// import fire from './Components/Fire';
// import Login from './Components/Login'
// import Home from './Components/Home'
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyAtYRTVptt8VHYLxUOe8wrztdw3Pud9Ruw",
  authDomain: "projeto-4a0db.firebaseapp.com"
})

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:{},
      IssignIn:false,
    }
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }
  
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  /*componentDidMount(){
    this.authListener();
  }*/

  /*authListener(){
    fire.auth().onAuthStateChanged((user) => {
      //console.log(user);
      if(user){
        this.setState({user});
        //localStorage.setItem('user',user.uid);
      }else{
        this.setState({user:null});
        //localStorage.removeItem('user');
      }
    })
  }*/


  render() {
    return (
      <div className="App">
       
        <Facebook/>{/*
        {this.state.user ? (<Home />) : (<Login />)}
*/}
       
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img alt="profile picture" src={firebase.auth().currentUser.photoURL} />
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}

      </div>
    );
  }
}

export default App;
