import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class MenuLateral extends Component{
  _selectItemMenu=(e, url)=>{
    console.log("SELECCIONA MENU", url);
    this.props.onResults(url)
  }
  render(){
    return(
        <aside className="menu has-text-left margenes-menu-lat">
          <p className="menu-label">
            Informacion
          </p>
          <ul className="menu-list">
            <li><Link to='/' onClick={((e) => this._selectItemMenu(e, '/'))}>Estadísticas</Link></li>
          </ul>
          <p className="menu-label">
            General
          </p>
          <ul className="menu-list">
            <li><Link to='/usuariosParametros' onClick={((e) => this._selectItemMenu(e, 'usuariosParametros'))}>Usuario</Link></li>
            <li><Link to='/congifuracionUsuario'>Configuración</Link></li>
          </ul>
          <p className="menu-label">
            Administration
          </p>
          <ul className="menu-list">
            <li>
              <Link to='/asociaciones' onClick={((e) => this._selectItemMenu(e, 'asociaciones'))}>Asociaciones</Link>
            </li>
            <li>
              <a>Tiendas</a>
                <ul>
                <li><Link to='/tiendas' onClick={((e) => this._selectItemMenu(e, 'tiendas'))}>Locales</Link></li>
                <li><Link to='/tiendasTipos' onClick={((e) => this._selectItemMenu(e, 'tiendasTipos'))}>Tipos Local (TO DO)</Link></li>
              </ul>
            </li>
            <li>
              <a>Catalogo</a>
              <ul>
                <li><Link to='/productos' onClick={((e) => this._selectItemMenu(e, 'productos'))}>Productos</Link></li>
                <li><Link to='/productosTipo' onClick={((e) => this._selectItemMenu(e, 'productosTipo'))}>Tipos Producto</Link></li>
              </ul>
            </li>
          </ul>
          </aside>
    )
  }
}
