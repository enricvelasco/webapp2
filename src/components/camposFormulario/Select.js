import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../firebase'

export class Select extends Component{
  constructor(props){
    super(props)
    this.campo = this.props.valor

    if(props.obligatorio && this.campo==null){
      this.state = {
        hayError:true,
        errorMessage:"campo obligatorio"
      }
    }else{
      this.state = {
        hayError:false,
        errorMessage:null,
        camposCombo:[]
      }
    }
    this._cargarResultadosCombo()
    this._retornoInicial()
  }

  _cargarResultadosCombo=()=>{
    console.log("CARGA RESULTADOS COMBO");
    var collection = db.collection(this.props.url);
    if(this.props.filtro == undefined){
      this._consulta(collection)
    }else{
      var filter = this.props.filtro;
      var query = collection.where(filter[0], filter[1],filter[2]);
      this._consulta(query)
    }




    //db.collection(this.props.url).get().then((querySnapshot) => {
    /*query.get().then((querySnapshot) => {
      var arrRet = []
      var cont = 0;
        querySnapshot.forEach((doc) =>{
          console.log("LOOP CONSULTA", doc.id);
          console.log("LOOP CONSULTA DATA", doc.data());
          console.log("CAMPO 1", this.props.camposMostrar[1]);
          let resp = doc.data()
          let obj = {}
          //let str="element_"+i
          obj.id = doc.id
          obj.name=  resp[this.props.camposMostrar[0]] +"-"+ resp[this.props.camposMostrar[1]]
          arrRet.push(<option value={doc.id}>{obj.name}</option>)
          cont ++;
        });
        this.setState({
          camposCombo:arrRet
        })
        console.log("RETORNA ARR",this.state);
        //return arrRet
    });*/
  }

  _consulta=(coll)=>{
    coll.get().then((querySnapshot) => {
      var arrRet = []
      var cont = 0;
        querySnapshot.forEach((doc) =>{
          console.log("LOOP CONSULTA", doc.id);
          console.log("LOOP CONSULTA DATA", doc.data());
          console.log("CAMPO 1", this.props.camposMostrar[1]);
          let resp = doc.data()
          let obj = {}
          //let str="element_"+i
          obj.id = doc.id
          obj.name=  resp[this.props.camposMostrar[0]] +"-"+ resp[this.props.camposMostrar[1]]
          arrRet.push(<option value={doc.id}>{obj.name}</option>)
          cont ++;
        });
        this.setState({
          camposCombo:arrRet
        })
        console.log("RETORNA ARR",this.state);
        //return arrRet
    });
  }

  _retornoInicial=(e)=>{
    this.props.onResults(this.props.campo, null)
  }
  _cambioEnSelect=(e)=>{
    console.log("CAMBIO EN SELECT",e.target.value);
    this.props.onResults(this.props.campo, e.target.value)
  }

  render(){
    return(
      <div className="campo-input-generico-padding">
          <ul>
            <li><p>{this.props.tituloCampo}</p></li>
            <li>{this.state.hayError?
                <div className="select is-danger">
                  <select>
                  </select>
                </div>
                :
                <div className="select">
                  <select onChange={this._cambioEnSelect}>
                    <option value="0">-Seleccione Opción-</option>
                    {this.state.camposCombo}
                  </select>
                </div>
              }
            </li>
            <li>
                <p className="error-message-input">{this.state.errorMessage}</p>
            </li>
          </ul>
      </div>
    )
  }
}
