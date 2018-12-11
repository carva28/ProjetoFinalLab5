import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';

export default class FacebookPrincipal extends Component {

    state = {
        isLoggedIn:false,
        userID:'',
        name:'',
        email:'',
        picture:''
    }

    responseFacebook= response =>{
        // console.log(response);

        this.setState({
          isLoggedIn:true,
          name:response.name,
          email:response.email,
          picture:response.picture.data.url
        })
    }

    componentClicked = () => console.log("clicked");

  render() {
      let fbContent;

      if(this.state.isLoggedIn){
        //fbContent=null;
        fbContent=(
          <div style={{
            width: '400px',
            margin: 'auto',
            background: 'orange',
            padding: '20px'
          }}>


          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome Back, {this.state.name}</h2>
          <p>We know all about you including your email:</p><h6>{this.state.email}</h6>
          </div>
        );

      }else{
          fbContent =( 
          <FacebookLogin
            appId="2400395769988006"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
          );
      }

      
    return (
      <div>
        {fbContent}
      </div>
    )
  }
}
