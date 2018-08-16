import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../firebase'

export class CampoSelect extends Component{
  constructor(props, context) {
    super(props, context);
    // /console.log("CAMPO REGISTRO", this.props.value.id);

    console.log("CAMPO REGISTRO ALL", this.props.value);
    console.log("CAMPO REGISTRO ALL", this.props.url);
    //console.log("CAMPO SELECT REGISTRO", this.props.value.data());
    this.state = {campoMostrar:"Loading..."}

    this._cargarCampo()
  }

  _cargarCampo = () =>{
    if(this.props.value != null){
      var docRef = db.collection(this.props.url).doc(this.props.value);

      docRef.get().then((doc) =>{
          if (doc.exists) {
              console.log("Document data:", doc.data());
              let resp = doc.data()
              this.setState({
                campoMostrar: resp.codigo+"-"+resp.nombre
              })

          } else {
              // doc.data() will be undefined in this case
              this.setState({
                campoMostrar: ""
              })
              console.log("No such document!");
          }
      }).catch((error) =>{
          console.log("Error getting document:", error);
      });
    }else{
      this.setState({
        campoMostrar: ""
      })
    }

    /*db.collection(this.props.url).get().then((querySnapshot) => {
      var arrRet = []
      var cont = 0;
        querySnapshot.forEach(function(doc) {
          console.log("LOOP CONSULTA", doc.id);
          console.log("LOOP CONSULTA DATA", doc.data());
          let resp = doc.data()
        });
        this.setState({
          camposCombo:arrRet
        })
    });*/
  }

  render(){
    return(
      //<button className="button is-link" onClick={((e) => this._clickEnCampoLink(e))}>Edit</button>
      <p>
        {this.state.campoMostrar}
      </p>
    )}
}
