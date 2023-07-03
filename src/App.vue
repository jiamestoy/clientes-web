<script setup>

import { useRouter } from 'vue-router';
import { logout } from './services/auth.js';
import useAuth from './composition/useAuth.js';
import { isAdmin } from './services/users.js'

const {user} = useAuth();
const {handleLogout} = useLogout();

function useLogout() {
    const router = useRouter();
    return {
        handleLogout() {
            logout()
                .then( () => {
                    router.push('/iniciar-sesion')
                });
        }
    }
}

</script>

<template>
    <div class="grid grid-rows-layout h-full">
        <nav class="flex justify-between items-center p-2 bg-green-50 zinc-950">
            <router-link class="block p-2 text-2xl" to="/">Logo</router-link>
            <ul class="flex gap-2">
                <li>
                    <router-link class="block p-2" to="/">Home</router-link>
                </li>

                <template v-if="user.id !== null">
                    <li>
                        <router-link class="block p-2" to="usuario/6FBNgT4E4xcALKR4Smb1bT6fUIv2/chat">Chat con Administrador</router-link>
                    </li>
                    <template v-if="isAdmin(user.id)">
                        <li>
                            <router-link class="block p-2" to="lista-usuarios">Lista de Usuario</router-link>
                        </li>
                    </template>
                    <li>
                        <router-link class="block p-2" to="/perfil">Perfil</router-link>
                    </li>
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
            </ul>
        </footer>
    </div>
    
</template>