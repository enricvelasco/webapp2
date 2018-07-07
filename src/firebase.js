import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyADry8ZbwSdCwWeNMLPZUUYjijN85fDjkA",
    authDomain: "visitore-app.firebaseapp.com",
    databaseURL: "https://visitore-app.firebaseio.com",
    projectId: "visitore-app",
    storageBucket: "visitore-app.appspot.com",
    messagingSenderId: "586946593674"
  });
const db = firebase.firestore()
export default db  
