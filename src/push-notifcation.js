import firebase from 'firebase';
var var_noti;

export const askForPermissioToReceiveNotifications = async (var_noti) => {
 
 


  try {
 
    const messaging = firebase.messaging();

    await messaging.requestPermission();
    const token = await messaging.getToken();

     
    
    console.log('token do User: ', token);

      for(let l=var_noti;l < var_noti+1;l++) {
          firebase.database().ref("Users/new"+var_noti+"").set(
              { 
                  name: firebase.auth().currentUser.displayName,
                  token: token,
              }
              )
          }
          var_noti++;
      
  
      firebase.database().ref("Number/var_notificacao").set(
      { 
          b:var_noti,
      })

    return token;

  } catch (error) {
    console.error(error);
  }


}

