<template>
    <div class="size-screen relative">
        <n-layout position="absolute" has-sider>
            <n-layout-sider
                bordered
                class="h-[calc(100vh-4.5rem)]"
                content-class="p-2">
                <SideBar />
            </n-layout-sider>
            <n-layout>
                <n-layout-header class="h-10" bordered>
                    <TitleBar />
                </n-layout-header>
                <n-layout-content>456</n-layout-content>
            </n-layout>
            <n-layout-footer bordered position="absolute" class="h-18">
                底栏
            </n-layout-footer>
        </n-layout>
    </div>
</template>
<script setup lang="ts">
import TitleBar from '@/components/layout/TitleBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
import MusicInfo from '@/components/common/MusicInfo.vue'
import PlayControls from '@/components/common/PlayControls.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import QueueControls from '@/components/common/QueueControls.vue'
import WindowControls from '@/components/common/WindowControls.vue'
import { useLayoutStore } from '@/stores/layout'
import { usePlayerStore } from '@/stores/player'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { Store } from '@tauri-apps/plugin-store'
import { Search as SearchIcon, Settings as SettingsIcon } from 'lucide-vue-next'
import {
    NFlex,
    NInput,
    NLayout,
    NLayoutContent,
    NLayoutFooter,
    NLayoutHeader,
    NLayoutSider,
    NMenu,
    type MenuOption
} from 'naive-ui'
import { h, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeMenuKey = ref('home')
watch(
    () => route.path,
    () => {
        if (route.path.startsWith('/home')) {
            activeMenuKey.value = 'home'
        } else if (route.path.startsWith('/song')) {
            activeMenuKey.value = 'song'
        } else if (route.path.startsWith('/album')) {
            activeMenuKey.value = 'album'
        } else if (route.path.startsWith('/artist')) {
            activeMenuKey.value = 'artist'
        } else if (route.path.startsWith('/playlist')) {
            activeMenuKey.value = 'playlist'
        } else {
            activeMenuKey.value = ''
        }
    }
)
const menuOptions: MenuOption[] = [
    {
        label: () => h(RouterLink, { to: '/home' }, { default: () => '首页' }),
        key: 'home'
    },
    {
        label: () => h(RouterLink, { to: '/song' }, { default: () => '歌曲' }),
        key: 'song'
    },
    {
        label: () => h(RouterLink, { to: '/album' }, { default: () => '专辑' }),
        key: 'album'
    },
    {
        label: () =>
            h(RouterLink, { to: '/artist' }, { default: () => '艺术家' }),
        key: 'artist'
    },
    {
        label: () =>
            h(RouterLink, { to: '/playlist' }, { default: () => '歌单' }),
        key: 'playlist'
    }
]
const handleOpenSettings = () => {
    router.push({
        path: '/settings'
    })
}
const layoutStore = useLayoutStore()

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
