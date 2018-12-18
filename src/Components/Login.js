import React, { Component } from 'react';
import firebase from "firebase";
import firebaseui from "firebaseui";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import homeImg from '../imgs/homeImg.png';


export default class Login extends Component {

  uiConfig = {
    signInFlow: "popup",
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  render() {
    return (
      <div id="Login">
        <img src={homeImg} alt="ImagemHome" id="ImagemLogin" />

        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()} />

      </div>
    );
  }

}