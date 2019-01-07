import firebase from 'firebase';


export const askForPermissioToReceiveNotifications = async () => {
 
 


  try {
 
    const messaging = firebase.messaging();

    await messaging.requestPermission();
    const token = await messaging.getToken();

     
    
    console.log('token do User: ', token);

      
          firebase.database().ref("Users/new"+firebase.auth().currentUser.uid).set(
              { 
                  name: firebase.auth().currentUser.displayName,
                  token: token,
              }
              )
          
      
  

    return token;

  } catch (error) {
    console.error(error);
  }


}

