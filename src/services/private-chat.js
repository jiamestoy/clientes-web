import { db } from './firebase.js';
import {
    addDoc,
    collection,
    serverTimestamp,
    query,
    where,
    limit,
    getDocs,
    onSnapshot,
    orderBy,
} from 'firebase/firestore';

export async function subscribeToPrivateChat({from, to}, callback) {
    const chatRef = await getPrivateChatRef(from, to);

    const messagesRef = collection(db, `private-chats/${chatRef.id}/messages`);

    const messageQuery = query(messagesRef, orderBy('created_at'));

    return onSnapshot(messageQuery, snapshot => {
        const docs = snapshot.docs.map(doc => {
            return {
                userId: doc.data().userId,
                message: doc.data().message,
                created_at: doc.data().created_at?.toDate(),
            }
        });
        callback(docs);
    });
}

export async function sendPrivateChatMessage({from, to, message}) {
    const chatRef = await getPrivateChatRef(from, to);

    console.log("chatRef id: ", chatRef.id);

    const messagesRef = collection(db, `private-chats/${chatRef.id}/messages`);

    return addDoc(messagesRef, {
        userId: from,
        message,
        created_at: serverTimestamp(),
    })
    
}

async function getPrivateChatRef(from, to) {
    const privateChatRef = collection(db, 'private-chats');

    const users = {
        [from]: true,
        [to]: true,
    }

    const chatQuery = query(
        privateChatRef,
        where('users', '==', users),
        limit(1),
    );

    const querySnap = await getDocs(chatQuery);

    if(querySnap.empty) {
        return await addDoc(privateChatRef, {
            users
        });
    }

    return querySnap.docs[0];

}