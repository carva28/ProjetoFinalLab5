import firebase from 'firebase';
 
export const askForPermissioToReceiveNotifications = async () => {
  try {
 
    const messaging = firebase.messaging();
 
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token do User: ', token);
   
    firebase.database().ref('Users/new').set(
      {
        name:"Name rapido do tele",
        token:token,
      }
    ).then(() => {
      console.log("inserido com sucesso");
    }).catch((error) =>{
      console.log(error);
    });
    return token;
  } catch (error) {
    console.error(error);
  }
}