import React, { Component } from 'react';
import firebase from 'firebase';
import {Grid} from '../Grid'
import { Link } from 'react-router-dom';
import db from '../../../firebase'
import {Loading} from '../../Loading'
import {CampoLink} from '../../componentesGrid/CampoLink'

//const CampoEdicion = <CampoLink registro={registro}>

export class ListadoAsociaciones extends Component{
	//state = {cargandoDatos:true}
	constructor(props, context) {
    super(props, context);
		this.state = {
      loading:true
    }
    /*this.createRows();*/


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

	componentDidMount(){
		console.log("COMPONENT DID MOUNT");
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

		this.props.onResults(estado, null)
  }

	createRows = () => {
  };
	_retornoSeleccionesGrid(e){
		console.log("SELECCIONES RETORNADAS", e);
	}
	_asignarEstadoPantalla = (estado)=>{
		return(
        <Grid columnas={this._columns} rows={this._rows} onResults={this._retornoSeleccionesGrid}/>
				//<GridTest/>
      )
	}

	/*render(){
    return(
      <div>
        {this.state.loading?
          <p>cargando...</p>
          :
          this._asignarEstadoPantalla(this.state.estadoPantalla)
        }
      </div>
    )
  }*/

	render(){
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
									<a className="button is-danger">Eliminar</a>
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
