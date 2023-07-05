<script setup>
import { subscribeToProducts } from "../services/products";
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
        <h1 class="text-3xl mb-3">Servicios</h1>
        
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nesciunt nihil, vero mollitia magni doloremque eligendi at, perspiciatis, magnam aperiam eveniet. Repellat, quam! Sed autem itaque alias quas odio totam.</p>

        <div class="flex gap-4">
            <div v-for="product in products" class="my-2 p-2 border rounded">
                <h2 class="mb-4">{{ product.name }}</h2>

                <p>{{ product.description }}</p>

                <router-link :to="`/`" class="block p-2 my-2 bg-green-500 text-white rounded text-center">Contratar</router-link>
            </div>
        </div>
    </section>
</template>