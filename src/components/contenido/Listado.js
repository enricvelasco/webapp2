import React, { Component } from 'react';
import firebase from 'firebase';
import {Grid} from './Grid'

export class Listado extends Component{
  render(){
    return(
        <div className="box margenes-box-listado">
          <h1>Titulo</h1>
          <h2>Subtitulo</h2>
          <div>
            <Grid/>
          </div>
        </div>
    )
  }
}
