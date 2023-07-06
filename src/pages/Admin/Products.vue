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
        <h1 class="text-3xl font-bold text-center text-green-900 mb-5">Productos</h1>

        <router-link class="block py-4 my-3 mx-auto w-1/2 bg-green-700 text-white rounded text-center" to="/admin/products/new">Añadir Nuevo Producto</router-link>

        <div class="flex justify-center gap-4">
            <div v-for="product in products" class="my-2 p-4 border rounded max-w-xs flex flex-col">
                <h2 class="mb-4 text-2xl text-green-900 font-bold text-center">{{ product.name }}</h2>

                <p class="text-lg mb-4">{{ product.description }}</p>

                <div class="mt-auto">
                    <p class="text-2xl text-green-700 my-4"><span class="text-xl text-black">Precio: </span>${{ product.price }}/mes</p>
    
                    <router-link :to="`/admin/products/edit/${product.id}`" class="block p-2 my-2 bg-blue-500 text-white rounded text-center">Editar</router-link>
                    <router-link :to="`/admin/products/delete/${product.id}`" class="block p-2 my-2 bg-red-500 text-white rounded text-center">Eliminar</router-link>
                </div>
            </div>
        </div>
    </section>
</template>