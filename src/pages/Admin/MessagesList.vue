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
    <template v-if="!loading" :key="chats">
        {{ chats }}
        <p v-for="chat in chats">{{ chat.message }}</p>
        
        <p>asdf</p>
    </template>
    <template v-else>
        <Loader />
    </template>

</template>