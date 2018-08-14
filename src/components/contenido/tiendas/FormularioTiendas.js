import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../../firebase'
//import FileUploader from 'react-firebase-file-uploader';
//import { db } from 'firebase'
import {InputText} from '../../camposFormulario/InputText'
import {InputImage} from '../../camposFormulario/InputImage'
import {Select} from '../../camposFormulario/Select'
import {PhotoEditor} from '../../componentesEspeciales/PhotoEditor'
import {Direccion} from '../../camposFormulario/Direccion'
import {CamposSeleccionables} from '../../componentesEspeciales/CamposSeleccionables'

export class FormularioTiendas extends Component{
	constructor(props) {
    super(props);
    this.state = {objGuardar:{}, tabSelect:0};
		//this._camposTab()
  }
	_retornoCampo = (campo, valor) =>{
		this.state.objGuardar[campo] = valor
  }
	_cancelFormulario=(e)=>{
		this.props.onResults("listado")
	}
	_saveFormulario=(e)=>{
		let user = firebase.auth().currentUser;

		const storageRef = firebase.storage().ref()
		if(this.props.parametros == null){//hace un nuevo
			db.collection("tiendas").add(this.state.objGuardar)
			.then((docRef) => {//.then((user) => {
			    console.log("ASOCIACION AÑADIDA OK: ", docRef.id);
					this.props.onResults("listado")
			})
			.catch(function(error) {
			    console.error("ERROR AL AÑADIR", error);
			});
		}else{//hace un update
			console.log("CREA EDICION!!!!!!!!!");
			db.collection("tiendas").doc(this.props.parametros.id).set(this.state.objGuardar, { merge: true })
			.then(()=> {
					this.props.onResults("listado")
			    console.log("Document successfully written!");
			})
			.catch(function(error) {
			    console.error("Error writing document: ", error);
			});
		}
	}

	_camposTab = () =>{
		var camposMontar;
		//console.log("ENTRA EN CAMPO TAB FUNC", this.state.tabSelect);
		if(this.state.tabSelect == 0){
			camposMontar = (
			<ul>
			<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Código Tienda"} campo={"codigo"} valor={this.props.parametros != null? this.props.parametros.codigo : null} maxLength={5}/></li>
			<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Nombre Tienda"} campo={"nombre"} valor={this.props.parametros != null? this.props.parametros.nombreAsociacion : null} maxLength={100}/></li>
			<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Email"} campo={"email"} valor={this.props.parametros != null? this.props.parametros.email : null}/></li>
			<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Telefono"} campo={"telefono"} valor={this.props.parametros != null? this.props.parametros.telefono : null}/></li>
			<li><Select onResults={this._retornoCampo} obligatorio={false} tituloCampo={"Asociación"} campo={"idAsociacion"} url={"asociaciones"} valor={this.props.parametros != null? this.props.parametros.idAsociacion : null}/></li>
			<li><InputImage onResults={this._retornoCampo} valor={this.props.parametros != null? this.props.parametros.pathImage : null}/></li>
			</ul>)
		}else if(this.state.tabSelect == 1){
			camposMontar = (
			<ul>
			<li><Direccion onResults={this._retornoCampo} valor={this.props.parametros != null? this.props.parametros.direccion : null}/></li>
			</ul>)
		}else if(this.state.tabSelect == 2){
			camposMontar=(<CamposSeleccionables urlCampos="categoriasLocal"/>)

			//return camposMontar
		}
		return camposMontar
		/*return(
		<ul>
		<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Código Tienda"} campo={"codigo"} valor={this.props.parametros != null? this.props.parametros.codigo : null} maxLength={5}/></li>
		<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Nombre Tienda"} campo={"nombreTienda"} valor={this.props.parametros != null? this.props.parametros.nombreAsociacion : null} maxLength={100}/></li>
		<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Email"} campo={"email"} valor={this.props.parametros != null? this.props.parametros.email : null}/></li>
		<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Telefono"} campo={"telefono"} valor={this.props.parametros != null? this.props.parametros.telefono : null}/></li>
		<li><Select onResults={this._retornoCampo} obligatorio={false} tituloCampo={"Asociación"} campo={"idAsociacion"} url={"asociaciones"} valor={this.props.parametros != null? this.props.parametros.idAsociacion : null}/></li>
		<li><Direccion onResults={this._retornoCampo} valor={this.props.parametros != null? this.props.parametros.direccion : null}/></li>
		<li><InputImage onResults={this._retornoCampo} valor={this.props.parametros != null? this.props.parametros.pathImage : null}/></li>
		</ul>)*/
	}
	_changeActiveTab =(select)=>{
		console.log("CAMBIO TAB", select);
		this.setState({
			tabSelect:select
		})
		//this._camposTab()
	}
	_isActive = (select) =>{
		console.log("IS ACTIVE", select);
		let classRet=""
		if(this.state.tabSelect == select){
			classRet = "is-active"
		}
		return classRet
	}

	render(){
    return(
			<div className="box margenes-box-listado">
				<div className="tabs">
					<ul>
						<li className={this._isActive(0)} onClick={() => this._changeActiveTab(0)}><a>Parametros Tienda</a></li>
						<li className={this._isActive(1)} onClick={() => this._changeActiveTab(1)}><a>Dirección</a></li>
						<li className={this._isActive(2)} onClick={() => this._changeActiveTab(2)}><a>Categorías Asignadas</a></li>
					</ul>
				</div>
				{this._camposTab()}
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

/*
<div className="box margenes-box-listado">
<ul>
	<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Código Tienda"} campo={"codigo"} valor={this.props.parametros != null? this.props.parametros.codigo : null} maxLength={5}/></li>
	<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Nombre Tienda"} campo={"nombreTienda"} valor={this.props.parametros != null? this.props.parametros.nombreAsociacion : null} maxLength={100}/></li>
	<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Email"} campo={"email"} valor={this.props.parametros != null? this.props.parametros.email : null}/></li>
	<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Telefono"} campo={"telefono"} valor={this.props.parametros != null? this.props.parametros.telefono : null}/></li>
	<li><Select onResults={this._retornoCampo} obligatorio={false} tituloCampo={"Asociación"} campo={"idAsociacion"} url={"asociaciones"} valor={this.props.parametros != null? this.props.parametros.idAsociacion : null}/></li>
	<li><Direccion onResults={this._retornoCampo} valor={this.props.parametros != null? this.props.parametros.direccion : null}/></li>
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


*/
