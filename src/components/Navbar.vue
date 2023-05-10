<template>
    <div class="px-4 py-3 mb-5 bg-white">
        <nav class="displ flex items-center max-w-screen mx-0 my-auto">
            <img src="@/assets/ninja.png" class="max-h-16 pr-5">
            <h1 class="text-2xl"><router-link :to="{ name: 'Home' }">Musos Ninjas</router-link></h1>
            <div class="ml-auto">
                <div v-if="user" >
                    <router-link :to="{ name: 'CreatePlaylist' }" class="bg-secondary hover:bg-gray-300  text-primary font-bold py-2 px-4 border border-secondary rounded text-base ml-4">Create Playlist</router-link>
                    <router-link :to="{ name: 'UserPlaylists' }" class="bg-secondary hover:bg-gray-300  text-primary font-bold py-2 px-4 border border-secondary rounded text-base ml-4">My Playlist</router-link>
                    <span class="inline-block pl-4 text-lg border border-white">Hi here, {{ user.displayName }}</span>
                    <button @click="handleClick" class="h-10 bg-secondary hover:bg-gray-300 text-primary font-bold py-2 px-4 border border-secondary rounded text-base ml-4">Logout</button>
                </div>
                <div v-else>
                    <router-link :to="{ name: 'Signup'}" class="bg-secondary hover:bg-gray-300  text-primary font-bold py-2 px-4 border border-secondary rounded text-base ml-4">Signup</router-link>
                    <router-link :to="{ name: 'Login'}" class="bg-secondary hover:bg-gray-300  text-primary font-bold py-2 px-4 border border-secondary rounded text-base ml-4">Login</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import userLogout from '@/composables/userLogout'
import getUser from '@/composables/getUser'
import router from '@/router'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { logout } = userLogout()
        const { user } = getUser()
        const handleClick = async () => {
            await logout()
            console.log('user logged out')
            router.push({ name: 'Login' })
        }

        return { handleClick, user }
    }
}
</script>

