<template>
    <n-flex align="center" justify="center">
        <n-button
            quaternary
            circle
            :focusable="false"
            @click="playerStore.playPrevious">
            <PreviousIcon class="size-5" />
        </n-button>
        <n-button
            tertiary
            circle
            :focusable="false"
            class="scale-110"
            @click="
                playerStore.isPlaying
                    ? playerStore.pause()
                    : playerStore.resume()
            ">
            <component
                :is="playerStore.isPlaying ? PauseIcon : PlayIcon"
                class="size-5.5" />
        </n-button>
        <n-button
            quaternary
            circle
            :focusable="false"
            @click="playerStore.playNext">
            <NextIcon class="size-5" />
        </n-button>
    </n-flex>
</template>
<script setup lang="ts">
import {
    Play as PlayIcon,
    SkipBack as PreviousIcon,
    SkipForward as NextIcon,
    Pause as PauseIcon
} from 'lucide-vue-next'
import { usePlayerStore } from '@/stores/player'
import { NFlex, NButton } from 'naive-ui'
const playerStore = usePlayerStore()
</script>
