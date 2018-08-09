import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor'

export class PhotoEditor extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.state.image = null
    //this._cargaImagen()
    console.log("CONSTRUCTOR", props);
  }

  _dataURItoBlob=(dataURI) =>{
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

  _onClickSave = () => {
    console.log("ENTRA AL ASIGNAR", this.editor);
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.editor.getImage()

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = this.editor.getImageScaledToCanvas()

      var img = this.editor.getImageScaledToCanvas().toDataURL();
      var rect = this.editor.getCroppingRect();

      let reader = new FileReader();

      this.setState({
        image:img
      })

      /*canvas.toBlob(function(blob) {
        var newImg = this.editor.createElement("img"),
            url = URL.createObjectURL(blob);

        newImg.onload = function() {
          // no longer need to read the blob so it's revoked
          URL.revokeObjectURL(url);
        };

        newImg.src = url;
        this.editor.body.appendChild(newImg);
      });*/

      /*console.log("URL IMAGEN", canvas.toBlob(function(blob) {
        var newImg = this.editor.createElement("img"),
            url = URL.createObjectURL(blob);

        newImg.onload = function() {
          // no longer need to read the blob so it's revoked
          URL.revokeObjectURL(url);
        };

        newImg.src = url;
        this.editor.body.appendChild(newImg);
      }),"image/jpeg", 0.95);*/

      /*var dataURL = this.editor.getImageScaledToCanvas().toDataURL('image/jpeg', 0.5);
      var blob = this._dataURItoBlob(dataURL);
      var fd = new FormData(document.forms[0]);
      fd.append("canvasImage", blob);*/

    /*  var reader = new FileReader();
      reader.onloadend = function() {
        var tempImg = new Image();
        tempImg.src = reader.result;
        tempImg.onload = function() {

        }

      }*/
      canvasScaled.toBlob((blob) =>{
        console.log('Este es el blob: ', blob);
        var image = new Image();
        image.src = blob;
        this.props.onResults(blob)
      }, 'image/jpeg', 0.8)

      //this.props.onResults(canvas)
    }
  }
  setEditorRef = (editor) => this.editor = editor
  render() {
    return (
      <div>
      <button className="button is-primary" onClick={
                ((e) => this._onClickSave())
              }>Push</button>
        <AvatarEditor
          ref={this.setEditorRef}
          image={this.props.urlImage}
          width={128}
          height={128}
          border={50}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1}
          rotate={0}
        />
        {this.state.image == null ?
            <img src="https://bulma.io/images/placeholders/128x128.png"/>
          :
          <img src={this.state.image}/>
        }

      </div>
    )
  }
}
