<script setup>
import { subscribeToProducts } from "../../services/products.js";
import {ref} from "vue";

const {products} = useProductsList();

function useProductsList() {
    const products = ref([]);

    subscribeToProducts(newProducts => {
        products.value = newProducts;
    });

    return {
        products,
    }
}
</script>

<template>
    <section class="container max-w-5xl m-auto">
        <h1 class="text-3xl font-bold text-green-900 mb-4 text-center">Panel de Administración</h1>

        <router-link class="block py-4 my-2 w-1/2 mx-auto bg-green-700 text-white rounded text-center" to="/admin/lista-usuarios">Lista de Usuarios</router-link>

        <router-link class="block py-4 my-2 w-1/2 mx-auto bg-green-700 text-white rounded text-center" to="/admin/lista-mensajes">Mensajes</router-link>

        <router-link class="block py-4 my-3 w-1/2 mx-auto bg-green-700 text-white rounded text-center" to="/admin/products">Productos</router-link>
    </section>
</template>