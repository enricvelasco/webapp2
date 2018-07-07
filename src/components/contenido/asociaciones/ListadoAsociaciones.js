import React, { Component } from 'react';
import firebase from 'firebase';
import {Grid} from '../Grid'
import { Link } from 'react-router-dom';
import db from '../../../firebase'

export class ListadoAsociaciones extends Component{
	constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = [
      { key: 'codigo', name: 'Código' },
			{ key: 'nombreAsociacion', name: 'Nombre' },
      { key: 'email', name: 'Email' },
      { key: 'telefono', name: 'Telefono' } ];
  }
	_cargarFormulario=(e, estado)=>{
    console.log("SELECCIONA NUEVO", estado);
		this.props.onResults(estado)
  }

	createRows = () => {
		let rows = [];
		db.collection("asociaciones").get().then((querySnapshot) => {
		    querySnapshot.forEach(function(doc) {
		        // doc.data() is never undefined for query doc snapshots
						rows.push(doc.data())
		        console.log("-----",doc.id, " => ", doc.data());
		    });
				this._rows = rows;
				console.log("LISTADO", rows);
		});
    /*let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
      });
    }

    this._rows = rows;*/
  };

	render(){
    return(
	        <div className="box margenes-box-listado">
					<div className="columns">
						<div className="column">
							TITULO ASOCIACIONES
						</div>
					</div>
					<div className="columns">
						<div className="column">
							<Link to='/asociaciones/new' className="button is-primary" onClick={((e) => this._cargarFormulario(e, 'nuevo'))}>Nuevo</Link>
						</div>
						<div className="column">
							<a className="button is-primary">Second</a>
						</div>
						<div className="column">
							<a className="button is-primary">Third</a>
						</div>
					</div>
						<div>
							<Grid columnas={this._columns} rows={this._rows}/>
						</div>
	        </div>
    )
  }
}
