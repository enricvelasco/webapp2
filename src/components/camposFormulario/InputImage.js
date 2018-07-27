import React, { Component } from 'react';
import firebase from 'firebase';

export class InputImage extends Component{

  constructor(props){
    super(props)

    this.state = {
      file:"",
      imagePreviewUrl: props.valor
    }
    console.log("CONSTRUCTOR", this.state);
  }

  /*_readFile=(event)=>{
    var file = event.target.files[0]
    this.setState({
      fileName: event.target.files[0].name
    })
    this.props.onResults("archivoImagen",file)
  }*/
  _readFile(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        //imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
    console.log("READER", reader);
    console.log("SATE", this.state);
    console.log("FILE", file);

    const storageRef = firebase.storage().ref('pictures/'+URL.createObjectURL(file))
    const task = storageRef.put(file)

    task.on('state_changed', (snapshot) => {
      // Se lanza durante el progreso de subida
      console.log("SUBIENDO");
    }, (error) => {
      // Si ha ocurrido un error aquí lo tratamos
      console.log("ERROR", error);
    }, (snapshot) => {
      console.log("SE HA SUBIDO EL ARCHIVO", snapshot);
      // Una vez se haya subido el archivo,
      // se invoca ésta función
      task.snapshot.ref.getDownloadURL().then((downloadURL) =>{
        console.log('File available at', downloadURL);

        this.setState({
          //file: file,
          imagePreviewUrl: downloadURL
        });

        this.props.onResults("pathImage", downloadURL)
      });
    })



  }

  render(){
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<figure class="image is-128x128">
        <img src={imagePreviewUrl}/>
      </figure>);
    } else {
      $imagePreview = (<figure class="image is-128x128">
        <img src="https://bulma.io/images/placeholders/128x128.png"/>
      </figure>);
    }
    //this.state.fileName = "hola"
    // /className="campo-input-generico-padding"
    return(
      <div className="file has-name is-boxed campo-input-generico-padding">
        <label className="file-label">
          <input className="file-input" ref="file" type="file" name="resume" onChange={(event)=> {
                   this._readFile(event)
              }}/>
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">
              Choose a file…
            </span>
          </span>
          <span className="file-name">
            {this.state.file.name}
          </span>
        </label>
        {$imagePreview}
      </div>
    )
  }
}
