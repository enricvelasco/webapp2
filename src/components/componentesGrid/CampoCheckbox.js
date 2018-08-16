import React, { Component } from 'react';

export class CampoCheckbox extends Component{
  constructor(props, context) {
    super(props, context);

    //console.log("PROPS DE ENTRADA CAMPO LINK", props);
    /*console.log("CAMPO CHECKBOX ID - 1", this.props);
    console.log("CAMPO CHECKBOX ID", this.props.value.id);
    console.log("CAMPO CHECKBOX VALORES", this.props.value);*/
  }

  render(){
    return(
      //<button className="button is-link" onClick={((e) => this._clickEnCampoLink(e))}>Edit</button>
      <div>
        {!this.props.value?
          <p>X</p>
          :
          <p>V</p>
        }
      </div>
    )}
}
