<script setup>
import { createProduct } from "../../services/products.js";
import {ref} from "vue";
import Label from "../../components/Label.vue";
import Button from "../../components/Button.vue";
import Input from "../../components/Input.vue";
import Loader from "../../components/Loader.vue";
import {useRouter} from "vue-router";

const {fields, loading, feedback, handleSubmit} = useProductForm();

function useProductForm() {
    const router = useRouter();
    const fields = ref({
        name: '',
        description: '',
        price: null,
    });
    const loading = ref(false);
    const feedback = ref({
        message: '',
        type: 'success',
    });

    function handleSubmit() {
        loading.value = true;

        createProduct({name: fields.value.name, description: fields.value.description, price: fields.value.price})
            .then(() => {
                feedback.value = {
                    message: 'El producto se creó con éxito.',
                    type: 'success',
                }
                loading.value = false;
                setTimeout(() => router.push('/admin/products'), 2000);
            })
            .catch(err => {
                console.error('[NewProduct.vue handleSubmit] Error: ', err);
                loading.value = false;
                feedback.value = {
                    message: err.message,
                    type: 'error',
                }
            });
    }

    return {
        fields,
        loading,
        feedback,
        handleSubmit,
    }
}
</script>

<template>
    <section class="container max-w-lg m-auto">
        <h1 class="text-3xl font-bold text-center text-green-900 my-3">Crear Nuevo Producto</h1>

        <form
            action="#"
            method="post"
            @submit.prevent="handleSubmit"
        >
            <div class="mb-3">
                <Label for="name">Nombre del producto</Label>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    v-model="fields.name"
                    required
                />
            </div>
            <div class="mb-3">
                <Label for="description">Descripción</Label>
                <Input
                    type="text"
                    name="description"
                    id="description"
                    v-model="fields.description"
                    required
                />
            </div>
            <div class="mb-3">
                <Label for="price">Precio</Label>
                <Input
                    type="number"
                    name="price"
                    id="price"
                    v-model="fields.price"
                    required
                    min="0"
                />
            </div>
            <Button class="my-3 p-4 block w-full">Añadir Producto</Button>
        </form>

        <div class="flex justify-center">
            <Loader v-if="loading" />
        </div>

        <div v-if="feedback.message !== '' && feedback.type == 'error'" class="bg-red-200 text-red-900 p-3 rounded">
                {{ feedback.message }}
        </div>
        <div v-if="feedback.message !== '' && feedback.type == 'success'" class="bg-green-200 text-green-900 p-3 rounded">
            {{ feedback.message }}
        </div>
    </section>
</template>