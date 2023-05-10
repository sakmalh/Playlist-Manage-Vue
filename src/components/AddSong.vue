<template>
    <div class="flex items-center justify-center h-6/6 max-w-full">
        <button v-if="!showForm" @click="showForm = true" class="bg-secondary hover:bg-gray-300 text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Songs</button>
        <form v-if="showForm" @submit.prevent="handleSubmit" class="shadow-md rounded px-8 pt-6 pb-8 mb-4 contents-center max-w-3xl">
            <h3 class="text-center text-lg pt-2 pb-5"> Add Song </h3>
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
                Song Title
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Song Title" v-model="title">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Artist
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Artist" v-model="artist">
                <div v-if="error" class="text-red-500 text-xs italic">{{ error }}</div>
            </div>
            <div class="flex items-center justify-between">
                <button class="bg-secondary hover:bg-gray-300 text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add Song
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import useDocument from '@/composables/useDocument'

export default {
    props: ['playlist'],
    setup (props) {
        const title = ref('')
        const artist = ref('')
        const showForm = ref(false)
        const { updateDoc } = useDocument('playlists', props.playlist.id)

        const handleSubmit = async () => {
            const newSong = {
                title: title.value,
                artist: artist.value,
                id: Math.floor(Math.random() * 100000000000000)
            }

            showForm.value = false
            
            await updateDoc({
                songs: [...props.playlist.songs, newSong]
            })

            

            title.value = ''
            artist.value = ''
        }

        return { title, artist, showForm, handleSubmit }
    }
}
</script>
