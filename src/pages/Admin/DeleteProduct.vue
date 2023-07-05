<script setup>
import Button from '../../components/Button.vue';
import Label from '../../components/Label.vue';
import Input from '../../components/Input.vue';
import Loader from '../../components/Loader.vue';
import { deleteProduct } from '../../services/products.js';
import { ref }  from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useProduct from '../../composition/useProduct.js';

const route = useRoute();
const productId = route.params.id;
const {product} = useProduct(productId);
const {handleSubmit, loading, feedback} = useDeleteInForm();

function useDeleteInForm() {
    const loading = ref(false);
    const router = useRouter();

    const feedback = ref({
        message: '',
        type: 'error',
    });

    function handleSubmit() {
        loading.value = true;

        deleteProduct(productId)
        .then(() => {
            feedback.value = {
                    message: 'El producto se eliminó con éxito.',
                    type: 'success',
                }
            loading.value = false;
            setTimeout(() => router.push('/admin/products'), 2000);
        })
        .catch(err => {
            loading.value = false;
            feedback.value = {
                message: err.message,
                type: 'error',
            }
        }) 
    }

    return {
        handleSubmit,
        feedback,
        loading,
    }
}
</script>

<template>
    <section class="container w-1/4">
        <h1 class="text-3xl my-3">¿Eliminar el producto {{ product.name }}?</h1>
        <form 
            action="#" 
            method="post" 
            @submit.prevent="handleSubmit"
        >

            <div class="my-2 p-2 border rounded">
                <h3 class="mb-4">{{ product.name }}</h3>

                <p>{{ product.description }}</p>

                <p>Precio: ${{ product.price }}/mes</p>
            </div>

            <Button class="my-3 block w-full">Sí, eliminar producto</Button>
            <router-link :to="`/admin/products`" class="block p-2 my-2 bg-red-500 text-white rounded text-center">Cancelar</router-link>


            <Loader v-if="loading" />

            <div v-if="feedback.message !== '' && feedback.type == 'error'" class="bg-red-200 text-red-900 p-3 rounded">
                {{ feedback.message }}
            </div>
            <div v-if="feedback.message !== '' && feedback.type == 'success'" class="bg-green-200 text-green-900 p-3 rounded">
                {{ feedback.message }}
            </div>
        </form>
    </section>
</template>