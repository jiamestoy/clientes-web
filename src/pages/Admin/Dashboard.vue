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
    <section class="container">
        <h1 class="text-3xl mb-3">Panel de Administración</h1>
        
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nesciunt nihil, vero mollitia magni doloremque eligendi at, perspiciatis, magnam aperiam eveniet. Repellat, quam! Sed autem itaque alias quas odio totam.</p>
        <router-link class="block p-2 my-2 bg-green-700 text-white rounded text-center" to="lista-usuarios">Lista de Usuarios</router-link>

        <router-link class="block p-2 my-2 bg-green-700 text-white rounded text-center" to="lista-mensajes">Mensajes</router-link>

        <router-link class="block p-2 my-3 bg-green-700 text-white rounded text-center" to="/admin/products">Productos</router-link>
    </section>
</template>