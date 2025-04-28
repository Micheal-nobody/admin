// composables/useLogin.js
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export function useLogin() {
    const router = useRouter();
    const token = ref(null);

    async function login(data) {
        try {
            const response = await axios.post('http://localhost:9090/login/admin', data);
            

            const { token } = response.data.data;
            console.log(token);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    return {
        token,
        login
    };
}
