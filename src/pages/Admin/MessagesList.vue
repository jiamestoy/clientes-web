<script setup>
import { getAllPrivateChats } from "../../services/private-chat.js";
import { getAllUsers } from '../../services/users.js';
import Loader from '../../components/Loader.vue';
import { onBeforeMount, ref } from 'vue';
import useAuth from '../../composition/useAuth.js';

const chats = ref([]);
const loading = ref(true);
const users = ref([]);
const {user} = useAuth();

async function getAllChats() {
  try {
    chats.value = await getAllPrivateChats();
  } catch (error) {
    console.error(error.message);
  } finally {
    loading.value = false;
  }
}

async function getUsers() {
  try {
    users.value = await getAllUsers();
  } catch (error) {
    console.error(error.message);
  }
}

function getUserEmail(userId) {
  const user = users.value.find((user) => user.id === userId);
  return user ? user.email : '';
}

onBeforeMount(async () => {
  await getAllChats();
  await getUsers();
});
</script>

<template>
    <h1 class="text-3xl font-bold text-green-900 text-center mb-5">Mensajes Recibidos</h1>
    <div v-if="loading" class="flex justify-center">
        <Loader />
    </div>
  
    <table v-else class="table-auto border-collapse m-auto">
      <thead>
        <tr>
          <th class="border p-2">Usuario</th>
          <th class="border p-2">Último Mensaje</th>
          <th class="border p-2">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="chat in chats" :key="chat.userIds.join('-')">
          <template v-for="userId in chat.userIds" :key="userId">
            <template v-if="userId !== user.id">
              <td class="border p-2">{{ getUserEmail(userId) }}</td>
              <td class="border p-2">{{ chat.lastMessage?.message }}</td>
              <td class="border p-2">
                <router-link class="text-green-700 underline" :to="`/usuario/${userId}/chat`">Responder</router-link>
              </td>
            </template>
          </template>
        </tr>
      </tbody>
    </table>
</template>
  
