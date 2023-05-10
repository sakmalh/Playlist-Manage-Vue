<template>
    <div class="flex items-center justify-center h-5/6">
        <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 contents-center">
            <h3 class="text-center text-lg pt-2 pb-5"> Create New Playlist </h3>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Title
                </label>
                <input required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Title" v-model="title">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Description
                </label>
                <textarea required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Playlist Description .." v-model="description"></textarea>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Upload Picture for Cover
                </label>
                <input @change="handleChange" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file">
                <div class="block text-red-400 text-sm font-bold mt-1">{{ fileError }}</div>
            </div>   
            <div class="flex items-center justify-between">
                <button v-if="!isPending" class="bg-secondary hover:bg-gray-300 text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Create
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
import useStorage from '@/composables/useStorage'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'
import useCollection from '@/composables/useCollection'
import router from '@/router'

export default{
    setup(){
        const { filePath, url, uploadImage } = useStorage()
        const { error, addDoc } = useCollection('playlists')
        const { user } = getUser()
        const router = useRouter()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)

        const handleSubmit = async () => {
            if (file.value){
                isPending.value = true
                await uploadImage(file.value)
                const res = await addDoc({
                                title: title.value,
                                description: description.value,
                                userId: user.value.uid,
                                userName: user.value.displayName,
                                coverUrl: url.value,
                                filePath: filePath.value,
                                songs: [],
                                createdAt: timestamp()
                            })
                isPending.value = false
                if (!error.value) {
                    router.push({ name: 'PlaylistDetails', params: { id: res.id }})
                }

            }
        }

        const types = ['image/png', 'image/jpeg']

        const handleChange = (e)  => {
            const selected = e.target.files[0]

            if (selected && types.includes(selected.type)) {
                file.value = selected
                fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Only jpeg and png supported'
            }
        }

        return { title, description, handleSubmit, handleChange, fileError, isPending }
    }
}
</script>
