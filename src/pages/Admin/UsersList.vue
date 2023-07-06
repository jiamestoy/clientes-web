<script setup>
import { useRoute } from 'vue-router';
import { getAllUsers } from '../../services/users.js';
import { onBeforeMount, ref } from 'vue';
import Loader from '../../components/Loader.vue';

const route = useRoute();
const users = ref([]);
const loading = ref(true);

async function getUsers() {
  try {
    users.value = await getAllUsers();
  } catch (error) {
    console.error(error.message);
  } finally {
    loading.value = false;
  }
}

onBeforeMount(async () => {
  await getUsers();
});
</script>

<template>
  <h1 class="text-3xl font-bold text-green-900 my-3 text-center">Lista de Usuarios</h1>

  <div v-if="loading" class="flex justify-center">
    <Loader />
  </div>

  <table v-else class="table-auto border-collapse m-auto">
    <thead>
      <tr>
        <th class="border p-2">ID</th>
        <th class="border p-2">Correo Electrónico</th>
        <th class="border p-2">Rol</th>
        <th class="border p-2">Acción</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td class="border p-2">{{ user.id }}</td>
        <td class="border p-2">{{ user.email }}</td>
        <td class="border p-2">{{ user.role }}</td>
        <td class="border p-2">
          <router-link class="text-green-700 underline" :to="`/admin/user/${user.id}`">Ver Detalles</router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>
