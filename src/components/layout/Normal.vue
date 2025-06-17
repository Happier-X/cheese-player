<template>
    <div class="w-screen h-screen relative">
        <NLayout position="absolute">
            <NLayoutHeader bordered data-tauri-drag-region>
                <NFlex align="center" justify="between" :wrap="false">
                    <NMenu
                        data-tauri-drag-region
                        v-model:value="activeKey"
                        mode="horizontal"
                        :options="menuOptions" />
                    <WindowControls />
                </NFlex>
            </NLayoutHeader>
            <NLayoutContent
                position="absolute"
                class="top-43px! bottom-75px!"
                content-class="px-3">
                <RouterView v-slot="{ Component }">
                    <KeepAlive>
                        <component :is="Component"></component>
                    </KeepAlive>
                </RouterView>
            </NLayoutContent>
            <NLayoutFooter position="absolute">
                <NFlex
                    align="center"
                    justify="between"
                    :wrap="false"
                    class="h-[75px] p-3">
                    <ProgressBar class="absolute -top-0.75 left-0" />
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
import WindowControls from '@/components/common/WindowControls.vue'
import { useLayoutStore } from '@/stores/layout'
import { usePlayerStore } from '@/stores/player'
import { Settings as SettingsIcon } from 'lucide-vue-next'
import type { MenuOption } from 'naive-ui'
import { h } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ProgressBar from '@/components/common/ProgressBar.vue'
import MusicInfo from '@/components/common/MusicInfo.vue'
import PlayControls from '@/components/common/PlayControls.vue'
import QueueControls from '@/components/common/QueueControls.vue'

const route = useRoute()
const menuOptions: MenuOption[] = [
    {
        label: () => h(RouterLink, { to: '/home' }, { default: () => '首页' }),
        key: 'home'
        // icon: renderIcon(HomeIcon)
    },
    {
        label: () => h(RouterLink, { to: '/album' }, { default: () => '专辑' }),
        key: 'album'
        // icon: renderIcon(AlbumIcon)
    },
    {
        label: () =>
            h(RouterLink, { to: '/artist' }, { default: () => '艺术家' }),
        key: 'artist'
        // icon: renderIcon(ArtistIcon)
    },
    {
        label: () =>
            h(RouterLink, { to: '/playlist' }, { default: () => '歌单' }),
        key: 'playlist'
        // icon: renderIcon(PlaylistIcon)
    }
]
const bottomMenuList = [
    {
        title: '设置',
        icon: SettingsIcon,
        path: '/settings'
    }
]
const playerStore = usePlayerStore()
const layoutStore = useLayoutStore()
</script>
