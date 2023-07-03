import { onMounted, ref } from 'vue';
import { subscribeToAuth } from '../services/auth.js';

export default function useAuth() {
    const user = ref({
        id: null,
        email: null,
    });

    onMounted(() => {
        subscribeToAuth(newUser => user.value = newUser);
    })

    return {
        user,
    }
}