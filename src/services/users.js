import { db } from './firebase.js';
import { doc, setDoc, getDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';

export function createUser(id, { email, role }) {

    const userRef = doc(db, 'users', id);
    return setDoc(userRef, { email, role });
}

export async function getUserById(id) {

    const userRef = doc(db, 'users', id);
    const user = await getDoc(userRef);

    if(!user.exists()) {
        return null;
    }

    return {
        id: user.id,
        email: user.data().email,
    };

}

export async function isAdmin(id) {
    const userRef = doc(db, 'users', id);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
  
    return userData.role === 'admin';
}

export async function getAllUsers(){
    const users = [];
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
        const newUser = {
            email: doc.data().email,
            role: doc.data().role,
            id: doc.id,
        }
        users.push(newUser)
    });
    return users;
}