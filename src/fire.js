import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyB2255k8yH0fH-PVA6h909NU_tVO-xx5So",
    authDomain: "todo-1a684.firebaseapp.com",
    databaseURL: "https://todo-1a684.firebaseio.com",
    projectId: "todo-1a684",
    storageBucket: "todo-1a684.appspot.com",
    messagingSenderId: "609627125655"
};
const fire = firebase.initializeApp(config);
export default fire;
