<template>
    <NFlex align="center" justify="end">
        <NButton
            quaternary
            circle
            :focusable="false"
            @click="
                playerStore.setLoopMode(playerStore.loopMode === 0 ? 1 : 0)
            ">
            <component
                :is="playerStore.loopMode === 0 ? ListLoopIcon : SingleLoopIcon"
                :size="18" />
        </NButton>
        <NButton
            quaternary
            circle
            :focusable="false"
            @click="
                playerStore.setPlayMode(playerStore.playMode === 0 ? 1 : 0)
            ">
            <component
                :is="
                    playerStore.playMode === 0 ? OrderPlayIcon : ShufflePlayIcon
                "
                :size="18" />
        </NButton>
        <NButton quaternary circle :focusable="false">
            <PlayQueueIcon :size="18" />
        </NButton>
    </NFlex>
</template>
<script setup lang="ts">
import {
    Repeat as ListLoopIcon,
    Repeat1 as SingleLoopIcon,
    ListOrdered as OrderPlayIcon,
    Shuffle as ShufflePlayIcon,
    ListMusic as PlayQueueIcon
} from 'lucide-vue-next'
import { usePlayerStore } from '@/stores/player'
const playerStore = usePlayerStore()
</script>
