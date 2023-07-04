import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBcYLXPt-_QPdzBmLiNKW8fFjzvA4z_EqY",
    authDomain: "clientes-web-1a6a1.firebaseapp.com",
    projectId: "clientes-web-1a6a1",
    storageBucket: "clientes-web-1a6a1.appspot.com",
    messagingSenderId: "182904982175",
    appId: "1:182904982175:web:56900f984258ec2557b0aa"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export {app, db, auth};