import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../../firebase'
//import { db } from 'firebase'
import {InputText} from '../../camposFormulario/InputText'

//const dbTasks = firebase.collection('tasks')

export class FormularioAsociaciones extends Component{
	constructor(props) {
    super(props);
    this.state = {objGuardar:{}};
		console.log("FORMULARIO PROPS LLEGAN", props);
  }
	/*componentDidMount() {
		console.log("FORM COMPONENT DID MOUNT");
		this.state.objGuardar = {}
	}*/
	_retornoCampo = (campo, valor) =>{
    console.log("RETORNA INPUT", campo, valor);
		this.state.objGuardar[campo] = valor
  }
	_cancelFormulario=(e)=>{
		this.props.onResults("listado")
	}
	_saveFormulario=(e)=>{
		let user = firebase.auth().currentUser;
		//var cityRef = db.collection('asociaciones')
		db.collection("asociaciones").add(this.state.objGuardar)
		.then((docRef) => {//.then((user) => {
		    console.log("ASOCIACION AÑADIDA OK: ", docRef.id);
				//enviar al Listado
				this.props.onResults("listado")
		})
		.catch(function(error) {
		    console.error("ERROR AL AÑADIR", error);
		});
	}

	render(){
    return(
	        <div className="box margenes-box-listado">
						<ul>
							<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Código Asociación"} campo={"codigo"} valor={this.props.parametros != null? this.props.parametros.codigo : null} maxLength={5}/></li>
							<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Nombre Asociación"} campo={"nombreAsociacion"} valor={this.props.parametros != null? this.props.parametros.nombreAsociacion : null} maxLength={100}/></li>
							<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Email"} campo={"email"} valor={this.props.parametros != null? this.props.parametros.email : null}/></li>
							<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Telefono"} campo={"telefono"} valor={this.props.parametros != null? this.props.parametros.telefono : null}/></li>
						</ul>
						<div className="columns">
						  <div className="column is-half">
								<button className="button is-primary boton-save" onClick={
			                    ((e) => this._saveFormulario(e))
			                  }>Guardar</button>
							</div>
						  <div className="column is-half">
								<button className="button is-danger boton-cancel" onClick={
			                    ((e) => this._cancelFormulario(e))
			                  }>Cancelar</button>
							</div>
						</div>
					</div>
    )
  }
}
