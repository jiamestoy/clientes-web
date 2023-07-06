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

export async function getChatsByUser(userId) {
    console.log(userId)
    const privateChatRef = collection(db, 'private-chats');

    const userQuery = query(
        privateChatRef,
        where(`users.${userId}`, '==', true)
    );

    const querySnap = await getDocs(userQuery);

    const chats = querySnap.docs.map(doc => doc.data());

    return chats;
}

export async function getAllPrivateChats(){
    const chats = [];

    const privateChatsRef = collection(db, 'private-chats');

    const getChats = await getDocs(privateChatsRef)
    getChats.forEach(async (doc) => {
        const messagesRef = collection(db, `private-chats/${doc.id}/messages`);
        const messageQuery = query(messagesRef, orderBy('created_at', 'desc'), limit(1));
        
        const querySnapshot = await getDocs(messageQuery);
        querySnapshot.forEach((doc) => {
            chats.push(doc.data())
        });
    })
    console.log(chats);
    return chats
}