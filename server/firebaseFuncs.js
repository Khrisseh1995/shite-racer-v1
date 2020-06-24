const admin = require("firebase-admin");

// Fetch the service account key JSON file contents
const serviceAccount = require("./admin.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://shiteracerauth.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
module.exports.addToDatabase = () => {
    const db = admin.database();
    console.log(db);
    const ref = db.ref("race_instances");
    ref.once("value", function (snapshot) {
        console.log(snapshot.val());
    });
    var usersRef = ref.child("users");
    ref.set({
        someInstance: {
            players: 0
        }
    });
    // usersRef.set({
    //     alanisawesome: {
    //         date_of_birth: "June 23, 1912",
    //         full_name: "Alan Turing"
    //     },
    //     gracehop: {
    //         date_of_birth: "December 9, 1906",
    //         full_name: "Grace Hopper"
    //     }
    // });
};

