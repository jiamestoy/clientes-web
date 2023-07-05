<script setup>
import Button from '../components/Button.vue';
import Label from '../components/Label.vue';
import Input from '../components/Input.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../services/auth.js';

const { fields, loading, feedback, handleSubmit } = useRegisterForm();

function useRegisterForm() {
    const router = useRouter();
    const fields = ref({
        email: '',
        password: '',
    });

    const loading = ref(false);
    const feedback = ref({
        message: '',
        type: 'success',
    });

        function handleSubmit() {
        loading.value = true;
        register({email: fields.value.email, password: fields.value.password})
            .then(() => {
                router.push('/');
            })
            .catch(err => {
                console.error('[Register handleSubmit] Error: ', err);
            });
    }

    return {
        fields,
        feedback,
        loading,
        handleSubmit,
    }
}
</script>

<template>
    <section class="container w-1/4">
        <h1 class="text-3xl my-3">Registrar un Usuario Nuevo</h1>
        <form 
            action="#" 
            method="post"
            @submit.prevent="handleSubmit"
        >
            <div class="mb-3">
                <Label for="email">Correo Electrónico</Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    v-model="fields.email"
                />
            </div>
            <div class="mb-3">
                <Label for="password">Contraseña</Label>
                <Input 
                    type="password" 
                    name="password" 
                    id="password"
                    v-model="fields.password"
                />
            </div>
            <Button>Registrarse</Button>
        </form>
    </section>
</template>