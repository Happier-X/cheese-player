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
                class="top-43px! bottom-75px!"
                content-class="px-5"
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
import MusicInfo from '@/components/common/MusicInfo.vue'
import PlayControls from '@/components/common/PlayControls.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import QueueControls from '@/components/common/QueueControls.vue'
import WindowControls from '@/components/common/WindowControls.vue'
import { useLayoutStore } from '@/stores/layout'
import { usePlayerStore } from '@/stores/player'
import { Settings as SettingsIcon } from 'lucide-vue-next'
import type { MenuOption } from 'naive-ui'
import { h } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
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
const handleOpenSettings = () => {
    router.push({
        path: '/settings'
    })
}
const playerStore = usePlayerStore()
const layoutStore = useLayoutStore()
</script>
