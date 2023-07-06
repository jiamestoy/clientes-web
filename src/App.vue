<script setup>

import { useRouter } from 'vue-router';
import { logout } from './services/auth.js';
import useAuth from './composition/useAuth.js';
import { isAdmin } from './services/users.js'
import { onUpdated, provide, ref } from 'vue';
import FooterComponent from './components/Footer.vue'
import Notification from "./components/Notification.vue";
import {FEEDBACK_TYPE_SUCCESS} from "./constants/feedback.js";
import {PROVIDER_KEY_NOTIFICATION} from "./symbols/symbols.js";

const {user} = useAuth();
const {handleLogout} = useLogout();
const userIsAdmin = ref(false);

const {feedback, setFeedbackMessage, clearFeedbackMessage} = useFeedback();

provide(PROVIDER_KEY_NOTIFICATION, {
    feedback,
    setFeedbackMessage,
    clearFeedbackMessage,
});

function useFeedback() {
    const feedback = ref({
        title: '',
        message: '',
        type: FEEDBACK_TYPE_SUCCESS,
        closable: true,
    });

    function setFeedbackMessage(data) {
        feedback.value = {
            ...feedback.value,
            ...data,
        }
    }

    function clearFeedbackMessage() {
        feedback.value = {
            title: '',
            message: '',
            type: FEEDBACK_TYPE_SUCCESS,
            closable: true,
        }
    }

    return {feedback, setFeedbackMessage, clearFeedbackMessage};
}

function useLogout() {
    const router = useRouter();
    return {
        handleLogout() {
            logout()
                .then( () => {
                    setFeedbackMessage({
                        message: 'La sesión cerró exitosamente.',
                        type: FEEDBACK_TYPE_SUCCESS,
                    });
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
            <router-link class=" p-2 text-2xl" to="/"><img src="/imgs/logo.png" alt="Logo" class="w-1/2 m-auto"></router-link>
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
            <Notification :data="feedback" @close="clearFeedbackMessage" />
            <router-view />
        </main>
        <FooterComponent />
    </div>
    
</template>