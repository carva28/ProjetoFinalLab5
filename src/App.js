import React from 'react';
import './styles.css';
import Login from './Components/Login';
import Home from './Components/Home';
import Menu from './Components/Menu';

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
        <div>
          <Menu />
          {this.state.user ? (<Home />)  : (<Login />)}
        </div>

      );
  
  }
}