<script setup>
import { useRoute } from 'vue-router';
import useAuth from '../composition/useAuth';

const route = useRoute();
const {user} = useAuth();
</script>

<template>
    <section class="container">
        <h1 class="text-3xl my-3">Mi Perfil</h1>
        <p>Email: {{ user.email }}</p>

        <h2 class="text-2xl mb-2">Chat</h2>
    </section>
</template>