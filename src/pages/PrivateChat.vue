<script setup>
import { useRoute } from 'vue-router';
import useUser from '../composition/useUser.js';
import Loader from '../components/Loader.vue';
import Label from '../components/Label.vue';
import Date from '../components/Chat/Date.vue';
import Textarea from '../components/Textarea.vue';
import Button from '../components/Button.vue';
import { ref, watch } from 'vue';
import { sendPrivateChatMessage, subscribeToPrivateChat } from '../services/private-chat.js';
import useAuth from '../composition/useAuth.js';

const route = useRoute();
const {user: authUser} = useAuth();
const {user, loading} = useUser(route.params.id);

const {newMessage, handleForm} = usePrivateChatForm(authUser, user);

const {messages, loading: loadMessages} = usePrivateChat(authUser, user);

function usePrivateChat(authUser, otherUser) {
    const messages = ref([]);
    const loading = ref(true);

    watch(otherUser, newOtherUser => {
        if(newOtherUser.id !== '') {
            subscribeToPrivateChat({
                from: authUser.value.id,
                to: otherUser.value.id,
        }, newMessages => {
            messages.value = newMessages;
            loading.value = false;
        });
        }
    });

    return {
        messages,
        loading,
    }
}


function usePrivateChatForm(authUser, otherUser) {
    const newMessage = ref({
        message: '',
    });

    const loading = ref(false);

    function handleForm() {

        loading.value = true;

        sendPrivateChatMessage({
            from: authUser.value.id,
            to: otherUser.value.id,
            message: newMessage.value.message,
        })
            .then(() => {
                newMessage.value.message = '';
                loading.value = false;
            })
    };

    return {
        newMessage,
        handleForm,
        loading
    }

}

</script>

<template>
    <template v-if="!loading">
        <section class="container">
            <h1 class="text-3xl my-3">Chat Privado con {{ user.email }}</h1>
            
            <div>
                <section>
                    <form 
                        action="#" 
                        id="form-message"
                        @submit.prevent="handleForm"
                    >
                        <div class="my-3">
                            <Label 
                                for="message" 
                            >Mensaje</Label>
                            <Textarea 
                                id="message" 
                                v-model="newMessage.message"
                            ></Textarea>
                        </div>
                        <Button class="w-1/5">Enviar</Button>
                    </form>
                </section>
            </div>
        </section>
        <section class="mb-4">
            <div id="chat">

                <Loader v-if="loadMessages" />

                <ul class="flex flex-col" v-else>
                    <li 
                        class="my-4 p-3 border rounded w-2/4" 
                        v-for="message in messages"
                        :class="{'bg-green-50 text-right self-end': message.userId === authUser.id}"
                    >
                        {{ message.message }}
                        <Date :date="message.created_at" />
                    </li>
                </ul>
            </div>
        </section>
    </template>
    <template v-else>
        <Loader />
    </template>
</template>