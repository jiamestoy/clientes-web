<script setup>
import { getChatsByUser } from "../../services/private-chat.js";
import useAuth from '../../composition/useAuth';
import { ref } from 'vue';

const {user} = useAuth();

const chats = ref(null);

async function getChats() {
  try {
    const chatList = await getChatsByUser(`rPkbcbFrpJTsdicp1V3ok4cq20e2`);
    chats.value = chatList;
  } catch (error) {
    console.error(error);
  }
}

getChats();


</script>

<template>
    <h1 class="text-3xl my-3">Mensajes Recibidos</h1>
    <p>{{ chats }}</p>

    
</template>