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
        <h1 class="text-3xl mb-3">Productos</h1>

        <router-link class="block p-2 my-3 bg-green-700 text-white rounded text-center" to="/admin">Añadir Nuevo Producto</router-link>

        <div class="flex gap-4">
            <div v-for="product in products" class="my-2 p-2 border rounded">
                <h2 class="mb-4">{{ product.name }}</h2>

                <p>{{ product.description }}</p>

                <router-link :to="`/admin/editar/${product.id}`" class="block p-2 my-2 bg-blue-500 text-white rounded text-center">Editar</router-link>
                <router-link :to="`/admin/eliminar/${product.id}`" class="block p-2 my-2 bg-red-500 text-white rounded text-center">Eliminar</router-link>
            </div>
        </div>
    </section>
</template>