<script setup>
import Button from '../../components/Button.vue';
import Label from '../../components/Label.vue';
import Input from '../../components/Input.vue';
import Loader from '../../components/Loader.vue';
import { edit } from '../../services/products.js';
import { ref }  from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useProduct from '../../composition/useProduct.js';

const route = useRoute();
const productId = route.params.id;
const {product} = useProduct(productId);
const {handleSubmit, loading, feedback} = useEditInForm();

function useEditInForm() {
    const loading = ref(false);
    const router = useRouter();

    const feedback = ref({
        message: '',
        type: 'error',
    });

    function handleSubmit() {
        loading.value = true;

        edit({...product.value}, productId)
        .then(() => {
            feedback.value = {
                    message: 'El producto se editó con éxito.',
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
    <section class="container max-w-lg m-auto">
        <h1 class="text-4xl my-5 font-bold text-center text-green-900">Editar Producto</h1>
        <form 
            action="#" 
            method="post" 
            @submit.prevent="handleSubmit"
        >
            <div class="mb-3">
                <Label 
                    for="name" 
                    id="name"
                >Nombre</Label>
                <Input 
                    type="text" 
                    name="name" 
                    id="name"
                    v-model="product.name"
                />
            </div>
            <div class="mb-3">
                <Label 
                    for="description" 
                    id="description"
                >Descripción</Label>
                <Input 
                    type="text" 
                    name="description" 
                    id="description"
                    v-model="product.description"   
                />
            </div>
            <div class="mb-3">
                <Label 
                    for="price" 
                    id="price"
                >Precio</Label>
                <Input 
                    type="number" 
                    name="price" 
                    id="price"
                    v-model="product.price"   
                />
            </div>
            <Button class="my-3 py-4 w-full">Guardar</Button>

            <div class="flex justify-center">
                <Loader v-if="loading" />
            </div>

            <div v-if="feedback.message !== '' && feedback.type == 'error'" class="bg-red-200 text-red-900 p-3 rounded">
                {{ feedback.message }}
            </div>
            <div v-if="feedback.message !== '' && feedback.type == 'success'" class="bg-green-200 text-green-900 p-3 rounded">
                {{ feedback.message }}
            </div>
        </form>
    </section>
</template>