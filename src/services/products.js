import { CollectionReference, addDoc, collection, doc, setDoc, onSnapshot, query, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase.js";

/**
 * Obtiene la referencia a la collection para los productos.
 * 
 * @returns {CollectionReference<DocumentData>}
 */
function getProductsReference(){
    return collection(db, 'products');
}

/**
 * 
 * @param { (data: {id: string, name: string, description: string}[]) => null} callback - Función a ejecutar cada vez que hayan productos nuevos.
 */
export function subscribeToProducts(callback) {
    const chatRef = getProductsReference();

    const q = query(chatRef);

    onSnapshot(q, snapshot => {
        const data = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                price: doc.data().price,
            }
        });

        callback(data);
    });
}

/**
 * 
 * @param {string} name 
 * @param {string} description
 */
export async function createProduct({name, description, price}) {
    const productRef = collection(db, 'products') ;

    return await addDoc(productRef, {name, description, price});
}

export async function getProductById(id) {

    const productRef = doc(db, 'products', id);
    const product = await getDoc(productRef);

    if(!product.exists()) {
        return null;
    }

    return {
        name: product.data().name,
        description: product.data().description,
        price: product.data().price,
    };

}

export async function edit({name, description, price}, id) {
    await setDoc(doc(db, 'products', id), {
        name: name,
        description: description,
        price: price,
    });
}

export async function deleteProduct(id) {
    await deleteDoc(doc(db, 'products', id));
}