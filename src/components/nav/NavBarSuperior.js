import React, { Component } from 'react';
import firebase from 'firebase';

export class NavBarSuperior extends Component{
  constructor(props){
    super(props)
    /*this.state = {
      isLogin:false
    }*/
  }
  _goToLogOut=(e)=>{
    console.log("HA CLICADO PARA HACER EL LOG OUT", this.props);
    firebase.auth().signOut()
    .then(() => {
      // Sign-out successful.
      this.props.onResults(false)
    })
    .catch(function(error) {
      console.log("ERROR", error);
      // An error happened
    });
  }
  render(){
    return(
      <div>
        <nav className= "navbar has-shadow is-spaced">
          <div className = "container">
            <div className = "navbar-brand">
              <div className="navbar-item">
                LOGO
              </div>
            </div>
            <div className="navbar-menu">
              <div className="navbar-start">

              </div>
              <div className="navbar-end">
                {this.props.showLogOutButton &&
                  <div className="navbar-item">
                    <button className="button" onClick={
                              ((e) => this._goToLogOut(e))
                            }>Log Out</button>
                  </div>
                }
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
