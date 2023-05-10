<template>
    <div v-for="playlist in playlists" :key="playlist.id">
        <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.id}}">
            <div class="flex items-center p-10 rounded-lg bg-white mx-4 my-0 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-secondary duration-200 hover:shadow">
                <div class="max-w-xs max-h-xs overflow-hidden rounded-lg">
                    <img :src="playlist.coverUrl" class="block h-24 w-24 object-cover">
                </div>
                <div class="mx-4 my-8">
                    <h3 class="text-xl">{{ playlist.title }}</h3>
                    <p class="text-sm text-gray-500">Created by {{ playlist.userName }}</p>
                </div>
                <div class="ml-auto">
                    <p>{{ playlist.songs.length }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['playlists']
}
</script>
