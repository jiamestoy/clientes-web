<script setup>
import {inject, ref} from 'vue';
import Label from "../Label.vue";
import Input from "../Input.vue";
import Button from "../Button.vue";
import {useRouter} from "vue-router";
import {login} from "../../services/auth.js";
import {FEEDBACK_TYPE_ERROR, FEEDBACK_TYPE_SUCCESS} from "../../constants/feedback.js";
import {PROVIDER_KEY_NOTIFICATION} from "../../symbols/symbols.js";

const {handleSubmit, loading, fields} = useLoginForm();

const {feedback, setFeedbackMessage} = inject(PROVIDER_KEY_NOTIFICATION);


function useLoginForm() {

    const fields = ref({
        email: '',
        password: '',
    });
    const loading = ref(false);

    const router = useRouter();

    function handleSubmit() {
        loading.value = true;

        login({
            ...fields.value
        })
            .then(user => {
                loading.value = false;
                setFeedbackMessage({
                    message: 'La sesión se inició exitosamente.',
                    type: FEEDBACK_TYPE_SUCCESS,
                });
                router.push('/');
            })
            .catch(err => {
                loading.value = false;
                setFeedbackMessage({
                    message: err.message,
                    type: FEEDBACK_TYPE_ERROR,
                });
            });
    }

    return {
        loading,
        fields,
        handleSubmit,
    }
}
</script>

<template>
    <section class="container max-w-lg m-auto">
        <h1 class="text-4xl my-5 font-bold text-center text-green-900">Iniciar Sesión</h1>

        <form 
            action="#" 
            method="post" 
            @submit.prevent="handleSubmit"
        >
            <div class="mb-3">
                <Label 
                    for="email" 
                    id="email"
                >Correo Electrónico</Label>
                <Input 
                    type="email" 
                    name="email" 
                    id="email"
                    v-model="fields.email" 
                />
            </div>
            <div class="mb-3">
                <Label 
                    for="password" 
                    id="password"
                >Contraseña</Label>
                <Input 
                    type="password" 
                    name="password" 
                    id="password"
                    v-model="fields.password" 
                />
            </div>
            <Button class="my-3 py-4 w-full">Ingresar</Button>

        </form>
    </section>
</template>