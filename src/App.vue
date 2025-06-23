<template>
    <Normal />
    <Immersive v-show="!layoutStore.isNormal" />
</template>
<script setup lang="ts">
import Immersive from '@/components/layout/Immersive/index.vue'
import Normal from '@/components/layout/Normal/index.vue'
import { useLayoutStore } from '@/stores/layout'
import { usePlayerStore } from '@/stores/player'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { Store } from '@tauri-apps/plugin-store'
import { onMounted } from 'vue'

const playerStore = usePlayerStore()
const layoutStore = useLayoutStore()
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
