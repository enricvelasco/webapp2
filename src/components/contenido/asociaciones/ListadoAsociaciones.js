 import React, { Component } from 'react';
import firebase from 'firebase';
import {Grid} from '../Grid'
import { Link } from 'react-router-dom';
import db from '../../../firebase'
//import firebase from 'firebase';
import {Loading} from '../../Loading'
import {CampoLink} from '../../componentesGrid/CampoLink'

//const CampoEdicion = <CampoLink registro={registro}>
var esUpdate = false
export class ListadoAsociaciones extends Component{
	//state = {cargandoDatos:true}
	constructor(props, context) {
    super(props, context);
		this.state = {
      loading:true
    }
    /*this.createRows();*/
		this._cargarDatos()
		console.log("CONSTRUCTOS ASOCIACIONES");
  }

	cargarColumnas(){
		this._columns = [
      //{ key: 'nombreAsociacion', name: 'Nombre', formatter: <CampoLink/> },
			//{key:'valorEdicion', name:'Edicion', formatter: <CampoLink registro={registro}>},
			//{key: 'id', name:'#'},
			{ key: 'codigoLink', name: 'Codigo', formatter: <CampoLink registro={this.value} onResults={this._respuestaCampoLink}/>},
			{ key: 'nombreAsociacion', name: 'Nombre' },
      { key: 'email', name: 'Email' },
      { key: 'telefono', name: 'Telefono' } ];


	}

	_respuestaCampoLink=(e)=>{
		console.log("REPUESTA CAMPO LINK", e);
		//this._cargarFormulario(null, 'nuevo', e);
		this.props.onResults('nuevo', e)
	}
	clickEnCasilla(){
		console.log("CLICK EN CASILLA");
	}

	componentWillUpdate(props, state){
		console.log("COMPONENT WILL UPDATE");

	}

	componentDidUpdate(props, state){
		console.log("COMPONENT DID UPDATE 1");
		//this._cargarDatos()
	}

	componentWillReciveProps(props){
		console.log("COMPONENT WILL RECIVE PROPS 2");
	}

	componentWillMount=()=>{
		console.log("COMPONENT DID MOUNT 3");
	}

	_cargarDatos(){
		console.log("CARGAR DATOS");
		/*this.setState({
			loading:true
		})*/
		//this.state.loading = true
		let rows = [];
		db.collection("asociaciones").get().then((querySnapshot) => {
		    querySnapshot.forEach(function(doc) {
		        // doc.data() is never undefined for query doc snapshots
						let registro = {}

						registro.id = doc.id
						registro = doc.data()
						//registro.valorEdicion = doc.data().codigo
						registro.codigoLink = doc
						rows.push(registro)
		        console.log("-----",doc.id, " => ", doc.data());
		    });
				this._rows = rows;
				console.log("LISTADO", rows);
				this.cargarColumnas()
				this.setState({loading: false
                    })
		});
	}


	_cargarFormulario=(e, estado, registro)=>{
    console.log("SELECCIONA NUEVO", estado);
		this.setState({loading: true
								})
		//this.state.loading = true;
		this.props.onResults(estado, null)
  }

	_retornoSeleccionesGrid=(e)=>{
		console.log("SELECCIONES RETORNADAS", e);
		this.state.camposGridSeleccionados = e
	}
	_asignarEstadoPantalla = (estado)=>{
		return(
        <Grid columnas={this._columns} rows={this._rows} onResults={this._retornoSeleccionesGrid}/>
				//<GridTest/>
      )
	}

	_eliminarCampos =(e)=>{
		console.log("ELIMINAR CAMPOS", this.state.camposGridSeleccionados);
		this.setState({
			loading:true
		})
		/*let arrDelOK = []
		let arrDelErr = []*/
			db.collection("asociaciones").doc(this.state.camposGridSeleccionados[0].codigoLink.id).delete()
			.then(() => {
					console.log("ELIMINADO OK");
					/*this.state = {
			      loading:true
			    }*/
					this._cargarDatos()
			})
			.catch(function(error) {
			    console.error("ERROR AL AÑADIR", error, "en campo");
					this.props.onResults("listado")
					//arrDelErr.push(campo)
			});
			/*var addMessage = firebase.functions().httpsCallable('callFunction');
			addMessage({text: 'hola'}).then((result) =>{
			  // Read result of the Cloud Function.
			  //var sanitizedMessage = result.data.text;
				this._cargarDatos()
				console.log("RESULTADO", result);
			}).catch(function(error) {
			  // Getting the Error details.
			  var code = error.code;
			  var message = error.message;
			  var details = error.details;
				console.log("ERROR");
			  // ...
			});*/
	}

	render(){
		console.log("RENDER");
		//this._cargarDatos()
    return(
	        <div className="box margenes-box-listado">
						<div className="columns">
							<div className="column">
								TITULO ASOCIACIONES
							</div>
						</div>
						<div className="columns">
								<div>
									<Link to='/asociaciones/new' className="button is-primary" onClick={((e) => this._cargarFormulario(e, 'nuevo', null))}>Nuevo</Link>
								</div>
								<div>
									<a className="button is-danger" onClick={((e) => this._eliminarCampos(e))}>Eliminar</a>
								</div>
						</div>
						<div>
							{this.state.loading?
								<Loading/>
								:
								this._asignarEstadoPantalla()
							}
						</div>
	        </div>
    )
  }
}
