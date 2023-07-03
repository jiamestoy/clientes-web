import { serverTimestamp, 
    collection, 
    addDoc, 
    onSnapshot, 
    orderBy, 
    query, 
} from 'firebase/firestore';
import { db } from './firebase.js';


function getChatReference() {
    return collection(db, 'chat-messages');
}

export function sendMessage({userId, username, message}) {

    const data = {
        userId,
        username,
        message,
        created_at: serverTimestamp(),
    }

    const chatRef = getChatReference();

    return addDoc(chatRef, data)
        .then(docRef => docRef.id)
        .catch(err => {
            console.error('[chat.js sendMessage()] Error al enviar el mensaje: ', err);
            throw err;
        });
}

export function subscribeToChatMessages(callback) {

    const chatRef = getChatReference();

    const q = query(chatRef, orderBy('created_at'));

    onSnapshot(q, snapshot => {
   
        const data = snapshot.docs.map(doc => {
            return {
                userId: doc.data().userId,
                username: doc.data().username,
                message: doc.data().message,
                created_at: doc.data().created_at?.toDate(),
            }
        });

        callback(data);

    })
}