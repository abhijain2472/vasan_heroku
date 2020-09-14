const functions = require('firebase-functions');
const admin = require('firebase-admin');
var serviceAccount = require("firebase.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vasanshop-bf2d0.firebaseio.com"
});

// admin.initializeApp(functions.config().firebase);

exports.sendNotificationOnFcmToken = admin.functions.firestore.document('products/{prodId}').onWrite(async (snapshot, event) => {

     admin.firestore().document('test').set({
                    name:"Abhsihek"
                });
    let title = 'Product Details.';
    let content = 'Click to goto product.';
    let doc = await admin.firestore().doc('users/CNxRAuPnih6Q1wjFCiz3').get();
    let fcmTOken = doc.get('fcm');
    var product = snapshot.after.data();
    var message = {
        notification: {
            title: title,
            body: content,
        },
        data: {
            product: product.id,
            click_action: "FLUTTER_NOTIFICATION_CLICK",
        },
        token: fcmTOken,
    };
    let response = await admin.messaging().send(message);
    console.log(response);
}); 

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
