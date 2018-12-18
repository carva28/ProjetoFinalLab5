import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import firebase from "firebase";
import firebaseui from "firebaseui";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";


export default class Login extends Component {
 /* constructor(props) {
    super(props);
    // this.login = this.login.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.signup = this.signup.bind(this);
    // this.state = {
    //   nome: '',
    //   email: '',
    //   password: ''
    // };
  }*/

  // handleChange(e) {
  //   this.setState({ [e.target.name]: e.target.value });
  // }

  // login(e) {
  //   e.preventDefault();
  //   firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
  //   }).catch((error) => {
  //       console.log(error);
  //     });
  // }

  // signup(e){
  //   e.preventDefault();
  //   firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
  //   }).then((u)=>{console.log(u)})
  //   .catch((error) => {
  //       console.log(error);
  //     })

  //     firebase.database().ref('Users/new').set(
  //       {
  //         name: this.state.nome,
  //         email: this.state.email,
  //       }
  //     ).then(() => {
  //       console.log('inserted!');
  //     }).catch((error)=>{
  //       console.log(error);
  //     })
  // }

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
      //  <div className="col-md-6">
      //  <form>

      //  <div className="form-group">
      // Nome
      //  <input value={this.state.nome} onChange={this.handleChange} type="name" name="nome" className="form-control" id="exampleInputNome" aria-describedby="emailHelp" placeholder="Coloque o seu nome" />
      // </div>
      // <div className="form-group">
      // Email
      //  <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
      // </div>
      //  <div className="form-group">
      //  Password
      // <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className
      // ="form-control" id="exampleInputPassword1" placeholder="Password" />
      // </div>
      // <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
      // <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Registar</button>

      <StyledFirebaseAuth
        uiConfig={this.uiConfig}
        firebaseAuth={firebase.auth()}
      />
      //  </form>

      //  </div>
    );
  }
}