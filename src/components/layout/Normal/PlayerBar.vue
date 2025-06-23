<template>
    <n-flex
        align="center"
        justify="space-between"
        :wrap="false"
        class="size-full p-3 relative">
        <ProgressBar class="absolute -top-9px left-0" />
        <MusicInfo
            class="w-full"
            :current-song-info="playerStore.currentSongInfo"
            @click-cover="layoutStore.toggleLayout" />
        <PlayControls class="w-full" />
        <QueueControls class="w-full" />
    </n-flex>
</template>
<script setup lang="ts">
import { NFlex } from 'naive-ui'
import MusicInfo from '@/components/common/MusicInfo.vue'
import PlayControls from '@/components/common/PlayControls.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import QueueControls from '@/components/common/QueueControls.vue'
import { useLayoutStore } from '@/stores/layout'
import { usePlayerStore } from '@/stores/player'

const layoutStore = useLayoutStore()
const playerStore = usePlayerStore()
</script>
