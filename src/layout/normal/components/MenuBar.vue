<template>
    <Menubar :model="items"></Menubar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
    House as HomeIcon,
    Disc3 as AlbumIcon,
    MicVocal as ArtistIcon,
    ScrollText as SongListIcon
} from 'lucide-vue-next'

const items = ref([
    {
        label: '首页',
        route: '/home'
    },
    {
        label: '专辑',
        route: '/album'
    },
    {
        label: '艺术家',
        route: '/artist'
    },
    {
        label: '歌单',
        route: '/songList'
    }
])
</script>
