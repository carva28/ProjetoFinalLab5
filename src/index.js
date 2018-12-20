import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase';
import * as serviceWorker from './serviceWorker';

export const initializeFirebase = () => {
    firebase.initializeApp({
      apiKey: "AIzaSyAtYRTVptt8VHYLxUOe8wrztdw3Pud9Ruw",
      authDomain: "projeto-4a0db.firebaseapp.com",
      databaseURL: "https://projeto-4a0db.firebaseio.com",
      projectId: "projeto-4a0db",
      messagingSenderId: "1025840405057"
    })
  }

initializeFirebase();
  
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

