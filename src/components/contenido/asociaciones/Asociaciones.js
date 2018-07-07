import React, { Component } from 'react';
import firebase from 'firebase';
import {Grid} from '../Grid'
import {ListadoAsociaciones} from './ListadoAsociaciones'
import {FormularioAsociaciones} from './FormularioAsociaciones'

export class Asociaciones extends Component{
	constructor(props){
    super(props)
		this.state = {
      estado:props.estado
    }
    //this.loading = true
    console.log("CONSTRUCTOR PROPS ASOCIACIONES", props);
		console.log("CONSTRUCTOR STATE ASOCIACIONES----", this.state);
    //console.log("CONSTRUCTOR", this.state);
  }

	_retornoEstado = (estado) =>{
    console.log("RETORNA ESTADO", estado);
    this.setState({estado:estado})
  }

	_cargarEstadoCorrespondiente(){
    //console.log("ENTRA A RENDER TITLE::", this.state)
		console.log("ENTRA A RENDER PROPS::", this.props)
    switch(this.state.estado) {
      case "listado":
				return <ListadoAsociaciones onResults={this._retornoEstado}/>
      break;
      case "nuevo":
        return <FormularioAsociaciones onResults={this._retornoEstado}/>
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
