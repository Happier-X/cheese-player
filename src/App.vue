<template>
    <Layout />
</template>
<script setup lang="ts">
import Layout from '@/components/layout/index.vue'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { usePlayerStore } from '@/stores/player'
import { onMounted } from 'vue'
import { Store } from '@tauri-apps/plugin-store'

const playerStore = usePlayerStore()
const appWindow = getCurrentWindow()
appWindow.onCloseRequested(async () => {
    await playerStore.saveCurrentPlayInfo()
    await appWindow.close()
})
let store = null as Store | null
onMounted(async () => {
    store = await Store.load('store.player')
    const res = (await store?.get('currentPlayInfo')) as any
    await playerStore.loadSong(res.currentSongInfo)
    playerStore.setPlayQueue(res.currentPlayQueue)
})
</script>
