<script setup>
import { useRoute } from 'vue-router';
import useAuth from '../composition/useAuth';
import { getUserOrders } from '../services/users.js';
import { onBeforeMount, onMounted, ref } from 'vue';
import { formatDate } from '../helpers/dates.js'
import { getPrivateChatMessages } from '../services/private-chat.js'
import { getAllUsers } from '../services/users.js';

const route = useRoute();
const {user} = useAuth();
const users = ref([]);
const orders = ref();
const messages = ref();

async function getOrders() {
    orders.value = await getUserOrders(user.value.id);
}

async function getMessages() {
    messages.value = await getPrivateChatMessages(user.value.id)
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

onMounted(() => {
    getOrders()
    getMessages()
})

onBeforeMount(async () => {
  await getUsers();
});

</script>

<template>
    <section class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center text-green-900 my-3">Mi Perfil</h1>
        <h2 class="text-2xl font-bold mb-2">Mis datos</h2>
        <p class="text-gray-600">Email: {{ user.email }}</p>
        <h2 class="text-2xl font-bold mt-6 mb-2">Mis servicios</h2>
        <template v-if="orders === null">
            <p class="text-gray-600">No se ha contratado ningún servicio.</p>
        </template>
        <template v-else>
            <ul class="text-gray-600" v-for="order in orders" :key="order.id">
                <li><span class="font-bold">Nombre:</span> {{ order.service_name }}</li>
                <li><span class="font-bold">Fecha de contratación:</span> {{ formatDate(order.created_at) }}</li>
                <li><span class="font-bold">Fecha de vencimiento:</span> {{ formatDate(order.expiry_date) }}</li>
            </ul>
        </template>

        <h2 class="text-2xl font-bold mt-6 mb-2">Chat</h2>
        <table class="table-auto w-full border-collapse">
            <thead>
                <tr>
                    <th class="border p-2">Usuario</th>
                    <th class="border p-2">Mensaje</th>
                    <th class="border p-2">Fecha de envio</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="message in messages" :key="message.id">
                    <td class="border p-2">{{ getUserEmail(message.userId) }}</td>
                    <td class="border p-2">{{ message.message }}</td>
                    <td class="border p-2">{{ formatDate(message.created_at) }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>
