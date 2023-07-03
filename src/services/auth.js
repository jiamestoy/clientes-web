import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';
import { createUser } from './users.js';

export function login({email, password}) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(credentials => {
            return {
                id: credentials.user.uid,
                email: credentials.user.email,
            }
        })
        .catch(err => {
            console.error('[Login.vue] Error al iniciar sesión', err);
            throw new Error(err.message);
        })
}

export function logout() {
    return signOut(auth)
        .catch(err => {
            console.error('[auth.js logout] Error: ', err);
        });
}

export async function register ({email, password}) {
    const user = await createUserWithEmailAndPassword(auth, email, password);

    const userData = { email, role: "common" };
    createUser(user.user.uid, userData);

    return true;
}

let user = {
    id: null,
    email: null,
}

onAuthStateChanged(auth, newUser => {
    if(newUser) {
        user = {
            id: newUser.uid,
            email: newUser.email,
        };
    } else {
        user = {
            id: null,
            email: null,
        }
    }

    notifyAll();
})

let observers = [];

export function subscribeToAuth(observer) {
    observers.push(observer);
    notify(observer);
}

function notify(observer) {
    observer({...user});
}

export function notifyAll() {
    observers.forEach(observer => notify(observer));
}