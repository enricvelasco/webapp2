import React, { Component } from 'react';
import firebase from 'firebase';

export class InputText extends Component{
  constructor(props){
    super(props)

    /*if(this.props.valor == null){
      this.state.modoFormulario = 'nuevo'
    }else{
      this.state.modoFormulario = 'edicion'
    }*/

    this.campo = this.props.valor

    if(props.obligatorio && this.campo==null){
      this.state = {
        hayError:true,
        errorMessage:"campo obligatorio"
      }
    }else{
      this.state = {
        hayError:false,
        errorMessage:null
      }
    }

    //this.loading = true
    console.log("PROPS CAMPO TEXTO", props);
		//console.log("CONSTRUCTOR STATE ASOCIACIONES----", this.state);
    //console.log("CONSTRUCTOR", this.state);
  }

  componentDidMount() {
    //console.log("COMPONENT DID MOUNT PROPS", this.props);
    console.log("COMPONENT DID MOUNT STATE", this.state);
    //this.campo = this.props.valor
    if(this.props.obligatorio != undefined && this.state.hayError/*&& (this.campo == "" || this.campo == null)*/){
      this.state.errorObligatorio = true
      this.state.errorMessage = "campo obligatorio"
      /*this.setState({
        errorObligatorio:true,
        errorMessage:"campo obligatorio"
      })*/
    }

    if(this.props.minLength != undefined){
      this.setState({
        errorMinLength:true
      })
    }
    if(this.props.maxLength != undefined){
      this.setState({
        errorMaxLength:true
      })
    }
  }

  _cambioEnTexto=(e)=>{
    console.log("DETECTA EL ONCHANGE", e.target.value);

    this.campo = e.target.value

    if(this.props.obligatorio != undefined){
      if(this.props.obligatorio && (e.target.value == "" || e.target.value == null)){
        this.state.errorObligatorio = true;
        this.state.errorMessageObl = "campo obligatorio"
      }else{
        this.state.errorObligatorio = false;
        this.state.errorMessageObl = null
      }
    }


    if(this.props.minLength != undefined){
      if(this.props.minLength > e.target.value.length){
        this.state.errorMinLength = true;
        this.state.errorMessageMin = "no supera longitud mínima";
      }else{
        console.log("LONGITUD CORRECTA");
        this.state.errorMinLength = false;
        this.state.errorMessageMin = null
      }
    }

    if(this.props.maxLength != undefined){
      if(this.props.maxLength < e.target.value.length){
        this.state.errorMaxLength = true;
        this.state.errorMessageMax = "supera longitud máxima";
      }else{
        this.state.errorMaxLength = false;
        this.state.errorMessageMax = null;
      }
    }

    console.log("MENSAJE", this.state.errorObligatorio, "LENG",this.state.errorMinLength);

    if(!this.state.errorObligatorio && !this.state.errorMinLength && !this.state.errorMaxLength){
      console.log("NO HAY ERROR!!!");
      this.setState({
        hayError : false,
        errorMessage : null
      })
      /*this.state.hayError = false
      this.state.errorMessage = null*/
    }else{
      console.log("HAY ERROR!!!");
      //montar mensaje
      let errorMontado = ""
      if(this.state.errorMessageObl != null){
        errorMontado=this.state.errorMessageObl
      }else if(this.state.errorMessageMin !=null){
        errorMontado=this.state.errorMessageMin
      }else if(this.state.errorMessageMax !=null){
        errorMontado=this.state.errorMessageMax
      }
      this.setState({
        hayError : true,
        errorMessage : errorMontado
      })
      /*this.state.hayError = true
      this.state.errorMessage = errorMontado*/
    }

    this.props.onResults(this.props.campo, e.target.value)
  }

	render(){
    return(
      <div className="campo-input-generico-padding">
          <ul>
            <li><p>{this.props.tituloCampo}</p></li>
            <li>{this.state.hayError?
                <input className="input is-danger" type="text" onChange={this._cambioEnTexto}/>
                :
                <input className="input" type="text" onChange={this._cambioEnTexto} value={this.campo}/>
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
