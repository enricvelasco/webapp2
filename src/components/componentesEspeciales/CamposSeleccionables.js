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
    this._cargarDatos();
  }

  _cargarDatos=()=>{
    console.log("CARGAR DATOS", this.props.urlCampos);
    let rows = [];
    db.collection(this.props.urlCampos).get().then((querySnapshot) => {
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
