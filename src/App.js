import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css'
import * as firebase from 'firebase'
import db from './firebase'
import {NavBarSuperior} from './components/nav/NavBarSuperior'
import {Login} from './components/login/Login'
import {MenuLateral} from './components/menuLateral/MenuLateral'
import {Listado} from './components/contenido/Listado'
import {ListadoEstadisticas} from './components/contenido/ListadoEstadisticas'
import {Tiendas} from './components/contenido/tiendas/Tiendas'
import {CategoriasLocal} from './components/contenido/categoriasLocal/CategoriasLocal'
//import {ListadoAsociaciones} from './components/contenido/asociaciones/ListadoAsociaciones
import {Asociaciones} from './components/contenido/asociaciones/Asociaciones'
import {CategoriasProducto} from './components/contenido/categoriasProducto/CategoriasProducto'
import {Productos} from './components/contenido/productos/Productos'


class App extends Component {
  state = {logged:true,//activar desactivar login auto
            cargaMenu:false}
  componentWillMount(){//se ejecuta la primera vez que entra
    console.log("EJECUTA COMPONENT WILL MOUNT PANTALLA PRINCIPAL");
    let user = firebase.auth().currentUser;
    console.log("EL USUARIO ACTUAL", user);
    //var cityRef = db.collection('asociaciones')
    if (user) {
      // User is signed in.
      //this.state.user = user;
      this.state.logged = true;
    }
  }
  _retornoLogin = (isLogin, user) =>{
    console.log("RETORNA DEL LOGIN", isLogin, user);
    /*var user = firebase.auth().currentUser;
    console.log("EL USUARIO ACTUAL", user);*/
    this.setState({logged:isLogin,
                    user:user})
  }

  _retornoSeleccionMenu=(url)=>{
    this.state.urlRecurso = url;
    if(url == "/"){
      this.state.cargaMenu = false;
    }else{
      this.state.cargaMenu = true;
    }
  }

  _cargarMenuCorrespondiente(){
    console.log("ENTRA A RENDER TITLE:-:", this.state)
    switch(this.state.urlRecurso) {
      case "usuariosParametros":
      break;
      case "asociaciones":
        return <Asociaciones user={this.state.user} urlRecurso={"asociaciones"} estado={"listado"}/>
      break;
      case "tiendas":
        return <Tiendas user={this.state.user} urlRecurso={"tiendas"} estado={"listado"}/>
      break;
      case "categoriasLocal":
        return <CategoriasLocal user={this.state.user} urlRecurso={"categoriasLocal"} estado={"listado"}/>
      break;
      case "productos":
        return <Productos user={this.state.user} urlRecurso={"producto"} estado={"listado"}/>
      break;
      case "categoriasProducto":
        return <CategoriasProducto user={this.state.user} urlRecurso={"categoriasProducto"} estado={"listado"}/>
      break;
    }
  }

  render() {
    return (
      <div className="App">
          <NavBarSuperior  onResults={this._retornoLogin} showLogOutButton={this.state.logged}/>
          <div className="container">
            {this.state.logged?
              <div className="columns">
                <div className="column is-2"><MenuLateral onResults={this._retornoSeleccionMenu}/></div>
                <div className="column">
                  {this.state.cargaMenu?
                    this._cargarMenuCorrespondiente()
                    :
                    <ListadoEstadisticas/>
                  }
                </div>
              </div>

                :
                <Login onResults={this._retornoLogin}/>
            }
          </div>
      </div>
    );
  }
}

export default App;
