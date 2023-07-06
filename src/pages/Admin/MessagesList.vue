<script setup>
import { getChatsByUser, getAllPrivateChats } from "../../services/private-chat.js";
import Loader from '../../components/Loader.vue';
import useAuth from '../../composition/useAuth';
import { onMounted, ref, onBeforeMount, onUpdated, watch } from 'vue';

const chats = ref();
const {getChats, chatsArray, loading} = useChats();

function useChats() {
    const chatsArray = ref([])
    const loading = ref(true)
    getChats()

    async function getChats() {
        loading.value = true;

        await getAllPrivateChats()
        .then((chats) => {
            chatsArray.value = chats
        })
        .then(() => {
            loading.value = false;
        })
        .catch(err => {
            loading.value = false;
            console.log(err.message)
        })
    }

    return {
        chatsArray,
        loading,
        getChats
    }
}

onUpdated(() => {
    console.log(chatsArray)
    chats.value = chatsArray.value;
})
</script>

<template>
    <h1 class="text-3xl my-3">Mensajes Recibidos</h1>

    <table class="table-auto border-collapse m-auto">
        <thead>
            <tr>
            <th class="border p-2">ID</th>
            <th class="border p-2">Nombre de Usuario</th>
            <th class="border p-2">Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="chat in chats" :key="chat.userId">
                <td class="border p-2">{{ chat.userId }}</td>
                <td class="border p-2">Nombre de Usuario</td>
                <td class="border p-2">
                    <router-link class="block p-2" :to="`/usuario/${chat.userId}/chat`">Chat</router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>