<script setup>
import { getAllPrivateChats } from "../../services/private-chat.js";
import Loader from '../../components/Loader.vue';
import { onBeforeMount, ref } from 'vue';

const chats = ref([]);
const loading = ref(true);

async function getAllChats() {
  try {
    chats.value = await getAllPrivateChats();
  } catch (error) {
    console.error(error.message);
  } finally {
    loading.value = false;
  }
}
onBeforeMount(async () => {
  await getAllChats();
});
</script>

<template>
  <h1 class="text-3xl my-3">Mensajes Recibidos</h1>
  <Loader v-if="loading" />

  <table v-else class="table-auto border-collapse m-auto">
  <thead>
    <tr>
      <th class="border p-2">ID</th>
      <th class="border p-2">Nombre de Usuario</th>
      <th class="border p-2">Acción</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="chat in chats" :key="chat.userId">
      <template v-for="userId in chat">
        <template v-if="userId !== 'rPkbcbFrpJTsdicp1V3ok4cq20e2'">
          <td class="border p-2">{{ userId }}</td>
          <td class="border p-2">Nombre de Usuario</td>
          <td class="border p-2">
            <router-link class="block p-2" :to="`/usuario/${userId}/chat`">Chat</router-link>
          </td>
        </template>
      </template>
    </tr>
  </tbody>
</table>

</template>