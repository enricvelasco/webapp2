import React, { Component } from 'react';
import firebase from 'firebase';
import {Grid} from '../Grid'
import {ListadoTiendas} from './ListadoTiendas'
import {FormularioTiendas} from './FormularioTiendas'
import {Loading} from '../../Loading'

export class Tiendas extends Component{
	constructor(props){
    super(props)
		this.state = {
      estado:props.estado
    }
		this._cargaInicial()
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
				return <ListadoTiendas onResults={this._retornoEstado}/>
      break;
      case "nuevo":
        return <FormularioTiendas parametros={this.state.parametros != null? this.state.parametros : null} onResults={this._retornoEstado}/>
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
