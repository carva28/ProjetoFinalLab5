import firebase from 'firebase';
var variavelB;
export const askForPermissioToReceiveNotifications = async () => {

  firebase.database().ref('Number/var_notificacao').on('value', (data) => {
    console.log(data.toJSON().b);
    variavelB=data.toJSON().b;
  })

  try {

    const messaging = firebase.messaging();

    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token do User: ', token);

    for(let l=variavelB;l < variavelB+1;l++) {
        
      firebase.database().ref("Users/new"+variavelB+"").set(
        { 
          cliente: firebase.auth().currentUser.displayName,
          token:token,
          variavel:1,
        }
      ).then(() => {
        console.log("inserido com sucesso");
      }).catch((error) =>{
        console.log(error);
      });  
          
    }
    variavelB++;

    firebase.database().ref("Number/var_notificacao").set(
    { 
            b:variavelB,
    })

    
    
    return token;
  } catch (error) {
    console.error(error);
  }
}

