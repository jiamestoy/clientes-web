<script setup>
import { useRoute } from 'vue-router';
import useUser from '../composition/useUser.js';

const route = useRoute();
const {user, loading} = useUser(route.params.id);
</script>

<template>
    <template v-if="!loading">
        <section class="container">
            <h1 class="text-3xl my-3">Perfil de {{ user.email }}</h1>

            <h2 class="text-2xl mb-2">Chat privado</h2>
            <router-link
                :to="`/usuario/${user.id}/chat`"
                class="text-blue-400 underline"
            >Iniciar chat privado con {{user.email}}</router-link>
        </section>
    </template>
    <template v-else>
    </template>
</template>