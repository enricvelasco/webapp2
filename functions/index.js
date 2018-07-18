const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const database = admin.database();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 /*exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
  return "HOLA ATACA FUNCTION"
});*/

 exports.callFunction = functions.https.onCall((data, response) => {
   let campo = {}
   campo.mensaje = "Respuesta funcion"
   campo.data = data

   var usersRef = database.child("cities");
   usersRef.set({
      name:'barcelona'
    })

   //response.send("RESPONSE SEND")
  return campo
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
