<template>
    <n-flex align="center" justify="end">
        <n-button
            quaternary
            circle
            :focusable="false"
            @click="
                playerStore.setLoopMode(playerStore.loopMode === 0 ? 1 : 0)
            ">
            <component
                :is="playerStore.loopMode === 0 ? ListLoopIcon : SingleLoopIcon"
                class="size-5" />
        </n-button>
        <n-button
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
                class="size-5" />
        </n-button>
        <n-button quaternary circle :focusable="false">
            <PlayQueueIcon class="size-5" />
        </n-button>
    </n-flex>
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
import { NFlex, NButton } from 'naive-ui'

const playerStore = usePlayerStore()
</script>
