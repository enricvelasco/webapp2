import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../firebase'

export class Checkbox extends Component{
  constructor(props){
    super(props)
    this.campo = this.props.valor
  }

  _cambioEnCheckbox=(e)=>{
    console.log("CAMBIO EN CHECKBOX",e.target);
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.props.onResults(this.props.campo, value)
  }

  render(){
    return(
      <div className="campo-input-generico-padding">
        <label className="checkbox">
          <input type="checkbox" onChange={this._cambioEnCheckbox} checked={this.props.valor}/>
          {this.props.tituloCampo}
        </label>
      </div>
    )
  }
}
