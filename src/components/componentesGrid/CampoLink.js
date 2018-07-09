import React, { Component } from 'react';

export class CampoLink extends Component{
  constructor(props, context) {
    super(props, context);
  }
  render(){
    return(
      <a href="https://www.w3schools.com/html/">
        {this.props.campo}
      </a>
    )}
}
