// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBrWLUI2HwF2cgQy5yKAb0BI2aambA279g",
    authDomain: "smartmeal-35a45.firebaseapp.com",
    databaseURL: "https://smartmeal-35a45-default-rtdb.firebaseio.com",
    projectId: "smartmeal-35a45",
    storageBucket: "smartmeal-35a45.appspot.com",
    messagingSenderId: "287183468",
    appId: "1:287183468:web:c8a1484549039617a3be49",
    measurementId: "G-X258V8F31C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const dbRef = firebase.database();

// usersRef.on("child_added", snap => {
//    let user = snap.val();
//    console.log(user, snap);
// });


auth.onAuthStateChanged(user => {
    if(user){
        console.log("user: ", user );
        localStorage.setItem('userUID', user.uid)
    } else {
        alert("This post will show up as Anonymous.")
        localStorage.setItem('userUID', '3ZGGnC3WGkRiSjPvLXhLBRadf3m1')
    }
})