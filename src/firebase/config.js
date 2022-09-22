import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCUJ2HPfsZ0ReelaJtvafjxHnuRacRTR7E',
  authDomain: 'money-app-20c37.firebaseapp.com',
  projectId: 'money-app-20c37',
  storageBucket: 'money-app-20c37.appspot.com',
  messagingSenderId: '803409676298',
  appId: '1:803409676298:web:9beb3cf1ec173d96d4f7f3',
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init firestore
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
