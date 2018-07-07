import React, { Component } from 'react';
import firebase from 'firebase';

export class InputText extends Component{
  constructor(props){
    super(props)
    if(props.obligatorio){
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
    console.log("COMPONENT DID MOUNT PROPS", this.props);
    console.log("COMPONENT DID MOUNT STATE", this.state);
    if(this.props.obligatorio != undefined){
      this.setState({
        errorObligatorio:true
      })
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

    if(this.props.obligatorio != undefined){
      if(this.props.obligatorio && e.target.value == ""){
        this.state.errorObligatorio = true;
        this.state.errorMessageObl = "campo obligatorio"
        /*this.setState({
          //errorObligatorio:true,
          errorMessage:"campo obligatorio"
        })*/
      }else{
        this.state.errorObligatorio = false;
        this.state.errorMessageObl = null
        /*this.setState({
          //errorObligatorio:false,
          errorMessage:null
        })*/
      }
    }


    if(this.props.minLength != undefined){
      if(this.props.minLength > e.target.value.length){
        this.state.errorMinLength = true;
        this.state.errorMessageMin = "no supera longitud mínima";
        /*this.setState({
          //errorMinLength:true,
          errorMessage:"no supera longitud mínima"
        })*/
      }else{
        console.log("LONGITUD CORRECTA");
        this.state.errorMinLength = false;
        this.state.errorMessageMin = null
        /*this.setState({
          //errorMinLength:false,
          errorMessageMin:null
        })*/
      }
    }

    if(this.props.maxLength != undefined){
      if(this.props.maxLength < e.target.value.length){
        this.state.errorMaxLength = true;
        this.state.errorMessageMax = "supera longitud máxima";
        /*this.setState({
          //errorMinLength:true,
          errorMessageMax:"supera longitud máxima"
        })*/
      }else{
        this.state.errorMaxLength = false;
        this.state.errorMessageMax = null;
        /*this.setState({
          //errorMinLength:false,
          errorMessage:null
        })*/
      }
    }
/*
    if(this.props.maxLength != undefined){
      if(this.props.maxLength < e.target.value.length){
        this.setState({
          errorMessage:this.state.errorMessage + " / " + "supera longitud máxima"
        })
      }
    }*/
    /*this.setState({
      [e.target.name]:e.target.value
    })*/

    console.log("MENSAJE", this.state.errorObligatorio, "LENG",this.state.errorMinLength);

    if(!this.state.errorObligatorio && !this.state.errorMinLength && !this.state.errorMaxLength){
      console.log("NO HAY ERROR!!!");
      this.setState({
        hayError:false,
        errorMessage:null
      })
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
        hayError:true,
        errorMessage:errorMontado
      })
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
                <input className="input" type="text" onChange={this._cambioEnTexto}/>
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
