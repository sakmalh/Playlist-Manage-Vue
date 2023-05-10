<template>
    <div class="">
      <div v-if="error" class="text-center text-lg pt-2 pb-5 text-red-600">Could not fetch data</div>
      <div v-if="playlists">
        <ListView :playlists="playlists" />
      </div>
      <div class="mt-6">
        <router-link :to="{ name: 'CreatePlaylist' }" class="bg-secondary hover:bg-gray-300 text-primary font-bold mx-4 py-4 px-4 rounded focus:outline-none focus:shadow-outline">Create Playlist</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import getCollection from '@/composables/getCollection';
  import getUser from '@/composables/getUser';
  import ListView from '@/components/ListView.vue';
  
  export default {
    name: 'Home',
    components: { ListView },
    setup() {
      const { user } = getUser() 
      const { error, documents: playlists } = getCollection(
        'playlists',
        ['userId', '==', user.value.uid]
        )
        
        console.log(playlists)
      return { error, playlists }
    }
  }
  </script>
  