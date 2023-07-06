<script setup>
import Button from '../components/Button.vue';
import Label from '../components/Label.vue';
import Input from '../components/Input.vue';
import Loader from '../components/Loader.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../services/auth.js';

const { fields, repeatPassword, loading, feedback, handleSubmit } = useRegisterForm();

function useRegisterForm() {
  const router = useRouter();
  const fields = ref({
    email: '',
    password: '',
  });

  const repeatPassword = ref('');

  const loading = ref(false);
  const feedback = ref({
    message: '',
    type: 'success',
  });

  function handleSubmit() {
    if (fields.value.password !== repeatPassword.value) {
      feedback.value = {
        message: 'Las contraseñas no coinciden.',
        type: 'error',
      };
      return;
    }

    loading.value = true;
    register({ email: fields.value.email, password: fields.value.password })
      .then(() => {
        feedback.value = {
          message: 'Cuenta creada con éxito. ¡Bienvenido!',
          type: 'success',
        };
        loading.value = false;
        setTimeout(() => router.push('/'), 2000);
      })
      .catch((err) => {
        console.error('[Register handleSubmit] Error: ', err);
        loading.value = false;
        feedback.value = {
          message: err.message,
          type: 'error',
        };
      });
  }

  return {
    fields,
    repeatPassword,
    feedback,
    loading,
    handleSubmit,
  };
}
</script>

<template>
  <section class="container max-w-lg m-auto">
    <h1 class="text-4xl my-5 font-bold text-center text-green-900">Registrarse</h1>
    <form action="#" method="post" @submit.prevent="handleSubmit">
      <div class="mb-3">
        <Label for="email">Correo Electrónico</Label>
        <Input type="email" name="email" id="email" v-model="fields.email" />
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
      <div class="mb-3">
        <Label for="repeatPassword">Repetir Contraseña</Label>
        <Input
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          v-model="repeatPassword"
        />
      </div>
      <Button class="w-full py-4">Crear Cuenta</Button>
    </form>

    <div class="flex justify-center">
      <Loader v-if="loading" />
    </div>

    <div v-if="feedback.message !== '' && feedback.type == 'error'" class="bg-red-200 text-red-900 p-3 rounded">
      {{ feedback.message }}
    </div>
    <div v-if="feedback.message !== '' && feedback.type == 'success'" class="bg-green-200 text-green-900 p-3 rounded">
      {{ feedback.message }}
    </div>
  </section>
</template>