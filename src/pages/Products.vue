<script setup>
import { subscribeToProducts } from "../services/products";
import {ref} from "vue";
import useAuth from "../composition/useAuth";

const {products} = useProductsList();
const {user} = useAuth();

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
        <h1 class="text-5xl my-3 font-bold text-green-900">Nuestros servicios</h1>
        
        <p class="text-lg my-7">En WebZone ofrecemos una amplia gama de servicios de hosting web diseñados para satisfacer las necesidades de individuos, emprendedores y empresas de todos los tamaños. Nuestro objetivo es proporcionar una plataforma confiable y de alto rendimiento para que tu sitio web o aplicación en línea pueda funcionar sin problemas y alcanzar su máximo potencial.</p>

        <div class="flex justify-center flex-wrap gap-4">
            <div v-for="product in products" class="my-2 p-4 border rounded max-w-xs flex flex-col">
                <h2 class="mb-4 text-2xl text-green-900 font-bold text-center">{{ product.name }}</h2>

                <p class="text-lg mb-4">{{ product.description }}</p>

                <div class="mt-auto">
                    <p class="text-2xl text-green-700 my-4"><span class="text-xl text-black">Precio: </span>${{ product.price }}/mes</p>
    
                    <router-link :to="`/products/order/${product.id}/${user.id}`" class="block p-2 bg-green-500 text-white rounded text-center my-3">Contratar</router-link>
                </div>
            </div>
        </div>
    </section>
</template>