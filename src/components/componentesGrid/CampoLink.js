import React, { Component } from 'react';

export class CampoLink extends Component{
  constructor(props, context) {
    super(props, context);

    //console.log("PROPS DE ENTRADA CAMPO LINK", props);
    console.log("CAMPO LINK ID", this.props.value.id);
    console.log("CAMPO LINK VALORES", this.props.value.data());
  }

  _clickEnCampoLink=(e)=>{
    console.log("CLICK EN CAMPO LINK", e);
    let campo = this.props.value.data()
    campo.id = this.props.value.id

    this.props.onResults(campo)
  }

  render(){
    return(
      //<button className="button is-link" onClick={((e) => this._clickEnCampoLink(e))}>Edit</button>
      <a href="#" onClick={((e) => this._clickEnCampoLink(e))}>
        {this.props.value.data().codigo}
      </a>
    )}
}
