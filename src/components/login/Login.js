import React, { Component } from 'react';
import firebase from 'firebase';

export class Login extends Component{

  constructor(props){
    super(props)
    this.state = {
      isLogin:false
    }
    //this.loading = true
    console.log("CONSTRUCTOR PROPS", props);
    console.log("CONSTRUCTOR", this.state);
  }
  /*componentWillUpdate(props){//solo lo ejecuta la primera vez
    console.log("EJECUTA COMPONENT WILL MOUNT MENU LATERAL", props);

  }*/

  _goToLogIn=(e)=>{
    console.log("DETECTA EL CLICK DE LOGIN", this.state)
    console.log("DETECTA EL CLICK DE LOGIN", this.props)
    firebase.auth().signInWithEmailAndPassword(this.state.emailLogin, this.state.passwordLogin).then((user) => {
      var user = firebase.auth().currentUser;
      //isLogin = true;
      console.log("CURRENT USER", user);
      console.log("TODO OK",this.state.isLogin);
      this.props.onResults(true, user)
    }).catch(function(error) {
      // Handle Errors here.
      //console.log("TODO BAD", this.state.isLogin);
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        console.log("error en password")
      } else if(errorCode === 'auth/user-not-found'){
        console.log("usuario no encontrado")
      }else if(errorCode === 'auth/invalid-email'){
        console.log("email invalido")
      }
      console.log("IMPRIME ERROR", error);
      //this.props.onResults(false)
    });


    /*firebase.auth().onAuthStateChanged(function(usuarioRet) {
      console.log("Cambia el estado", usuarioRet);
      if (usuarioRet) {
        this.props.onResults(usuarioRet)
        // User is signed in.
        // ...
      } else {
        this.props.onResults(usuarioRet)
        // User is signed out.
        // ...
      }
    });*/



    //this.props.onResults(data)
  }
  _updateInputValue=(e)=>{
    //console.log("DETECTA EL ONCHANGE", e.target.value);
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  render(){
    return(
      <div className = "box centradoLogin">
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" type="email" placeholder="Email" onChange={this._updateInputValue} name="emailLogin"/>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
          </div>
          <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="password" placeholder="Password" onChange={this._updateInputValue} name="passwordLogin"/>
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
          </div>
          <button className="button is-link is-rounded" onClick={
                    ((e) => this._goToLogIn(e))
                  }>LogIn</button>
      </div>
    )
  }
}
