const functions = require('firebase-functions');
const admin = require('firebase-admin');
const storage = require('@google-cloud/storage')();

admin.initializeApp(functions.config().firebase);

const bucket = "source-bucket-name";

const database = admin.database();

var bucket = admin.storage().bucket();

//admin.database() para acceso a realtimeDatabase
//admin.firestore() para acceso a firestore

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 /*exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
  return "HOLA ATACA FUNCTION"
});*/

exports.guardarImagen = functions.https.onCall((data)=>{
  var imagen = data.image


})

 exports.callFunction = functions.https.onCall((data) => {
   let imagen ={}
   let objGuardar = {}
   for (var prop in data) {
      //console.log(`obj.${prop} = ${obj[prop]}`);
      if(prop == "image"){
        imagen = data[prop]
      }else{
        //objGuardar[prop] = obj[prop]
        objGuardar[prop] = data[prop]
      }
    }
   /*let campo = {}
   campo.mensaje = "Respuesta funcion"
   campo.data = data*/

   /*var usersRef = database.child("cities");
   usersRef.set({
      name:'barcelona'
    })*/
  return admin.firestore().collection('asociaciones').add(
      objGuardar
    ).then((resp) => {
      console.log('New Message written');
      let pathImage = resp._referencePath.segments[0]+"/"+resp._referencePath.segments[1]+"/"+data.image.name
      var storageRef = admin.storage().child(pathImage)
      /*storageRef.put(data.image).then((snapshot) => {
        //console.log('Uploaded a blob or file!');
        return {text:"insert OK", idResp:resp._referencePath.segments};
      });*/
      // Returning the sanitized message to the client.
      return {text:"insert OK", idResp:resp._referencePath.segments};
    })

   //response.send("RESPONSE SEND")
  //return campo
});

exports.saveWithImage = functions.https.onCall((recurso) => {
  console.log("ENTRA EN FUNCION", recurso);
  var bd = functions.database.ref('cities');
  bd.add({
    name: 'Tokyo',
    country: 'Japan'
  }).then(ref => {
    console.log('Added document with ID: ', ref.id);
    return "HA LLAMADO FUNCION"
    //response.send("DOC AÑADIDO");
  });
  //response.send("DOC AÑADIDO");

});


/* exports.deleteAll = functions.https.onRequest((request, response) => {
  console.log("REQUEST",request);

  let arrayEliminar = request.arrayEliminar
  //let url = request.urlRecurso

  arrayEliminar.forEach(function(campo){
    db.collection('cities').doc('DC').delete();
  })

  response.send("delete ALL");
});*/
