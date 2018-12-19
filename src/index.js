import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Desktop from './Desktop';
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

/* if (window.innerWidth <= 500) { */
    ReactDOM.render(<App />, document.getElementById('root'));
/* } else if (window.innerWidth > 500) {
    ReactDOM.render(<Desktop />, document.getElementById('root'));
} */

serviceWorker.unregister();