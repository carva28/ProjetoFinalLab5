import React from 'react';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import homeImg from '../imgs/homeImg.png';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    }).catch((error) => {
      console.log(error);
    });
  }

  signup(e) {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    }).then((u) => { console.log(u) })
      .catch((error) => {
        console.log(error);
      })
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  render() {
    return (
      <div id="Login">

        <img src={homeImg} alt="ImagemHome" id="ImagemLogin" />

        <h3>Faça registo/login:</h3>

        <form id="LoginForm">
          <input
            value={this.state.email} onChange={this.handleChange}
            type="email" name="email" id="exampleInputEmail1"
            aria-describedby="emailHelp" placeholder="E-mail" />
          <br />
          <input
            value={this.state.password} onChange={this.handleChange}
            type="password" name="password" id="exampleInputPassword1"
            placeholder="Password" />

          <div id="BotoesForm">
            <button onClick={this.signup} className="btn btn-success">Registar</button>
            <br />
            <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
          </div>

          <hr />

          <h3>Ou conecte-se com o:</h3>

          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </form>

      </div>
    );
  }
}