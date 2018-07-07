import React, { Component } from 'react';
import firebase from 'firebase';

export class ListadoTiendas extends Component{
  constructor(props){
    super(props)
    /*this.state = {
      isLogin:false
    }*/
    //this.loading = true
    console.log("CONSTRUCTOR PROPS TIENDAS", props);
    //console.log("CONSTRUCTOR", this.state);
  }

  componentWillReceiveProps = (nextProps) =>{
    console.log("entra en mant ciudades 2", nextProps);
    this._cargarDatos()
  }

  _cargarDatos(){
    var userId = firebase.auth().currentUser.uid;
    var starCountRef = firebase.database().ref('tiendas');
    starCountRef.on('value', function(snapshot) {
      console.log("RESPUESTA", snapshot.val());
      //updateStarCount(postElement, snapshot.val());
    });
  }

  render(){
    return(
        <div className="box margenes-box-listado">
          LISTADO TIENDAS
        </div>
    )
  }
}
