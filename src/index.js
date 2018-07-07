import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import firebase from 'firebase';
import { BrowserRouter } from 'react-router-dom'


/*const config = {
    apiKey: "AIzaSyADry8ZbwSdCwWeNMLPZUUYjijN85fDjkA",
    authDomain: "visitore-app.firebaseapp.com",
    databaseURL: "https://visitore-app.firebaseio.com",
    projectId: "visitore-app",
    storageBucket: "visitore-app.appspot.com",
    messagingSenderId: "586946593674"
  };

  firebase.initializeApp(config);*/

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
