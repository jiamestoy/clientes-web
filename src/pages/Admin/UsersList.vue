<script setup>
import { useRoute } from 'vue-router';
import { getAllUsers } from '../../services/users.js';
import { onBeforeMount, ref } from 'vue';

const route = useRoute();
const users = ref();

async function getUsers() {
    users.value = await getAllUsers();
}

onBeforeMount(() => {
    getUsers()
})
</script>

<template>
    <h1 class="text-3xl my-3 text-center">Lista de Usuarios</h1>

    <table class="table-auto border-collapse m-auto">
        <thead>
            <tr>
            <th class="border p-2">ID</th>
            <th class="border p-2">Correo Electrónico</th>
            <th class="border p-2">Rol</th>
            <th class="border p-2">Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users">
                <td class="border p-2">{{ user.id }}</td>
                <td class="border p-2">{{ user.email }}</td>
                <td class="border p-2">{{ user.role }}</td>
                <td class="border p-2"><router-link class="text-green-700 underline" :to="`/admin/user/${user.id}`">Ver Detalles</router-link></td>
            </tr>
        </tbody>
    </table>
</template>