import React, { Component } from 'react';

export class CampoLink extends Component{
  constructor(props, context) {
    super(props, context);
  }

  _clickEnCampoLink=(e)=>{
    console.log("CLICK EN CAMPO LINK", e);
  }

  render(){
    return(
      <button className="button is-link" onClick={((e) => this._clickEnCampoLink(e))}>Edit</button>
      /*<a href="#" onClick={((e) => this._clickEnCampoLink(e))}>
        {this.props.campo}
      </a>*/
    )}
}
