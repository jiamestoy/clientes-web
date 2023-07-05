<script setup>
import { useRoute } from 'vue-router';
import useUser from '../../composition/useUser.js';

const route = useRoute();
const {user, loading} = useUser(route.params.id);
</script>

<template>
    <template v-if="!loading">
        <section class="container">
            <h1 class="text-3xl my-3">Perfil de {{ user.email }}</h1>
        </section>
    </template>
    <template v-else>
    </template>
</template>