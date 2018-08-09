import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../../firebase'
//import FileUploader from 'react-firebase-file-uploader';
//import { db } from 'firebase'
import {InputText} from '../../camposFormulario/InputText'
import {InputImage} from '../../camposFormulario/InputImage'
import {PhotoEditor} from '../../componentesEspeciales/PhotoEditor'

/*firebase.initializeApp(config);
const storageRef = firebase.storage().ref()*/
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
		console.log("GUARDAR",this.props);
		console.log("GUARDAR STATE", this.state);
		let user = firebase.auth().currentUser;

		const storageRef = firebase.storage().ref()
		//var cityRef = db.collection('asociaciones')
		if(this.props.parametros == null){//hace un nuevo
			console.log("CREA NUEVO!!!!!!!!!", this.state.objGuardar);
			db.collection("asociaciones").add(this.state.objGuardar)
			.then((docRef) => {//.then((user) => {
			    console.log("ASOCIACION AÑADIDA OK: ", docRef.id);
					this.props.onResults("listado")
			})
			.catch(function(error) {
			    console.error("ERROR AL AÑADIR", error);
			});
		}else{//hace un update
			console.log("CREA EDICION!!!!!!!!!");
			db.collection("asociaciones").doc(this.props.parametros.id).set(this.state.objGuardar, { merge: true })
			.then(()=> {
					this.props.onResults("listado")
			    console.log("Document successfully written!");
			})
			.catch(function(error) {
			    console.error("Error writing document: ", error);
			});
		}
	}

	render(){
    return(
	        <div className="box margenes-box-listado">
						<ul>
							<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Código Asociación"} campo={"codigo"} valor={this.props.parametros != null? this.props.parametros.codigo : null} maxLength={5}/></li>
							<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Nombre Asociación"} campo={"nombreAsociacion"} valor={this.props.parametros != null? this.props.parametros.nombreAsociacion : null} maxLength={100}/></li>
							<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Email"} campo={"email"} valor={this.props.parametros != null? this.props.parametros.email : null}/></li>
							<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Telefono"} campo={"telefono"} valor={this.props.parametros != null? this.props.parametros.telefono : null}/></li>
							<li><InputImage onResults={this._retornoCampo} valor={this.props.parametros != null? this.props.parametros.pathImage : null}/></li>

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
