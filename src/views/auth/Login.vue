<template>
    <div class="flex items-center justify-center h-5/6">
        <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 contents-center">
            <h3 class="text-center text-lg pt-2 pb-5"> LOGIN </h3>
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Username
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Email" v-model="email">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="password" v-model="password">
                <div v-if="error" class="text-red-500 text-xs italic">{{ error }}</div>
            </div>
            <div class="flex items-center justify-between">
                <button v-if="!isPending" class="bg-secondary hover:bg-gray-300 text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login
                </button>
                <button v-if="isPending" class="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled>
                    Loading
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import userLogin from '@/composables/userLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default{
    setup() {
        const { error, login, isPending } = userLogin()
        const router = useRouter()

        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            const res = await login(email.value, password.value)
            if (!error.value) {
                router.push({ name: 'UserPlaylists' })
            }
        }

        return { email, password, handleSubmit, error, isPending }
    }
}
</script>
