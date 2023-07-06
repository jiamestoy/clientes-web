<script setup>
import { useRouter, useRoute } from 'vue-router';
import useProduct from '../composition/useProduct.js';
import { onMounted } from 'vue';
import { createOrder } from '../services/users.js';

const route = useRoute();
const productId = route.params.id;
const {product} = useProduct(productId);
const userId = route.params.userId;

onMounted(() => {
    createOrder(userId, productId)
})
</script>

<template>
    <section class="container w-1/4 mx-auto">
        <h1 class="text-3xl my-3 font-bold text-center text-green-900">Servicio contratado</h1>

        <p class="text-lg text-center">¡Felicitaciones! Contrataste el servicio:</p>
        <p class="text-2xl text-center">{{ product.name }}</p>
    </section>
</template>