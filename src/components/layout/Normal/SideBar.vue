<template>
    <n-menu
        data-tauri-drag-region
        v-model:value="activeMenuKey"
        :options="menuOptions"
        :collapsed="collapsed"
        :collapsed-width="64" />
</template>
<script setup lang="ts">
import { NMenu, type MenuOption } from 'naive-ui'
import { h, ref, watch, type Component } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
    House as HomeIcon,
    Music as SongIcon,
    Disc3 as AlbumIcon,
    MicVocal as ArtistIcon,
    ScrollText as PlaylistIcon,
    Settings as SettingsIcon
} from 'lucide-vue-next'
const activeMenuKey = ref('home')
const route = useRoute()
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
        } else if (route.path.startsWith('/settings')) {
            activeMenuKey.value = 'settings'
        } else {
            activeMenuKey.value = ''
        }
    }
)
const renderIcon = (icon: Component) => {
    return () =>
        h(icon, {
            size: '1.25rem'
        })
}
const menuOptions: MenuOption[] = [
    {
        label: () => h(RouterLink, { to: '/home' }, { default: () => '首页' }),
        key: 'home',
        icon: renderIcon(HomeIcon)
    },
    {
        label: () => h(RouterLink, { to: '/song' }, { default: () => '歌曲' }),
        key: 'song',
        icon: renderIcon(SongIcon)
    },
    {
        label: () => h(RouterLink, { to: '/album' }, { default: () => '专辑' }),
        key: 'album',
        icon: renderIcon(AlbumIcon)
    },
    {
        label: () =>
            h(RouterLink, { to: '/artist' }, { default: () => '艺术家' }),
        key: 'artist',
        icon: renderIcon(ArtistIcon)
    },
    {
        label: () =>
            h(RouterLink, { to: '/playlist' }, { default: () => '歌单' }),
        key: 'playlist',
        icon: renderIcon(PlaylistIcon)
    },
    {
        label: () =>
            h(RouterLink, { to: '/settings' }, { default: () => '设置' }),
        key: 'settings',
        icon: renderIcon(SettingsIcon)
    }
]
defineProps({
    collapsed: {
        type: Boolean
    }
})
</script>
