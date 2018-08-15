import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../firebase'
import {Loading} from '../Loading'
import {GridSeleccion} from './GridSeleccion'

export class CamposSeleccionables extends Component{
	constructor(props) {
    super(props);
    this.state={
      loading:true
    }
		console.log("CONSTRUCTR CAMPOS SELECCIONABLES");
    this._cargarDatos();
  }

	_agruparPorPadre=()=>{

	}

  _cargarDatos=()=>{
    console.log("CARGAR DATOS", this.props.urlCampos);
    let rows = [];
    db.collection(this.props.urlCampos).get().then((querySnapshot) => {
			var camposPadre=[]
				querySnapshot.forEach((doc) =>{

            // doc.data() is never undefined for query doc snapshots
            var registro = {}

            registro.id = doc.id
            registro = doc.data()
						//registro.children=[]
						console.log("LOOP REGISTRO", doc.data());
						//console.log("CAMPO CONDICION", this.Z);
            //console.log("-----",doc.id, " => ", doc.data());*/
						if(doc.data()[this.props.campoRelacion] == null){
							console.log("ES PADRE", registro.nombre);
							querySnapshot.forEach((doc)=> {
								let registroHijo = {}
		            registroHijo.id = doc.id
		            registroHijo = doc.data()
								if(registroHijo[this.props.campoRelacion]==registro.id){
									registro.children.push(registroHijo)
								}
							})
							camposPadre.push(registro)
						}
						//this._agruparPorPadre()
        });
				console.log("TERMINA CALCULOS", camposPadre);
				this.setState({loading:false})
				this._rows = camposPadre
				this.cargarColumnas()
    });
  }
  cargarColumnas(){
    this._columns = [
      { key: 'codigo', name: 'Código'},
      { key: 'nombre', name: 'Nombre' }
     ];
  }

  render(){
    return(
      <div>
        {this.state.loading?
          <Loading/>
          :
          //<GridSeleccion columnas={this._columns} rows={this._rows} onResults={this._retornoSeleccionesGrid}/>
          <GridSeleccion columnas={this._columns} rows={this._rows}/>
        }
      </div>
    )
  }
}
