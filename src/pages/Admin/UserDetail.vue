<script setup>
import { useRoute } from 'vue-router';
import useUser from '../../composition/useUser.js';
import { getUserOrders } from '../../services/users.js';
import { onBeforeMount, ref } from 'vue';
import { formatDate } from '../../helpers/dates.js'

const route = useRoute();
const {user, loading} = useUser(route.params.id);
const orders = ref();

async function getOrders() {
    orders.value = await getUserOrders(route.params.id);
}

onBeforeMount(() => {
    getOrders()
})
</script>

<template>
    <template v-if="!loading">
        <section class="container max-w-5xl mx-auto">
            <h1 class="text-3xl my-3 font-bold text-center text-green-900">Detalles de usuario</h1>
            <h2 class="text-3xl my-3">Email del usuario: {{ user.email }}</h2>

            <p class="text-lg">ID del usuario: {{ user.id }}</p>

            <h2 class="text-2xl my-3">Servicios Contratados:</h2>
            
            <template v-if="orders">
                <table class="table-auto border-collapse m-auto">
                    <thead>
                        <tr>
                        <th class="border p-2">ID de pedido</th>
                        <th class="border p-2">Nombre del servicio</th>
                        <th class="border p-2">Fecha de contratación</th>
                        <th class="border p-2">Fecha de vencimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders">
                            <td class="border p-2">{{ order.order_id }}</td>
                            <td class="border p-2">{{ order.service_name }}</td>
                            <td class="border p-2">{{ formatDate(order.created_at) }}</td>
                            <td class="border p-2">{{ formatDate(order.expiry_date) }}</td>
                        </tr>
                    </tbody>
                </table>
            </template>
            <template v-else>
                <p>Este usuario no tiene servicios contratados.</p>
            </template>
        </section>
    </template>
    <template v-else>
    </template>
</template>