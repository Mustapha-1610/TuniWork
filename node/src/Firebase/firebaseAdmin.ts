var admin = require("firebase-admin");
var serviceAccount = require("./tuniwork-4e603-firebase-adminsdk-t0klo-cb585d803a");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "tuniwork-4e603.appspot.com",
});

export default admin;
