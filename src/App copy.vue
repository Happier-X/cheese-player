<template>
    <div class="size-screen relative">
        <NLayout position="absolute">
            <NLayoutHeader data-tauri-drag-region>
                <NFlex align="center" justify="space-between" :wrap="false">
                    <img
                        class="aspect-square h-42px p-1.5"
                        src="@/assets/logo.png"
                        alt="" />
                    <NMenu
                        data-tauri-drag-region
                        v-model:value="activeMenuKey"
                        mode="horizontal"
                        :options="menuOptions" />
                    <NInput
                        class="w-60!"
                        size="small"
                        placeholder="请输入搜索内容">
                        <template #suffix>
                            <SearchIcon :size="16" color="#c2c2c2" />
                        </template>
                    </NInput>
                    <NButton
                        text
                        :focusable="false"
                        @click="handleOpenSettings">
                        <SettingsIcon :size="16" />
                    </NButton>
                    <WindowControls />
                </NFlex>
            </NLayoutHeader>
            <NLayoutContent
                position="absolute"
                class="top-42px! bottom-75px!"
                content-class="px-1/10 pb-5"
                :native-scrollbar="false">
                <RouterView v-slot="{ Component }">
                    <KeepAlive>
                        <component :is="Component"></component>
                    </KeepAlive>
                </RouterView>
            </NLayoutContent>
            <NLayoutFooter position="absolute" class="bg-[unset]">
                <NFlex
                    align="center"
                    justify="space-between"
                    :wrap="false"
                    class="h-[75px] p-3 relative">
                    <ProgressBar class="absolute -top-9px left-0" />
                    <MusicInfo
                        class="w-full"
                        :current-song-info="playerStore.currentSongInfo"
                        @click-cover="layoutStore.toggleLayout" />
                    <PlayControls class="w-full" />
                    <QueueControls class="w-full" />
                </NFlex>
            </NLayoutFooter>
        </NLayout>
    </div>
</template>
<script setup lang="ts">
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
