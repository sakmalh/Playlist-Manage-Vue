<template>
    <div class="flex items-center justify-center h-5/6">
        <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pb-8 mb-4 contents-center">
            <h3 class="text-center text-lg pt-2 pb-5"> SIGNUP </h3>
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="displayName">
                Display Name
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Display Name" v-model="displayName">
            </div>
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
                    Signup
                </button>
                <button v-if="isPending" class="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled>
                    Loading
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import userSignup from '@/composables/userSignup'
import { useRouter } from 'vue-router'

export default {
    setup () {
        const { error, signup, isPending } = userSignup()
        const router = useRouter()

        const email = ref('')
        const password = ref('')
        const displayName = ref('')
        
        const handleSubmit = async () => {
            const res = await signup(email.value, password.value, displayName.value)
            if (!error.value) {
                router.push({ name: 'UserPlaylists' })
            }
        }

        return { email, password, displayName, isPending, error, handleSubmit }
    }
}
</script>

