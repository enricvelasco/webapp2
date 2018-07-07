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
		console.log("GUARDAR INFO",this.state.objGuardar);
		let user = firebase.auth().currentUser;
    console.log("EL USUARIO ACTUAL", user);
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
		console.log("RECUPERA COLLECTION");
	}

	render(){
    return(
	        <div className="box margenes-box-listado">
						<ul>
							<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Código Asociación"} campo={"codigo"} maxLength={5}/></li>
							<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Nombre Asociación"} campo={"nombreAsociacion"} maxLength={100}/></li>
							<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Email"} campo={"email"}/></li>
							<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Telefono"} campo={"telefono"}/></li>
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
