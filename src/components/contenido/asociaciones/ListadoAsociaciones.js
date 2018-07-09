import React, { Component } from 'react';
import firebase from 'firebase';
import {Grid} from '../Grid'
import { Link } from 'react-router-dom';
import db from '../../../firebase'
import {Loading} from '../../Loading'

export class ListadoAsociaciones extends Component{
	//state = {cargandoDatos:true}
	constructor(props, context) {
    super(props, context);
		this.state = {
      loading:true
    }
    /*this.createRows();*/
    this._columns = [
      { key: 'codigo', name: 'Código' },
			{ key: 'nombreAsociacion', name: 'Nombre' },
      { key: 'email', name: 'Email' },
      { key: 'telefono', name: 'Telefono' } ];

  }
	componentDidMount(){
		console.log("COMPONENT DID MOUNT");
		let rows = [];
		db.collection("asociaciones").get().then((querySnapshot) => {
		    querySnapshot.forEach(function(doc) {
		        // doc.data() is never undefined for query doc snapshots
						rows.push(doc.data())
		        console.log("-----",doc.id, " => ", doc.data());
		    });
				this._rows = rows;
				console.log("LISTADO", rows);
				this.setState({loading: false
                    })
		});
	}
	_cargarFormulario=(e, estado)=>{
    console.log("SELECCIONA NUEVO", estado);

		this.props.onResults(estado)
  }

	createRows = () => {
		/*let rows = [];
		db.collection("asociaciones").get().then((querySnapshot) => {
		    querySnapshot.forEach(function(doc) {
		        // doc.data() is never undefined for query doc snapshots
						rows.push(doc.data())
		        console.log("-----",doc.id, " => ", doc.data());
		    });
				this._rows = rows;
				this.state.cargando = false;
				this.campoGrid = <p>adeu</p>
				console.log("LISTADO", rows);
				console.log("STATE", this.state);
				this._cargaDatos()
		});*/
    /*let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
      });
    }

    this._rows = rows;*/

		//this.campoGrid = <p>caca</p>
  };

	/*_cargaDatos = () =>{
    //console.log("ENTRA A RENDER TITLE::", this.state)
		console.log("CARGAR DATOS::", this.state.cargando)
    switch(this.state.cargando) {
      case true:
			console.log("carga loading");
				this.state.cargando = false
				this._cargaDatos()
				return <p>loading...</p>
      break;
      case false:
			console.log("carga GRID");
				return <p>AAAA...</p>
        //return <Grid columnas={this._columns} rows={this._rows}/>
      break;
    }
  }*/

	_asignarEstadoPantalla = (estado)=>{
		return(
        <Grid columnas={this._columns} rows={this._rows}/>
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
