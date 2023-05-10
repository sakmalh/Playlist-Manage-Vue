<template>
    <div v-if="error" class="">{{ error }}</div>
    <div v-if="playlist" class="grid grid-cols-4 gap-20">
        <div class="col-span-2">
            <div class="rounded-3xl relative p-12 sm:p-4 md:p-12 lg:p-12 xl:p-12">
                <img :src="playlist.coverUrl" class="rounded-3xl max-h-full w-auto">
            </div>
            <h2 class="text-xl text-center">{{ playlist.title }}</h2>
            <p class="text-sm text-gray-600 text-center">Created by {{ playlist.userName }}</p>
            <p class="text-base px-12 py-6">Description - {{ playlist.description }}</p>
            <div v-if="isOwner" @click="handleDelete" class="text-center">
                <button class="bg-secondary hover:bg-red-300  hover:text-white text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
            </div>    
        </div>

        <div class="col-span-2">
            <div v-if="!playlist.songs.length" class="mb-5 text-center text-lg">
                No songs in the playlist. Please add.
            </div>
            <div v-for="song in playlist.songs" :key="song.id" class="flex p-5 mt-5 items-center border border-dashed border-secondary">
                <h3 class="text-lg text-gray-700 ml-0">{{ song.title }}</h3>
                <p class="text-gray-400 ml-auto">{{ song.artist }}</p>
                <button v-if="isOwner" @click="handleDeleteSong(song.id)" class="ml-auto bg-secondary hover:bg-red-300  hover:text-white text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
            </div>            
            <AddSong v-if="isOwner" :playlist="playlist" class="mt-5"/>
        </div>
    </div>
</template>

<script>
import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser';
import useStorage from '@/composables/useStorage';
import { ref } from 'vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import AddSong from '@/components/AddSong.vue'
import useDocument from '@/composables/useDocument'

export default {
    props: ['id'],
    components: { AddSong },
    setup(props) {
        const { document: playlist, error } = getDocument('playlists', props.id)
        const { user } = getUser()
        const { deleteDoc, updateDoc } = useDocument('playlists', props.id)
        const { deleteImage } = useStorage()
        const router = useRouter()

        const isOwner = computed(() => {
            return playlist.value && user.value && user.value.uid == playlist.value.userId
        })

        const handleDelete = async () => {
            await deleteImage(playlist.value.filePath)
            await deleteDoc()     
            router.push({ name: 'Home' })
        }

        const handleDeleteSong = async (id) => {
            const songs = playlist.value.songs.filter((song) => song.id != id)
            await updateDoc({
                songs: songs
            })
        }

        return { error, playlist, isOwner, handleDelete, handleDeleteSong }
    }
}
</script>
