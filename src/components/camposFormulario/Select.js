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
  }

  _cargarResultadosCombo=()=>{
    console.log("CARGA RESULTADOS COMBO");
    //return <option>Hola</option>
    /*var arrRet = []
    for(var i=0; i<5; i++){
      let obj = {}
      let str="element_"+i
      obj.id = i
      obj.name= str
      arrRet.push(<option value={obj.id}>{obj.name}</option>)
    }
    return arrRet*/

    db.collection(this.props.url).get().then((querySnapshot) => {
      var arrRet = []
      var cont = 0;
        querySnapshot.forEach(function(doc) {
          console.log("LOOP CONSULTA", doc.id);
          console.log("LOOP CONSULTA DATA", doc.data());
          let resp = doc.data()
          let obj = {}
          //let str="element_"+i
          obj.id = doc.id
          obj.name=  resp.codigo +"-"+ resp.nombreAsociacion
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

  _cambioEnSelect=(e)=>{
    console.log("CAMBIO EN SELECT",e.target.value);
    this.props.onResults("idAsociacion", e.target.value)
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
