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

// console.log(productId, userId)
// const {handleSubmit, loading, feedback} = useEditInForm();

// function useEditInForm() {
//     const loading = ref(false);
//     const router = useRouter();

//     const feedback = ref({
//         message: '',
//         type: 'error',
//     });

//     function handleSubmit() {
//         loading.value = true;

//         edit({...product.value}, productId)
//         .then(() => {
//             feedback.value = {
//                     message: 'El producto se editó con éxito.',
//                     type: 'success',
//                 }
//             loading.value = false;
//             setTimeout(() => router.push('/admin/products'), 2000);
//         })
//         .catch(err => {
//             loading.value = false;
//             feedback.value = {
//                 message: err.message,
//                 type: 'error',
//             }
//         }) 
//     }

//     return {
//         handleSubmit,
//         feedback,
//         loading,
//     }
// }
</script>

<template>
    <section class="container w-1/4">
        <h1 class="text-3xl my-3">Servicio contratado</h1>

        <p>¡Felicitaciones! Contrataste el servicio: {{ product.name }}</p>
    </section>
</template>