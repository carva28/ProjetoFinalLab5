import React, { Fragment } from 'react';
import './styles.css';
import Login from './Components/Login';
import firebase from "firebase";
import VerificaUser from './Components/VerifcaUser';

var toggle = 'fechado';
var var_estafeta;
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isSignedIn: false,
      cargo:'',
      arrayestafeta:[],
    }
  }

  toggleLista = () => {
    console.log(toggle);
    var lista = document.getElementById('ListaMenu');

    if (toggle === 'fechado') {
      lista.style.display = 'block';
      toggle = 'aberto';
    } else if (toggle === 'aberto') {
      lista.style.display = 'none';
      toggle = 'fechado';
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

        firebase.database().ref('Number/var_estafeta').on('value', (data) => {
          console.log(data.toJSON().d);
          var_estafeta=data.toJSON().d;
         
        }) 
        
        this.estaloops = setTimeout(() =>{
          for(let est=1;est<=var_estafeta;est++){
            firebase.database().ref("Utilizadores/Estafeta/estafeta0"+est+"").on('value', (data) => {
              //emailteste=data.toJSON().emailestafeta;
              if(user.email === data.toJSON().emailestafeta){
                alert('I found it')
                this.setState({
                  cargo:'estafeta'
                })
                alert(this.state.cargo)
              }else if(user.email !== data.toJSON().emailestafeta){
                this.setState({
                  cargo:'cliente'
                })
                alert('try again estafeta')
              }
            })
            
            
          }
            
              
            
            
          

        }, 1000);


      } else {
        this.setState({
          user: null
        });
      }
    })
  }

  render() {
    console.log(this.state.cargo)
    if (this.state.isSignedIn === true) {
      
      return(
      <div> 
        <VerificaUser 
          ola={this.state.cargo}
        />
      </div>
      );
     
    }else {
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