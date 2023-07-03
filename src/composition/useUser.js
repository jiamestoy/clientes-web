import { ref } from 'vue';
import { getUserById } from '../services/users.js';

export default function useUser(id) {
    const user = ref({
        id: '',
        email: '',
    });

    const loading = ref(false);

    getUserById(id)
        .then(userData => {
            loading.value = false;
            user.value = userData;
        })
        .catch(err => {
            console.error('[UserProfile useUser] Error: ', err);
        })

    return {
        user,
        loading,
    }
}