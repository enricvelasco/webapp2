import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../firebase'
import {Loading} from '../Loading'
import {GridSeleccion} from './GridSeleccion'

export class CamposSeleccionables extends Component{
	constructor(props) {
    super(props);
    this.state={
      loading:true,
			htmlGrid:<div className="column">hola</div>
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


            registro = doc.data()
						registro.id = doc.id
						registro.categoriasHijas=[]
						console.log("LOOP REGISTRO", doc.data());
						//console.log("CAMPO CONDICION", this.Z);
            //console.log("-----",doc.id, " => ", doc.data());*/
						if(doc.data()[this.props.campoRelacion] == null){
						//if(registro.idCaregoriaLocalPadre == null){
							console.log("ES PADRE", registro.nombre);
							querySnapshot.forEach((doc)=> {
								console.log("LOOP HIJO", doc.data());
								var registroHijo = {}

		            registroHijo = doc.data()
								registroHijo.id = doc.id
								if(registroHijo[this.props.campoRelacion]==registro.id){
									console.log("IS LOOP HIJO", registroHijo);
									registro.categoriasHijas.push(registroHijo)
								}
							})
							console.log("AÑADE CAMPO PADRE", registro);

							camposPadre.push(registro)
						}
						//this._agruparPorPadre()
        });
				console.log("TERMINA CALCULOS", camposPadre);
				console.log("TERMINA CALCULOS", camposPadre[0].categoriasHijas);

				this._rows = camposPadre
				this.cargarColumnas()
				//this.setState({loading:false})
				this._montarGrids()
    });
  }
  cargarColumnas(){
    this._columns = [
      { key: 'codigo', name: 'Código'},
      { key: 'nombre', name: 'Nombre' }
     ];
  }

	_montarGrids=()=>{
		var cont = 0
		//var startComp = {campo:<div className="columns is-multiline is-desktop">}
		//var endComp = {campo:</div>}
		var content = {}
		this._arrGrids=[]
		this._rows.forEach((val)=>{
			console.log("VALOR LOOP",val);
			this.setState(
				{htmlGrid:
					<div className="column"><p>{val.codigo}-{val.nombre}</p><GridSeleccion columnas={this._columns} rows={val.categoriasHijas} onResults={this._retornoSeleccionesGrid}/></div>
				})
			this._arrGrids.push(this.state.htmlGrid)
			//content = '<div className="column"><GridSeleccion columnas={this._columns} rows={val.categoriasHijas} onResults={this._retornoSeleccionesGrid}/></div>'
		})

		/*return(<div className="columns is-desktop"><div className="column"><GridSeleccion columnas={this._columns} rows={this._rows[0].categoriasHijas} onResults={this._retornoSeleccionesGrid}/></div>
			<div className="column"><GridSeleccion columnas={this._columns} rows={this._rows[1].categoriasHijas} onResults={this._retornoSeleccionesGrid}/></div>
			</div>)*/
			this.setState({camposGrid:<div className="columns is-desktop">
				{this._arrGrids}
				</div>})

				this.setState({loading:false})
			//return(startComp content endComp)
	}

  render(){
    return(
      <div>
        {this.state.loading?
          <Loading/>
          :
          //<GridSeleccion columnas={this._columns} rows={this._rows} onResults={this._retornoSeleccionesGrid}/>
					this.state.camposGrid
        }
      </div>
    )
  }
}
