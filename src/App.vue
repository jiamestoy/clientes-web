<script setup>

import { useRouter } from 'vue-router';
import { logout } from './services/auth.js';
import useAuth from './composition/useAuth.js';
import { isAdmin } from './services/users.js'
import { onUpdated, ref } from 'vue';

const {user} = useAuth();
const {handleLogout} = useLogout();
const userIsAdmin = ref(false);

function useLogout() {
    const router = useRouter();
    return {
        handleLogout() {
            logout()
                .then( () => {
                    userIsAdmin.value = false;
                    router.push('/iniciar-sesion')
                });
        }
    }
}

onUpdated(() => {
    if (user.value.id){ 
        isAdmin(user.value.id)
        .then((userRole) => {
            if (userRole == true) {
                userIsAdmin.value = true;
            } else {
                userIsAdmin.value = false;
            }
        });
    }
})
</script>

<template>
    <div class="grid grid-rows-layout h-full">
        <nav class="flex justify-between items-center p-2 bg-green-50 zinc-950">
            <router-link class="block p-2 text-2xl" to="/">Logo</router-link>
            <ul class="flex gap-2">
                <li>
                    <router-link class="block p-2" to="/">Home</router-link>
                </li>
                <li>
                    <router-link class="block p-2" to="/products">Servicios</router-link>
                </li>

                <template v-if="user.id !== null" :key="userIsAdmin">
                    <template v-if="userIsAdmin == true">
                        <li>
                            <router-link class="block p-2" to="/admin">Panel de Administración</router-link>
                        </li>
                    </template>
                    <template v-if="userIsAdmin == false">
                        <li>
                            <router-link class="block p-2" to="/usuario/rPkbcbFrpJTsdicp1V3ok4cq20e2/chat">Contactar</router-link>
                        </li>
                        <li>
                            <router-link class="block p-2" to="/perfil">Mi Perfil</router-link>
                        </li>
                    </template>
                    <li>
                        <form
                            action="#"
                            method="post"
                            @submit.prevent="handleLogout"
                        >
                            <button type="submit" class="block p-2">{{ user.email }} (Cerrar Sesión)</button>
                        </form>
                    </li>
                </template>

                <template  v-else>
                    <li>
                        <router-link class="block p-2" to="/iniciar-sesion">Iniciar Sesión</router-link>
                    </li>
                    <li>
                        <router-link class="block p-2" to="/registro">Registro</router-link>
                    </li>
                </template>

            </ul>
        </nav>
        <main class="container h-full py-4 m-auto">
            <router-view />
        </main>
        <footer class="flex justify-center items-center h-[150px] text-slate-100 bg-green-950 text-center">
            <ul>
                <li><b>Clientes Web Mobile</b></li>
                <li><b>Comisión DWT4AV</b></li>
                <li><b>Juan Ignacio Amestoy</b></li>
                <li><b>Iñaki Iriarte</b></li>
            </ul>
        </footer>
    </div>
    
</template>