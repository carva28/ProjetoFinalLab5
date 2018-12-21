import React from 'react';
import './styles.css';
import Login from './Components/Login';
import Home from './Components/Home';
import Menu from './Components/Menu';
import firebase from "firebase";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isSignedIn: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user
        });
        this.setState({
          isSignedIn: !!user
        })
        console.log("user", user)
        console.log("email", user.email)
      } else {
        this.setState({
          user: null
        });
      }
    })
  }

  render() {

    if (this.state.isSignedIn === true) {
      return (
        <div>
          <Menu signedIn={this.state.isSignedIn}/>
          <Home paraSair={this.signOut} />
        </div>
      )
    } else {
      return (
        <div>
          <Login />
        </div>
      )
    }
  }

  signOut = () => {
      this.setState({
          isSignedIn: false
      })
      firebase.auth().signOut();
  }

}