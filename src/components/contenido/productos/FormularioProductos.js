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
import {Loading} from '../../Loading'
import {Checkbox} from '../../camposFormulario/Checkbox'

export class FormularioProductos extends Component{
	constructor(props) {
    super(props);
    this.state = {objGuardar:{}, tabSelect:0, camposFormulario:null};
		//this._camposTab(this.state.tabSelect)
		//this._changeActiveTab(0)
		this._cargarCamposInicial()
  }

	_cargarCamposInicial=()=>{
		this.state.camposFormulario=(<ul>
												<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Código"} campo={"codigo"} valor={this.props.parametros != null? this.props.parametros.codigo : null} maxLength={10}/></li>
												<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Nombre Producto"} campo={"nombre"} valor={this.props.parametros != null? this.props.parametros.nombre : null} maxLength={100}/></li>
												<li><Select onResults={this._retornoCampo} obligatorio={false} tituloCampo={"Tienda"} campo={"idTienda"} url={"tiendas"} camposMostrar={["codigo", "nombre"]} valor={this.props.parametros != null? this.props.parametros.idTienda : null}/></li>
												<li><Checkbox onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Es una promoción"} campo={"isPromocion"} valor={this.props.parametros != null? this.props.parametros.isPromocion : null}/></li>
												<li><InputImage onResults={this._retornoCampo} valor={this.props.parametros != null? this.props.parametros.pathImage : null}/></li>
												</ul>)
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
			db.collection("productos").add(this.state.objGuardar)
			.then((docRef) => {//.then((user) => {
			    console.log("ASOCIACION AÑADIDA OK: ", docRef.id);
					this.props.onResults("listado")
			})
			.catch(function(error) {
			    console.error("ERROR AL AÑADIR", error);
			});
		}else{//hace un update
			console.log("CREA EDICION!!!!!!!!!");
			db.collection("productos").doc(this.props.parametros.id).set(this.state.objGuardar, { merge: true })
			.then(()=> {
					this.props.onResults("listado")
			    console.log("Document successfully written!");
			})
			.catch(function(error) {
			    console.error("Error writing document: ", error);
			});
		}
	}

	_montarCamposSeleccionables() {
		console.log("ENTRA A FUNCION PROMESA");
			return new Promise((resolve, reject) => {
	    setTimeout(function() {
	      var didSucceed = Math.random() >= 0.5;
	      didSucceed ? resolve(new Date()) : reject('Error');
	    }, 2000);
	  })
	}

	//_agruparCate

	_camposTab = (select) =>{
		//var camposMontar;
		console.log("ENTRA EN CAMPO TAB FUNC", this.state);
		if(select == 0){
			console.log("CAMPOS TAB 0");
			this.setState({
				camposFormulario:(<ul>
													<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Código"} campo={"codigo"} valor={this.props.parametros != null? this.props.parametros.codigo : null} maxLength={10}/></li>
													<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Nombre Producto"} campo={"nombre"} valor={this.props.parametros != null? this.props.parametros.nombre : null} maxLength={100}/></li>
													<li><Select onResults={this._retornoCampo} obligatorio={false} tituloCampo={"Tienda"} campo={"idTienda"} url={"tiendas"} camposMostrar={["codigo", "nombre"]} valor={this.props.parametros != null? this.props.parametros.idTienda : null}/></li>
													<li><Checkbox onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Es una promoción"} campo={"isPromocion"} valor={this.props.parametros != null? this.props.parametros.isPromocion : null}/></li>
													<li><InputImage onResults={this._retornoCampo} valor={this.props.parametros != null? this.props.parametros.pathImage : null}/></li>
													</ul>)
			})
			console.log("TERMINA TAB 0", this.state);
		}else if(select == 1){
			console.log("CAMPOS TAB 2");
			this.setState({camposFormulario:(<ul><li><CamposSeleccionables onResults={this._retornoCampo} urlCampos="categoriasProducto" campoRelacion="idCategoriaProductoPadre" valor={this.props.parametros != null? this.props.parametros.categoriasProducto : null}/></li></ul>)})
		}
	}
	_changeActiveTab =(select)=>{
		console.log("CAMBIO TAB", select);
		this.setState({
			tabSelect:select
		})
		this._camposTab(select)
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
						<li className={this._isActive(0)} onClick={() => this._changeActiveTab(0)}><a>Parametros Producto</a></li>
						<li className={this._isActive(2)} onClick={() => this._changeActiveTab(1)}><a>Categorías Asignadas</a></li>
					</ul>
				</div>
				<div>
					{this.state.camposFormulario==null?
						<Loading/>
						:
						this.state.camposFormulario
					}
				</div>
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
