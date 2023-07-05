import { CollectionReference, addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
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
export async function createProduct({name, description}) {
    const productRef = collection(db, 'products') ;

    return await addDoc(productRef, {name, description});
}