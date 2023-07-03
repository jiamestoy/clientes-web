<script setup>
import { sendMessage, subscribeToChatMessages } from '../services/chat.js';
import Button from '../components/Button.vue';
import Label from '../components/Label.vue';
import Textarea from '../components/Textarea.vue';
import Loader from '../components/Loader.vue';
import Date from '../components/Chat/Date.vue';
import { ref } from 'vue';
import useAuth from '../composition/useAuth.js';

const {messageLoad, messages} = useChatMessages();
const {sendingNewMessage, newMessage, user, handleForm} = useChatForm();

function useChatMessages() {
    const messageLoad = ref(true);
    const messages = ref([]);

    subscribeToChatMessages(newMessages => {
            messages.value = newMessages;
            messageLoad.value = false;
        });

    return {
        messageLoad,
        messages,
    }
    
}

function useChatForm() {
    const sendingNewMessage = ref(false);
    const newMessage = ref({
        message: '',
    });

    const {user} = useAuth();
    
    function handleForm() {
        sendingNewMessage.value = true;
        sendMessage({
            userId: user.value.id,
            username: user.value.email,
            message: newMessage.value.message,
        })
            .then(() => {
                sendingNewMessage.value = false;
                newMessage.value.message = '';
            });
    }

    return {
        sendingNewMessage,
        newMessage,
        handleForm,
        user,
    }
}

</script>

<template>
    <section class="container">

        <h1 class="text-3xl my-3">Chat</h1>

        <div class="flex justify-between gap-4">
            <section class="w-8/12">
                <div id="chat">

                    <Loader v-if="messageLoad" />

                    <ul class="flex flex-col" v-else>
                        <li 
                            class="my-4 p-3 border rounded w-2/4" 
                            v-for="message in messages"
                            :class="{'bg-green-50 text-right self-end': message.userId === user.id}"
                        >
                            <b>
                                <template v-if="message.userId !== user.id">
                                    <router-link 
                                        :to="`usuario/${message.userId}`"
                                        class="text-blue-400 underline"
                                    >{{ message.username }}:</router-link>
                                </template>
                                <template v-else>
                                    {{ message.username }}:
                                </template>
                            </b> {{ message.message }}
                            <Date :date="message.created_at" />
                        </li>
                    </ul>
                </div>
            </section>
            <section class="w-4/12">
                <form 
                    action="#" 
                    id="form-message"
                    @submit.prevent="handleForm"
                >
                    <div class="my-3">
                        <p class="my-3">Usuario</p>
                        <p class="my-3">{{ user.email }}</p>
                    </div>
                    <div class="my-3">
                        <Label 
                            for="message" 
                        >Mensaje</Label>
                        <Textarea 
                            id="message" 
                            v-model="newMessage.message"
                        ></Textarea>
                    </div>
                    <Button full>Enviar</Button>
                </form>
                <div v-if="sendingNewMessage">
                    Enviando mensaje.
                </div>
            </section>
        </div>
    </section>
</template>