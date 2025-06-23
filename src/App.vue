<template>
    <div class="size-screen relative">
        <n-layout position="absolute" has-sider>
            <n-layout-sider
                bordered
                class="h-[calc(100vh-4.5rem)]"
                show-trigger="bar"
                :collapsed="collapsed"
                :collapsed-width="64"
                collapse-mode="width"
                @collapse="collapsed = true"
                @expand="collapsed = false">
                <SideBar :collapsed="collapsed" />
            </n-layout-sider>
            <div class="size-full relative">
                <n-layout position="absolute">
                    <n-layout-header class="h-10" bordered>
                        <TitleBar />
                    </n-layout-header>
                    <n-layout-content
                        position="absolute"
                        class="top-10! bottom-18!"
                        content-class="px-5 pb-5"
                        :native-scrollbar="false">
                        <RouterView v-slot="{ Component }">
                            <KeepAlive>
                                <component :is="Component"></component>
                            </KeepAlive>
                        </RouterView>
                    </n-layout-content>
                </n-layout>
            </div>
            <n-layout-footer position="absolute" class="h-18 bg-[unset] z-1">
                <PlayerBar />
            </n-layout-footer>
        </n-layout>
    </div>
</template>
<script setup lang="ts">
import PlayerBar from '@/components/layout/PlayerBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
import TitleBar from '@/components/layout/TitleBar.vue'
import { usePlayerStore } from '@/stores/player'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { Store } from '@tauri-apps/plugin-store'
import {
    NLayout,
    NLayoutContent,
    NLayoutFooter,
    NLayoutHeader,
    NLayoutSider
} from 'naive-ui'
import { onMounted, ref } from 'vue'

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
const collapsed = ref(false)
</script>
