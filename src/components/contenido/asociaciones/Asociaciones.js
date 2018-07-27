import React, { Component } from 'react';
import firebase from 'firebase';
import {Grid} from '../Grid'
import {ListadoAsociaciones} from './ListadoAsociaciones'
import {FormularioAsociaciones} from './FormularioAsociaciones'
import {Loading} from '../../Loading'

export class Asociaciones extends Component{
	constructor(props){
    super(props)
		this.state = {
      estado:props.estado
    }
		this._cargaInicial()
    //this.loading = true
    console.log("CONSTRUCTOR PROPS ASOCIACIONES", props);
		console.log("CONSTRUCTOR STATE ASOCIACIONES----", this.state);
    //console.log("CONSTRUCTOR", this.state);
  }

	_retornoEstado = (estado, params) =>{
    console.log("RETORNA ESTADO", estado, params);
    this.setState({estado:estado, parametros:params})
  }

	_cargaInicial(){
		this.state.estado = 'listado'
		this._cargarEstadoCorrespondiente()
	}

	_cargarEstadoCorrespondiente(){
    console.log("STATE CAMBIO ESTADO::", this.state)
		console.log("ENTRA A RENDER PROPS::", this.props)
    switch(this.state.estado) {
      case "listado":

				/*this.state.cargaDatos = false;
				let resp
				if(this.state.cargaDatos){
					resp = <ListadoAsociaciones onResults={this._retornoEstado}/>
				}else{
					resp = <p>loading</p>
				*/

				return <ListadoAsociaciones onResults={this._retornoEstado}/>
      break;
      case "nuevo":
        return <FormularioAsociaciones parametros={this.state.parametros != null? this.state.parametros : null} onResults={this._retornoEstado}/>
      break;
    }
  }


	render(){
    return(
        <div>
					{this._cargarEstadoCorrespondiente()}
        </div>

    )
  }
}
