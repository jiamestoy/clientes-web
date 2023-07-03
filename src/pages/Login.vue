<script setup>
import Button from '../components/Button.vue';
import Label from '../components/Label.vue';
import Input from '../components/Input.vue';
import { login } from '../services/auth';
import { ref}  from 'vue';
import { useRouter } from 'vue-router';

const {handleSubmit, loading, fields, feedback} = useLogininForm();

function useLogininForm() {
    
    const fields = ref({
        email: '',
        password: '',
    });

    const loading = ref(false);

    const router = useRouter();

    const feedback = ref({
        message: '',
        type: 'error',
    });

    function handleSubmit() {
        loading.value = true;

        login({
            ...fields.value
        })
            .then(user => {
                feedback.value = {
                    message: '',
                    type: 'error',
                }
                loading.value = false;
                console.log('[Login.vue] El usuario es: ', user);
                router.push('/chat');
            })
            .catch(err => {
                loading.value = false;
                feedback.value = {
                    message: err.message,
                    type: 'error',
                }
            })
    }

    return {
        loading,
        feedback,
        fields,
        handleSubmit,
    }

}
</script>

<template>
    <section class="container w-1/4">
        <h1 class="text-3xl my-3">Iniciar Sesión</h1>
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
            <Button class="my-3">Ingresar</Button>

            <div v-if="feedback.message !== ''" class="bg-red-200 text-red-900 p-3 rounded">
                {{ feedback.message }}
            </div>
        </form>
    </section>
</template>