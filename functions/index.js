const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 /*exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
  return "HOLA ATACA FUNCTION"
});*/

 exports.callFunction = functions.https.onCall((data, context) => {
  return "HA LLAMADO FUNCION"
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
