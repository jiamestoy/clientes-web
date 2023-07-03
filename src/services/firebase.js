import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyApk13ambUZddFSI2oqcMWOcfpbax7L4-U",
    authDomain: "clientes-web-tp1.firebaseapp.com",
    projectId: "clientes-web-tp1",
    storageBucket: "clientes-web-tp1.appspot.com",
    messagingSenderId: "405636253095",
    appId: "1:405636253095:web:a1bc1bf9886c985191e282"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export {app, db, auth};