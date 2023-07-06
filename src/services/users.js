import { db } from './firebase.js';
import { doc, setDoc, getDoc, collection, getDocs, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

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

export async function getUserOrders(id){
    const orders = [];
    const querySnapshot = await getDocs(collection(db, 'users', id, 'orders'))
    querySnapshot.forEach((doc) => {
        const order = {
            service_name: doc.data().service_name,
            service_id: doc.data().service_id,
            order_id: doc.id,
            created_at: doc.data().created_at?.toDate(),
            expiry_date: doc.data().expiry_date?.toDate(),
        }
        orders.push(order)
        // console.log(doc.id, ' => ', doc.data());
    });
    if (orders.length == 0) {
        return null
    } else {
        return orders
    }
}

export async function createOrder(id, idProduct){
    const expiresIn = 30;
    const expiresAt = Timestamp.now().toDate();
    expiresAt.setDate(expiresAt.getDate() + expiresIn);

    const productRef = doc(db, 'products', idProduct);
    const product = await getDoc(productRef);
    let productName = null;

    if(!product.exists()) {
        return null;
    } else {
        productName = product.data().name;
    }

    await addDoc(collection(db, 'users', id, 'orders'), {
        service_id: idProduct,
        service_name: productName,
        created_at: serverTimestamp(),
        expiry_date: expiresAt,
    })
}