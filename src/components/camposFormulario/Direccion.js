import React, { Component } from 'react';

import {InputText} from './InputText'

export class Direccion extends Component{
  constructor(props){
    super(props)
    this.state = {objGuardar:{}}
  }

  _retornoCampo=(campo, valor)=>{
  		this.state.objGuardar[campo] = valor
      this.props.onResults("direccion", this.state.objGuardar)
  }

  render(){
    return(
      <div>
        Dirección
        <div>
          <li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Calle"} campo={"calle"} valor={this.props.valor != null? this.props.valor.calle : null} maxLength={100}/></li>
          <li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Número"} campo={"numero"} valor={this.props.valor != null? this.props.valor.numero : null} maxLength={100}/></li>
          <li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Ciudad"} campo={"ciudad"} valor={this.props.valor != null? this.props.valor.ciudad : null}/></li>
          <li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"CP"} campo={"postalCode"} valor={this.props.valor != null? this.props.valor.postalCode : null}/></li>
          <li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Pais"} campo={"pais"} valor={this.props.valor != null? this.props.valor.pais : null}/></li>
        </div>
      </div>
    )
  }
}
